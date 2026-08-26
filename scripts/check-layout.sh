#!/usr/bin/env bash
# Renders the built site at phone widths and reports any horizontal overflow.
# Requires Google Chrome. Run after `npm run build`, with the site served.
set -euo pipefail
PORT="${1:-4322}"
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
OUT=out

[ -d "$OUT" ] || { echo "No out/ directory — run npm run build first."; exit 1; }

# Serve out/ ourselves if nothing is already listening, so the check is
# self-contained and cannot silently probe a dead port.
SERVER_PID=""
if ! curl -sf -o /dev/null "http://localhost:$PORT/" 2>/dev/null; then
  npx --yes serve "$OUT" -l "$PORT" >/tmp/dira-serve.log 2>&1 &
  SERVER_PID=$!
  for _ in $(seq 1 40); do
    curl -sf -o /dev/null "http://localhost:$PORT/" 2>/dev/null && break
    sleep 0.25
  done
fi

# Plain copies at predictable filenames. The site is light only, so no theme
# stamping is needed any more.
SERVICE_PAGES="services/arthritis-treatment-in-bangalore services/immunology-and-rheumatology-treatment-in-bangalore services/physiotherapy-clinic-in-bangalore services/pharmacy-service-in-bangalore services/day-care-infusion-diagnostics-in-indiranagar"
for page in index about conditions services contact faq for-doctors patient-education dr-gaurang-deshpande $SERVICE_PAGES; do
  src="$OUT/$page/index.html"; [ "$page" = index ] && src="$OUT/index.html"
  flat=$(echo "$page" | tr '/' '-')
  [ -f "$src" ] && cp "$src" "$OUT/_light-$flat.html"
done

cat > "$OUT/_probe.html" <<'EOF'
<!doctype html><meta charset="utf-8"><body style="margin:0">
<pre id="out">running</pre>
<script>
const PAGES = ['index','about','conditions','services','contact','faq','for-doctors','patient-education','dr-gaurang-deshpande','services-arthritis-treatment-in-bangalore','services-immunology-and-rheumatology-treatment-in-bangalore','services-physiotherapy-clinic-in-bangalore','services-pharmacy-service-in-bangalore','services-day-care-infusion-diagnostics-in-indiranagar']
const WIDTHS = [320, 360, 390, 768]
const lines = []
window.onerror = (e) => { document.getElementById('out').textContent = 'JS ERROR: ' + e }
function measure(name, w) {
  return new Promise(res => {
    const f = document.createElement('iframe')
    f.style.cssText = 'width:' + w + 'px;height:800px;border:0;position:absolute;left:-99999px'
    f.src = '/_light-' + name + '.html'
    f.onload = () => {
      const d = f.contentDocument
      // A late onload on a torn-down frame yields a null document. Report which
      // page it was rather than throwing and losing the whole run.
      if (!d || !d.documentElement) {
        lines.push('NODOC     ' + name + ' @' + w)
        f.remove(); res(); return
      }
      const vw = d.documentElement.clientWidth
      const sw = d.documentElement.scrollWidth
      let detail = ''
      if (sw > vw + 1) {
        const bad = []
        d.querySelectorAll('*').forEach(el => {
          const r = el.getBoundingClientRect()
          if (r.right > vw + 1 && r.width > 0) {
            bad.push('      ' + Math.round(r.right) + 'px <' + el.tagName.toLowerCase() + '> ' +
              (typeof el.className === 'string' ? el.className.slice(0, 70) : ''))
          }
        })
        detail = '\n' + bad.slice(0, 6).join('\n')
      }
      if (sw > vw + 1) lines.push('OVERFLOW  ' + name + ' @' + w + '  scrollWidth=' + sw + ' > viewport=' + vw + detail)
      f.remove(); res()
    }
    f.onerror = () => { lines.push('LOADFAIL  ' + name); f.remove(); res() }
    document.body.appendChild(f)
  })
}
;(async () => {
  for (const p of PAGES) for (const w of WIDTHS) await measure(p, w)
  document.getElementById('out').textContent =
    lines.length ? lines.join('\n') : 'PASS — no horizontal overflow at 320/360/390/768 on any page.'
})()
</script>
EOF

"$CHROME" --headless --disable-gpu --window-size=1200,1000 --virtual-time-budget=90000 \
  --dump-dom "http://localhost:$PORT/_probe.html" 2>/dev/null > /tmp/dira-probe.html

cleanup() {
  rm -f "$OUT"/_light-*.html "$OUT"/_probe.html "$OUT"/_measure.html
  [ -n "$SERVER_PID" ] && kill "$SERVER_PID" 2>/dev/null
  return 0
}
trap cleanup EXIT

python3 -c "
import re,html,sys
s=open('/tmp/dira-probe.html').read()
m=re.search(r'<pre id=\"out\">(.*?)</pre>',s,re.S)
t=html.unescape(m.group(1)) if m else 'probe did not report'
print(t)
sys.exit(1 if ('OVERFLOW' in t or 'ERROR' in t or 'did not report' in t) else 0)"
