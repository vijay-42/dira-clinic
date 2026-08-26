/* Lists every clinic detail still awaiting a real value.
 * Run with: npm run check */
import { readFileSync } from 'node:fs'

const FILES = ['content/clinic.ts', 'content/doctor.ts']
const outstanding = []
/* Details deliberately left blank for now. They are hidden on the site rather
 * than shown as a marker, so this list is the only thing that remembers them. */
const pending = []

/** Pulls the nearest preceding /** ... *\/ comment as context. */
function hintAbove(lines, index) {
  const parts = []
  for (let j = index - 1; j >= 0 && j > index - 10; j--) {
    const t = lines[j].trim()
    // A whole comment on one line: /** TODO City only, e.g. 'Pune'. */
    if (/^\/\*\*.*\*\/$/.test(t)) {
      parts.unshift(t.replace(/^\/\*+\s*/, '').replace(/\s*\*\/$/, ''))
      break
    }
    if (t === '*/' || t === '/**' || t.startsWith('/*')) {
      if (parts.length) break
      continue
    }
    if (t.startsWith('*')) {
      parts.unshift(t.replace(/^\*+\s?/, '').replace(/\s*\*\/\s*$/, ''))
      continue
    }
    if (parts.length) break
  }
  return parts.join(' ').replace(/^TODO[:\s]*/i, '').trim()
}

for (const file of FILES) {
  const lines = readFileSync(new URL(`../${file}`, import.meta.url), 'utf8').split('\n')
  lines.forEach((line, i) => {
    // Matches both `phone: TODO,` on its own line and `{ days: 'x', time: TODO, ... }`
    const matches = [...line.matchAll(/\b([A-Za-z0-9_]+):\s*TODO\b/g)]
    if (matches.length === 0) return

    // Skip the sentinel's own declaration and the helper signatures.
    if (/export const TODO/.test(line)) return

    for (const m of matches) {
      const context = line.trim().startsWith('{')
        ? line.trim().replace(/,$/, '')
        : hintAbove(lines, i)
      outstanding.push({ file, line: i + 1, field: m[1], hint: context })
    }
  })

  // A second pass for fields parked with a PENDING note in the comment above.
  lines.forEach((line, i) => {
    const m = line.match(/^\s*([A-Za-z0-9_]+):\s*(''|\[\])/)
    if (!m) return
    const hint = hintAbove(lines, i)
    if (!/^PENDING\b/i.test(hint)) return
    // First sentence only — the rest of the comment is instructions for the edit.
    const short = hint.replace(/^PENDING[:\s]*/i, '').split(/(?<=\.)\s/)[0]
    pending.push({ file, line: i + 1, field: m[1], hint: short })
  })
}

const BOLD = '\x1b[1m'
const DIM = '\x1b[2m'
const YEL = '\x1b[33m'
const GRN = '\x1b[32m'
const OFF = '\x1b[0m'

function list(rows) {
  for (const o of rows) {
    console.log(`  ${YEL}${o.field.padEnd(20)}${OFF}${DIM}${o.file}:${o.line}${OFF}`)
    if (o.hint) console.log(`  ${DIM}${' '.repeat(20)}${o.hint}${OFF}`)
  }
}

if (outstanding.length === 0) {
  console.log(`\n  ${GRN}All clinic details are filled in.${OFF} Ready to launch.`)
} else {
  console.log(`\n  ${BOLD}${outstanding.length} detail(s) still needed before launch${OFF}\n`)
  list(outstanding)
  console.log(`\n  Edit ${BOLD}content/clinic.ts${OFF} (and content/doctor.ts) to fill these in.`)
  console.log(`  Anything left unfilled renders on the site as a visible [MARKER].`)
}

if (pending.length > 0) {
  console.log(`\n  ${BOLD}${pending.length} detail(s) parked for later${OFF} ${DIM}— hidden on the site until supplied${OFF}\n`)
  list(pending)
}
console.log('')
