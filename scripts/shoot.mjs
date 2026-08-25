/* Screenshots the built site at real device metrics via the Chrome DevTools
 * Protocol. Chrome's --window-size flag clamps to ~500px on macOS, which is
 * wider than any phone, so mobile must be emulated rather than resized.
 *
 * Usage: node scripts/shoot.mjs <url> <outfile> <width> <height> [mobile]
 */
import { spawn } from 'node:child_process'
import { writeFileSync } from 'node:fs'

const [url, outFile, w = '390', h = '844', mobile = '1', yOffset = '0'] = process.argv.slice(2)
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
const PORT = 9333 + Math.floor(Number(process.env.SHOOT_SLOT ?? 0))

const chrome = spawn(CHROME, [
  '--headless=new', '--disable-gpu', '--hide-scrollbars',
  `--remote-debugging-port=${PORT}`, '--no-first-run', '--no-default-browser-check',
  '--user-data-dir=/tmp/dira-chrome-profile', 'about:blank',
], { stdio: 'ignore' })

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

async function targets() {
  for (let i = 0; i < 40; i++) {
    try {
      const r = await fetch(`http://127.0.0.1:${PORT}/json/list`)
      if (r.ok) return await r.json()
    } catch {}
    await sleep(250)
  }
  throw new Error('Chrome did not expose a debugging port')
}

let id = 0
function rpc(ws, method, params = {}) {
  return new Promise((resolve, reject) => {
    const msgId = ++id
    const onMsg = (ev) => {
      const m = JSON.parse(ev.data)
      if (m.id !== msgId) return
      ws.removeEventListener('message', onMsg)
      m.error ? reject(new Error(method + ': ' + m.error.message)) : resolve(m.result)
    }
    ws.addEventListener('message', onMsg)
    ws.send(JSON.stringify({ id: msgId, method, params }))
  })
}

try {
  const list = await targets()
  const page = list.find((t) => t.type === 'page')
  const ws = new WebSocket(page.webSocketDebuggerUrl)
  await new Promise((res, rej) => {
    ws.addEventListener('open', res, { once: true })
    ws.addEventListener('error', rej, { once: true })
  })

  await rpc(ws, 'Page.enable')
  await rpc(ws, 'Emulation.setDeviceMetricsOverride', {
    width: Number(w),
    height: Number(h),
    deviceScaleFactor: 2,
    mobile: mobile === '1',
    screenWidth: Number(w),
    screenHeight: Number(h),
  })

  const loaded = new Promise((res) => {
    const onMsg = (ev) => {
      const m = JSON.parse(ev.data)
      if (m.method === 'Page.loadEventFired') {
        ws.removeEventListener('message', onMsg)
        res()
      }
    }
    ws.addEventListener('message', onMsg)
  })
  await rpc(ws, 'Page.navigate', { url })
  await Promise.race([loaded, sleep(15000)])
  await sleep(1200) // let webfonts settle

  const metrics = await rpc(ws, 'Runtime.evaluate', {
    expression:
      'JSON.stringify({vw:document.documentElement.clientWidth,sw:document.documentElement.scrollWidth,sh:document.documentElement.scrollHeight})',
    returnByValue: true,
  })
  const m = JSON.parse(metrics.result.value)

  const shot = await rpc(ws, 'Page.captureScreenshot', {
    format: 'png',
    captureBeyondViewport: true,
    clip: {
      x: 0,
      y: Number(yOffset),
      width: Number(w),
      height: Math.min(Math.max(m.sh - Number(yOffset), 1), Number(h)),
      scale: 1.5,
    },
  })
  writeFileSync(outFile, Buffer.from(shot.data, 'base64'))

  const verdict = m.sw > m.vw + 1 ? `OVERFLOW (+${m.sw - m.vw}px)` : 'no overflow'
  console.log(`${outFile}  viewport=${m.vw}  scrollWidth=${m.sw}  pageHeight=${m.sh}  ${verdict}`)
  ws.close()
} finally {
  chrome.kill()
}
