const puppeteer = require("puppeteer");

const { promisify } = require('util');
const sleep = promisify(setTimeout);

// const fs = require ('fs');

(async () => {
  var jjs = JSON.parse(require('fs').readFileSync(process.argv[2], 'utf8'));

var probed_calls = [] ;
const browser = await puppeteer.launch({
    executablePath: "/snap/bin/chromium",
    args: [ "--use-fake-ui-for-media-stream", "--no-sandbox" ]
  });

await sleep(5000) ;

for (const jj of jjs) {
  const page = await browser.newPage();
  await sleep(3000);
  await page.goto(jj.jit_url);
  await sleep(3000);
  await page.click('[aria-label="Join meeting"]');
  await sleep(3000);
  await page.click('[aria-label="Toggle tile view"]') ;
//  var element = await page2.$('[aria-label="Toggle tile view"]');
  await sleep(2000);
  let targetzone = await page.$$('.videocontainer') ;
  let num_here = targetzone.length - 2;
  await sleep(1000) ;
  await page.click('.hangup-button');
  await sleep(1000);
//  browser.close();
  console.log("for " + jj.jam_ip + " jitsi " + jj.jit_url + " has " + num_here + " connections.");
  if(num_here > 0)
    probed_calls.push( { "ip" : jj.jam_ip, "url" : jj.jit_url, "actives" : num_here } );
}
browser.close();

var output = "" ;
for(const item of probed_calls)
{
    output = output + item.ip + " " + item.url + "\n" ;
}

console.log(output);

const FileSystem = require("fs");
FileSystem.writeFile(process.argv[3], output, (error) => {
    if (error) throw error;
  });

})();

