const puppeteer = require("puppeteer");

(async () => {

jamjits = '[{"jam_ip" : "' + process.argv[2] + '", "jit_url" : "' + process.argv[3] + '"}]' ;
var jjs = JSON.parse(jamjits);
var probed_calls = [] ;
for (const jj of jjs) {
  const browser = await puppeteer.launch({
    executablePath: "/usr/bin/chromium-browser",
    args: [ "--use-fake-ui-for-media-stream" ]
  });
  const page = await browser.newPage();
  await page.goto(jj.jit_url);
  await page.waitForTimeout(3000);
  await page.click('.action-btn');
  await page.waitForTimeout(1000);
  var element = await page.$('[aria-label="Toggle tile view"]');
  await page.waitForTimeout(2000);
  await element.click();
  await page.waitForTimeout(1000);
  let targetzone = await page.$$('.videocontainer') ;
  let num_here = targetzone.length - 2;
  await page.waitForTimeout(1000);
  await page.click('.hangup-button');
  await page.waitForTimeout(5000);
  browser.close();
  probed_calls.push( { "ip" : jj.jam_ip, "url" : jj.jit_url, "actives" : num_here } );
}
console.log(probed_calls);
})();

