const puppeteer = require("puppeteer");

(async () => {

jamjits = '[{"jam_ip" : "35.0.0.1:454545", "jit_url" : "https://meet.jit.si/CKsJamulusMucMusic#userInfo.displayName=\"jamulus.live\"}]' ;
var jjs = JSON.parse(jamjits);
for (const jj of jjs) {
  const browser = await puppeteer.launch({
    args: [ '--use-fake-ui-for-media-stream' ]
    // , executablePath: '/usr/bin/chromium-browser'
  })
  const page = await browser.newPage();
  await page.goto("https://meet.jit.si/CKsJamulusMucMusic#userInfo.displayName=\"jamulus.live\"");
  await page.waitForTimeout(3000);
  await page.click('.action-btn');
  await page.waitForTimeout(1000);
  var element = await page.$('[aria-label="Toggle tile view"]');
  await page.waitForTimeout(2000);
  await element.click();
  await page.waitForTimeout(1000);
  let targetzone = await page.$$('.videocontainer') ;
  let num_here = targetzone.length;
  await page.waitForTimeout(1000);
  await page.click('.hangup-button');
  await page.waitForTimeout(10000);
  browser.close();
  console.log(jj.jan_ip + jj.jit_url + num_here);
})();

