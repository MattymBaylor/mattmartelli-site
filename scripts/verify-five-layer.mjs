import { chromium } from "playwright";
import { mkdirSync } from "node:fs";

const BASE = "http://localhost:3111";
const OUT = process.env.OUT_DIR || "./playwright-out";
mkdirSync(OUT, { recursive: true });

const VIEWPORTS = [
  { name: "desktop", width: 1440, height: 900 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "mobile", width: 390, height: 844 },
];

const results = [];
const pass = (t, m) => { results.push({ ok: true, t, m }); console.log(`  PASS  ${t} — ${m}`); };
const fail = (t, m) => { results.push({ ok: false, t, m }); console.log(`  FAIL  ${t} — ${m}`); };
const chk = (c, t, m) => (c ? pass(t, m) : fail(t, m));

// --- WCAG contrast helpers ---
const srgb = (c) => { c /= 255; return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4); };
const lum = ([r, g, b]) => 0.2126 * srgb(r) + 0.7152 * srgb(g) + 0.0722 * srgb(b);

// Parse a CSS color into [r,g,b,a]. Alpha is ONLY the 4th component — reading
// it positionally off a 3-component rgb() silently captures the blue channel.
function parseColor(s) {
  const n = (s.match(/[\d.]+/g) || []).map(Number);
  if (n.length < 3) return [0, 0, 0, 1];
  return [n[0], n[1], n[2], n.length >= 4 ? n[3] : 1];
}
// Composite src over dst (both [r,g,b,a]), returning an opaque [r,g,b].
function over(src, dst) {
  const a = src[3];
  return [0, 1, 2].map((i) => src[i] * a + dst[i] * (1 - a));
}
function ratio(fgStr, bgRgb) {
  const eff = over(parseColor(fgStr), [...bgRgb, 1]);
  const L1 = lum(eff), L2 = lum(bgRgb);
  return (Math.max(L1, L2) + 0.05) / (Math.min(L1, L2) + 0.05);
}

const browser = await chromium.launch();

for (const vp of VIEWPORTS) {
  console.log(`\n${"=".repeat(66)}\n${vp.name.toUpperCase()} ${vp.width}x${vp.height}\n${"=".repeat(66)}`);
  const page = await browser.newPage({ viewport: { width: vp.width, height: vp.height } });
  await page.goto(`${BASE}/recruiter`, { waitUntil: "networkidle" });
  await page.waitForTimeout(300);

  const S5 = 'section[aria-labelledby="five-layer"]';
  const STR = 'section[aria-labelledby="target-roles"]';
  const SFN = 'section[aria-labelledby="field-note"]';

  // ---- 1. SECTION RHYTHM ----
  const gaps = await page.evaluate(([s5, str, sfn]) => {
    const r = (s) => document.querySelector(s).getBoundingClientRect();
    const tr = r(str), fl = r(s5), fn = r(sfn);
    const prev = document.querySelector(str).previousElementSibling;
    return {
      trToFive: fl.top - tr.bottom,
      fiveToFieldNote: fn.top - fl.bottom,
      baseline: prev ? tr.top - prev.getBoundingClientRect().bottom : null,
      mt: getComputedStyle(document.querySelector(s5)).marginTop,
    };
  }, [S5, STR, SFN]);
  console.log(`  [rhythm] target-roles→five-layer = ${gaps.trToFive.toFixed(2)}px`);
  console.log(`  [rhythm] five-layer→field-note   = ${gaps.fiveToFieldNote.toFixed(2)}px`);
  console.log(`  [rhythm] page baseline gap        = ${gaps.baseline?.toFixed(2)}px   computed margin-top=${gaps.mt}`);
  chk(Math.abs(gaps.trToFive - 48) <= 1, `[${vp.name}] rhythm above`, `${gaps.trToFive.toFixed(2)}px vs 48px expected`);
  chk(Math.abs(gaps.fiveToFieldNote - 48) <= 1, `[${vp.name}] rhythm below`, `${gaps.fiveToFieldNote.toFixed(2)}px vs 48px expected`);
  chk(Math.abs(gaps.trToFive - gaps.fiveToFieldNote) <= 1, `[${vp.name}] rhythm symmetry`, `delta ${Math.abs(gaps.trToFive - gaps.fiveToFieldNote).toFixed(2)}px`);

  // ---- 2. LEFT ALIGNMENT ----
  const align = await page.evaluate(([s5, sfn]) => {
    const sec = document.querySelector(s5);
    const x = (el) => (el ? +el.getBoundingClientRect().left.toFixed(2) : null);
    return {
      fieldNoteH2: x(document.querySelector(sfn).querySelector("h2")),
      eyebrow: x(sec.querySelector("p")),
      h2: x(sec.querySelector("h2")),
      lead: x(sec.querySelectorAll("p")[1]),
      btnRow: x(sec.querySelectorAll("button")[0].parentElement),
      btn1: x(sec.querySelectorAll("button")[0]),
      btn2: x(sec.querySelectorAll("button")[1]),
      btn1Right: +sec.querySelectorAll("button")[0].getBoundingClientRect().right.toFixed(2),
      btnSameRow:
        Math.abs(sec.querySelectorAll("button")[0].getBoundingClientRect().top -
                 sec.querySelectorAll("button")[1].getBoundingClientRect().top) < 1,
      cards: [...sec.querySelectorAll("ol > li")].map(x),
      link: x(sec.querySelector("a[href$='.html']")),
    };
  }, [S5, SFN]);
  const ref = align.fieldNoteH2;
  // The two controls share one flex row: only the row's leading edge is a
  // left-alignment landmark. btn2 legitimately sits beside btn1 (gap-2), and
  // only wraps to the shared x when the row runs out of width.
  const items = [["eyebrow", align.eyebrow], ["h2", align.h2], ["lead", align.lead],
    ["btn row", align.btnRow], ["btn:expand", align.btn1], ["link", align.link],
    ...align.cards.map((c, i) => [`card${i + 1}`, c])];
  const gapToBtn2 = +(align.btn2 - align.btn1Right).toFixed(2);
  console.log(`  [align] btn:spotlight  x=${align.btn2}px  (beside btn1, same row=${align.btnSameRow}, gap=${gapToBtn2}px)`);
  chk(align.btnSameRow ? Math.abs(gapToBtn2 - 8) <= 1 : Math.abs(align.btn2 - ref) <= 1,
    `[${vp.name}] control row spacing`,
    align.btnSameRow ? `btn2 sits beside btn1 with gap-2 (${gapToBtn2}px)` : `btn2 wrapped to shared x=${align.btn2}px`);
  console.log(`  [align] reference #field-note h2 x = ${ref}px`);
  const drift = items.filter(([, v]) => Math.abs(v - ref) > 1);
  items.forEach(([n, v]) => console.log(`  [align] ${n.padEnd(14)} x=${v}px  Δ=${(v - ref).toFixed(2)}`));
  chk(drift.length === 0, `[${vp.name}] left alignment`,
    drift.length ? `drift: ${drift.map(([n, v]) => `${n} Δ${(v - ref).toFixed(2)}px`).join(", ")}` : `all ${items.length} elements share x=${ref}px`);

  // ---- 3. RIGHT EDGE / OVERFLOW ----
  await page.click(`${S5} button:has-text("Expand all")`);
  await page.waitForTimeout(450);
  const ov = await page.evaluate((s5) => {
    const sec = document.querySelector(s5);
    const cards = [...sec.querySelectorAll("ol > li")];
    const cr = sec.getBoundingClientRect();
    return {
      bodyScroll: document.body.scrollWidth, bodyClient: document.body.clientWidth,
      docScroll: document.documentElement.scrollWidth, docClient: document.documentElement.clientWidth,
      secScroll: sec.scrollWidth, secClient: sec.clientWidth,
      worstRight: Math.max(...cards.map((c) => c.getBoundingClientRect().right - cr.right)),
    };
  }, S5);
  console.log(`  [overflow] body ${ov.bodyScroll}/${ov.bodyClient}  doc ${ov.docScroll}/${ov.docClient}  section ${ov.secScroll}/${ov.secClient}`);
  console.log(`  [overflow] worst card right-overhang = ${ov.worstRight.toFixed(2)}px`);
  chk(ov.docScroll <= ov.docClient, `[${vp.name}] no horizontal scrollbar`, `doc scrollWidth ${ov.docScroll} <= clientWidth ${ov.docClient}`);
  chk(ov.secScroll <= ov.secClient, `[${vp.name}] section no overflow`, `${ov.secScroll} <= ${ov.secClient}`);
  chk(ov.worstRight <= 0.5, `[${vp.name}] cards within container`, `max overhang ${ov.worstRight.toFixed(2)}px`);

  if (vp.name === "desktop") {
    await page.screenshot({ path: `${OUT}/04-all-expanded-desktop.png`, fullPage: false });
    const sec = page.locator(S5);
    await sec.screenshot({ path: `${OUT}/04-all-expanded-section.png` });
  }

  // collapse back
  await page.click(`${S5} button:has-text("Collapse all")`);
  await page.waitForTimeout(400);

  // ---- 4. ACCORDION ----
  await page.reload({ waitUntil: "networkidle" });
  await page.waitForTimeout(300);
  const headers = page.locator(`${S5} ol > li button[aria-expanded]`);
  const initial = await headers.evaluateAll((els) => els.map((e) => e.getAttribute("aria-expanded")));
  console.log(`  [accordion] initial aria-expanded = [${initial.join(", ")}]`);
  chk(initial[0] === "true" && initial.slice(1).every((v) => v === "false"),
    `[${vp.name}] layer 1 starts open`, `[${initial.join(", ")}]`);

  // No layout shift above the toggled card. Measure in ABSOLUTE DOCUMENT
  // coords — Playwright auto-scrolls before clicking, so viewport-relative
  // boundingBox() would report that scroll as a false "shift".
  const absTop = (sel) => page.evaluate((s) =>
    document.querySelector(s).getBoundingClientRect().top + window.scrollY, sel);
  const h2Before = await absTop(`${S5} h2`);
  const card3Before = await page.evaluate((s) =>
    document.querySelectorAll(`${s} ol > li`)[2].getBoundingClientRect().top + window.scrollY, S5);
  await headers.nth(2).click();
  await page.waitForTimeout(400);
  const h2After = await absTop(`${S5} h2`);
  const card3After = await page.evaluate((s) =>
    document.querySelectorAll(`${s} ol > li`)[2].getBoundingClientRect().top + window.scrollY, S5);
  const shift = Math.abs(h2After - h2Before);
  const card3Shift = Math.abs(card3After - card3Before);
  console.log(`  [accordion] abs doc y — h2 ${h2Before}→${h2After}, card3 top ${card3Before}→${card3After}`);
  chk(card3Shift <= 1, `[${vp.name}] toggled card's own top holds`, `card3 top moved ${card3Shift.toFixed(2)}px`);
  const after = await headers.evaluateAll((els) => els.map((e) => e.getAttribute("aria-expanded")));
  console.log(`  [accordion] after toggling layer 3 = [${after.join(", ")}]  heading shift=${shift.toFixed(2)}px`);
  chk(after[2] === "true", `[${vp.name}] toggle sets aria-expanded`, `layer3 → ${after[2]}`);
  chk(shift <= 1, `[${vp.name}] no shift above on toggle`, `heading moved ${shift.toFixed(2)}px`);
  await headers.nth(2).click();
  await page.waitForTimeout(300);
  const reCollapsed = await headers.nth(2).getAttribute("aria-expanded");
  chk(reCollapsed === "false", `[${vp.name}] toggle collapses`, `layer3 → ${reCollapsed}`);

  // expand all → collapse all
  await page.click(`${S5} button:has-text("Expand all")`);
  await page.waitForTimeout(400);
  const allE = await headers.evaluateAll((els) => els.map((e) => e.getAttribute("aria-expanded")));
  chk(allE.every((v) => v === "true"), `[${vp.name}] expand all`, `[${allE.join(", ")}]`);
  await page.click(`${S5} button:has-text("Collapse all")`);
  await page.waitForTimeout(400);
  const allC = await headers.evaluateAll((els) => els.map((e) => e.getAttribute("aria-expanded")));
  chk(allC.every((v) => v === "false"), `[${vp.name}] collapse all`, `[${allC.join(", ")}]`);

  // ---- 5. SPOTLIGHT ----
  const spot = page.locator(`${S5} button:has-text("Where does technology live?")`);
  await spot.click();
  await page.waitForTimeout(500);
  const sp = await page.evaluate((s5) => {
    const sec = document.querySelector(s5);
    return {
      pressed: sec.querySelectorAll("button")[1].getAttribute("aria-pressed"),
      op: [...sec.querySelectorAll("ol > li")].map((c) => +getComputedStyle(c).opacity),
      borders: [...sec.querySelectorAll("ol > li")].map((c) => getComputedStyle(c).borderTopColor),
      shadows: [...sec.querySelectorAll("ol > li")].map((c) => getComputedStyle(c).boxShadow !== "none"),
    };
  }, S5);
  console.log(`  [spotlight] aria-pressed=${sp.pressed}  opacities=[${sp.op.join(", ")}]`);
  console.log(`  [spotlight] layer3 border=${sp.borders[2]}  glow=${sp.shadows[2]}`);
  chk(sp.pressed === "true", `[${vp.name}] spotlight aria-pressed`, `= ${sp.pressed}`);
  const dimOK = [0, 1, 3, 4].every((i) => Math.abs(sp.op[i] - 0.3) < 0.02);
  chk(dimOK, `[${vp.name}] layers 1,2,4,5 dimmed`, `opacities ${[0, 1, 3, 4].map((i) => sp.op[i]).join(", ")} ≈ 0.3`);
  chk(sp.op[2] === 1, `[${vp.name}] layer 3 fully opaque`, `opacity ${sp.op[2]}`);
  chk(sp.shadows[2] && /34,\s*211,\s*238|cyan/i.test(sp.borders[2]), `[${vp.name}] layer 3 cyan glow`, `border ${sp.borders[2]}, shadow ${sp.shadows[2]}`);

  if (vp.name === "desktop") {
    await page.locator(S5).screenshot({ path: `${OUT}/05-spotlight-section.png` });
    await page.screenshot({ path: `${OUT}/05-spotlight-desktop.png` });
  }
  await spot.click();
  await page.waitForTimeout(300);

  // ---- 6. MOBILE ----
  if (vp.name === "mobile") {
    const m = await page.evaluate((s5) => {
      const sec = document.querySelector(s5);
      const li = sec.querySelector("ol > li");
      const pill = [...li.querySelectorAll("span")].find((s) => /emerging|seed/i.test(s.textContent.trim()) && s.className.includes("rounded-full"));
      li.querySelector("button[aria-expanded]").click();
      return new Promise((res) => setTimeout(() => {
        const panel = li.querySelector('[id^="layer-panel-"]');
        const cs = panel ? getComputedStyle(panel) : null;
        const hdr = li.querySelector("button[aria-expanded]");
        res({
          pillDisplay: pill ? getComputedStyle(pill).display : "ABSENT",
          panelPadLeft: cs ? cs.paddingLeft : null,
          cardLeft: +li.getBoundingClientRect().left.toFixed(2),
          panelContentLeft: panel ? +panel.querySelector("p").getBoundingClientRect().left.toFixed(2) : null,
          hdrHeight: +hdr.getBoundingClientRect().height.toFixed(2),
          hdrScrollW: hdr.scrollWidth, hdrClientW: hdr.clientWidth,
        });
      }, 450));
    }, S5);
    console.log(`  [mobile] rung pill display=${m.pillDisplay}`);
    console.log(`  [mobile] panel padding-left=${m.panelPadLeft}  card left=${m.cardLeft}  panel text left=${m.panelContentLeft}`);
    console.log(`  [mobile] header height=${m.hdrHeight}px  scrollW/clientW=${m.hdrScrollW}/${m.hdrClientW}`);
    chk(m.pillDisplay === "none", `[mobile] rung pill hidden`, `display=${m.pillDisplay}`);
    chk(parseFloat(m.panelPadLeft) < 24, `[mobile] no 5.5rem indent`, `padding-left=${m.panelPadLeft} (5.5rem would be 88px)`);
    chk(m.panelContentLeft - m.cardLeft < 24, `[mobile] body collapses to card edge`, `offset ${(m.panelContentLeft - m.cardLeft).toFixed(2)}px`);
    chk(m.hdrScrollW <= m.hdrClientW, `[mobile] header no overflow`, `${m.hdrScrollW} <= ${m.hdrClientW}`);
    await page.locator(S5).screenshot({ path: `${OUT}/06-mobile-section.png` });
    await page.screenshot({ path: `${OUT}/06-mobile-viewport.png` });
  }

  // ---- 7. CONTRAST ----
  if (vp.name === "desktop") {
    await page.reload({ waitUntil: "networkidle" });
    await page.waitForTimeout(300);
    const con = await page.evaluate((s5) => {
      const sec = document.querySelector(s5);
      const li = sec.querySelector("ol > li");
      // Full ancestor background stack, root-first, so translucent surfaces
      // can be composited rather than treated as if they were opaque.
      const bgChain = (el) => {
        const chain = [];
        for (let n = el; n; n = n.parentElement) {
          const b = getComputedStyle(n).backgroundColor;
          if (b && b !== "transparent" && !/,\s*0\)$/.test(b)) chain.push(b);
        }
        chain.push("rgb(255,255,255)"); // canvas backstop
        return chain.reverse();
      };
      const grab = (el, label) => el && ({ label, color: getComputedStyle(el).color, bgChain: bgChain(el), size: getComputedStyle(el).fontSize, weight: getComputedStyle(el).fontWeight });
      const panel = li.querySelector('[id^="layer-panel-"]');
      return [
        grab(sec.querySelector("a[href$='.html']"), "accent link (#22D3EE)"),
        grab([...li.querySelectorAll("span")].find((s) => s.className.includes("text-accent-cyan")), "rung pill accent"),
        grab(sec.querySelectorAll("p")[1], "lead text-ink-muted"),
        grab(panel && panel.querySelector("p"), "panel body text-ink-muted"),
        grab(panel && panel.querySelector("dd"), "dd text-ink-muted"),
      ].filter(Boolean);
    }, S5);
    for (const c of con) {
      // Flatten the ancestor stack into one opaque effective background.
      const bg = c.bgChain.reduce((acc, s) => over(parseColor(s), [...acc, 1]),
        parseColor(c.bgChain[0]).slice(0, 3));
      const r = ratio(c.color, bg);
      const px = parseFloat(c.size);
      const large = px >= 24 || (px >= 18.66 && Number(c.weight) >= 700);
      const req = large ? 3.0 : 4.5;
      const bgStr = `rgb(${bg.map((v) => Math.round(v)).join(",")})`;
      console.log(`  [contrast] ${c.label.padEnd(26)} ${c.color} on ${bgStr}  ${px}px  ratio=${r.toFixed(2)}:1  need ${req}:1`);
      chk(r >= req, `[contrast] ${c.label}`, `${r.toFixed(2)}:1 vs AA ${req}:1 required at ${px}px`);
    }
    await page.screenshot({ path: `${OUT}/01-default-desktop.png` });
    await page.locator(S5).screenshot({ path: `${OUT}/01-default-section.png` });
  }

  await page.close();
}

// ---- 8. STANDALONE ----
console.log(`\n${"=".repeat(66)}\nSTANDALONE /five-layer-framework.html\n${"=".repeat(66)}`);
{
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  const resp = await page.goto(`${BASE}/five-layer-framework.html`, { waitUntil: "networkidle" });
  console.log(`  [standalone] HTTP ${resp.status()}`);
  chk(resp.status() === 200, `[standalone] returns 200`, `HTTP ${resp.status()}`);

  const dark = await page.evaluate(() => {
    const b = getComputedStyle(document.body).backgroundColor;
    const [r, g, bl] = (b.match(/[\d.]+/g) || []).map(Number);
    return { bg: b, isDark: (0.2126 * r + 0.7152 * g + 0.0722 * bl) < 60 };
  });
  console.log(`  [standalone] body background=${dark.bg}`);
  chk(dark.isDark, `[standalone] renders dark`, `bg=${dark.bg}`);

  const hdrs = page.locator("[aria-expanded]");
  const n = await hdrs.count();
  const pre = await hdrs.evaluateAll((e) => e.map((x) => x.getAttribute("aria-expanded")));
  await hdrs.nth(1).click();
  await page.waitForTimeout(400);
  const post = await hdrs.evaluateAll((e) => e.map((x) => x.getAttribute("aria-expanded")));
  console.log(`  [standalone] ${n} headers; before=[${pre.join(",")}] after click #2=[${post.join(",")}]`);
  chk(n >= 5 && pre[1] !== post[1], `[standalone] accordion works`, `header 2: ${pre[1]} → ${post[1]}`);

  const spotBtn = page.locator("[aria-pressed]").first();
  const hasSpot = await spotBtn.count();
  if (hasSpot) {
    await spotBtn.click();
    await page.waitForTimeout(500);
    const s = await page.evaluate(() => {
      const btn = document.querySelector("[aria-pressed]");
      const cards = [...document.querySelectorAll("ol > li, .layer, [data-layer]")].slice(0, 5);
      return { pressed: btn.getAttribute("aria-pressed"), op: cards.map((c) => +getComputedStyle(c).opacity) };
    });
    console.log(`  [standalone] spotlight aria-pressed=${s.pressed} opacities=[${s.op.join(", ")}]`);
    chk(s.pressed === "true" && s.op[2] === 1 && s.op[0] < 0.9, `[standalone] spotlight works`,
      `pressed=${s.pressed}, layer3 opacity ${s.op[2]}, others dimmed`);
    await page.screenshot({ path: `${OUT}/08-standalone-spotlight.png` });
  } else {
    fail(`[standalone] spotlight control`, `no [aria-pressed] element found`);
  }
  await page.screenshot({ path: `${OUT}/08-standalone.png`, fullPage: false });
  await page.close();
}

await browser.close();

const failed = results.filter((r) => !r.ok);
console.log(`\n${"=".repeat(66)}`);
console.log(`RESULT: ${results.length - failed.length}/${results.length} passed`);
if (failed.length) { console.log(`\nFAILURES:`); failed.forEach((f) => console.log(`  ✗ ${f.t} — ${f.m}`)); }
console.log("=".repeat(66));
process.exit(failed.length ? 1 : 0);
