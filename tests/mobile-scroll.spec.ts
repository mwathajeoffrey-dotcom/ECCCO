import { test, expect, devices } from "@playwright/test";

test.use({ ...devices["iPhone 12"] });

test("mobile scroll audit - check overflow and large fixed overlays", async ({ page }) => {
  // Adjust URL if your app runs on a different port
  const url = process.env.E2E_URL ?? "http://localhost:3000";

  await page.goto(url, { waitUntil: "load" });
  await page.waitForTimeout(500); // small wait for client scripts

  const result = await page.evaluate(() => {
    const report: any = { bodyOverflow: null, docOverflow: null, overlays: [] };
    try {
      report.bodyOverflow = document.body.style.overflow || window.getComputedStyle(document.body).overflow;
      report.docOverflow =
        document.documentElement.style.overflow || window.getComputedStyle(document.documentElement).overflow;

      const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
      const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);

      const els = Array.from(document.querySelectorAll("body *")) as HTMLElement[];
      els.forEach((el) => {
        try {
          const cs = window.getComputedStyle(el);
          if (cs.position === "fixed" || cs.position === "sticky") {
            const rect = el.getBoundingClientRect();
            const coversWidth = rect.width >= vw * 0.5 || (rect.left <= 0 && rect.right >= vw * 0.5);
            const coversHeight = rect.height >= vh * 0.5 || (rect.top <= 0 && rect.bottom >= vh * 0.5);
            const z = parseInt(cs.zIndex || "0", 10) || 0;
            if (coversWidth && coversHeight && z >= 0) {
              report.overlays.push({
                tag: el.tagName,
                id: el.id || null,
                class: el.className || null,
                zIndex: cs.zIndex,
                display: cs.display,
                rect: { left: rect.left, top: rect.top, width: rect.width, height: rect.height },
              });
            }
          }
        } catch (e) {
          // ignore
        }
      });
    } catch (err) {
      report.error = String(err);
    }
    return report;
  });

  console.log("E2E mobile scroll audit for", url);
  console.log("body overflow:", result.bodyOverflow);
  console.log("documentElement overflow:", result.docOverflow);
  if (result.overlays && result.overlays.length) {
    console.log("Found overlays that may block scrolling:");
    result.overlays.forEach((o: any, i: number) => {
      console.log(
        `#${i + 1}: tag=${o.tag} id=${o.id} class=${o.class} zIndex=${o.zIndex} rect=${JSON.stringify(o.rect)}`
      );
    });
  } else {
    console.log("No large fixed/sticky overlays detected.");
  }

  // Basic assertions for CI: ensure body overflow is not 'hidden'
  expect(result.bodyOverflow).not.toBe("hidden");
});
