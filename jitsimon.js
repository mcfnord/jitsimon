const puppeteer = require("puppeteer");

// const fs = require ('fs');

(async () => {

  // feed me a local file. i'll parse it and produce output that jamfan can ingest.
  // jjs = [];

  var jjs = JSON.parse(require('fs').readFileSync(process.argv[2], 'utf8'));

  /*
  fs.readFile(process.argv[2], 'utf8', (error, data) => {
    if(error){
       console.log(error);
       return;
    }
    jjs = JSON.parse(data);
    console.log(jjs);
})
*/

// jamjits =
//  '[{"jam_ip" : "' + process.argv[2] + '", "jit_url" : "' + process.argv[3] + '"}]' ;
console.log("hahaha");
console.log(jjs) ;
var probed_calls = [] ;
for (const jj of jjs) {
  console.log("sup " + JSON.stringify(jj));
  const browser = await puppeteer.launch({
//    executablePath: "/usr/bin/chromium-browser",
    args: [ "--use-fake-ui-for-media-stream" ]
  });
  const page = await browser.newPage();
  await page.goto(jj.jit_url);
  await page.waitForTimeout(3000);

  //await page.click('.action-btn');
  var joinElement = await page.$('[aria-label="Join meeting"]');
  page.click(joinElement);
  console.log("Clicked 1.");
  await page.waitForTimeout(1000);
  var element = await page.$('[aria-label="Toggle tile view"]');
  console.log("Clicked 2.");
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

