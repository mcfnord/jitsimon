const puppeteer = require("puppeteer");

(async () => {
	const browser = await puppeteer.launch({
          args: [ '--use-fake-ui-for-media-stream' ]
//          , executablePath: '/usr/bin/chromium-browser'
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
//console.log(targetzone);
  let subcount = targetzone.length;
  console.log(subcount);
  await page.waitForTimeout(1000);
  await page.click('.hangup-button');
  await page.waitForTimeout(10000);
  browser.close();
})();

