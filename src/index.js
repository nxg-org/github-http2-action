const core = require("@actions/core")
const exec = require("child_process").exec
const join = require("path").join

const url = core.getInput('url', { required: true })
const method = core.getInput('method') || "POST";
const headers = { 'Content-Type': core.getInput('contentType') || 'application/json', ...customHeaders }
const data = core.getInput('data') || undefined;
const body = core.getInput('body') || undefined;
let customHeaders = {}

if (!!core.getInput('customHeaders')) {
  try {
    customHeaders = JSON.parse(core.getInput('customHeaders'));
  } catch(error) {
    core.error('Could not parse customHeaders string value')
  }
}


//Thanks yaml 1.2
const http2 = core.getInput('http2').toLowerCase() === 'true' || false;

const args = `${url} ${method}`



exec(`"${join(__dirname, 'github-http-reqs')}" -u=https://httpbin.org/anything -m=GET -J='{"h": 1}' -H='{"hi-there": "you guys"}' -b='erwerwerweew' -v=2`, (error, stdout, stderr) => {
    if (error) {
      core.error(`exec error: ${error}`);
      return;
    }
    core.setOutput(JSON.stringify(`${stdout}`));
    core.setOutput(JSON.stringify(`${stderr}`));
  });


// const core = require("@actions/core");
// const { newRequest } = require('./newHttpClient');

// let customHeaders = {}

// if (!!core.getInput('customHeaders')) {
//   try {
//     customHeaders = JSON.parse(core.getInput('customHeaders'));
//   } catch(error) {
//     core.error('Could not parse customHeaders string value')
//   }
// }

// const url = core.getInput('url', { required: true })
// const method = core.getInput('method') || "POST";
// const headers = { 'Content-Type': core.getInput('contentType') || 'application/json', ...customHeaders }
// const data = core.getInput('data') || undefined;
// const body = core.getInput('body') || undefined;

// //Thanks yaml 1.2
// const http2 = core.getInput('http2').toLowerCase() === 'true' || false;


// newRequest({url: url, method: method, data: data, http2: http2, body: body, headers: headers})