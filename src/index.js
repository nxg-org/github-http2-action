const core = require("@actions/core")
const exec = require("child_process").exec
const join = require("path").join


let customHeaders = {}
if (!!core.getInput('customHeaders')) {
  try {
    customHeaders = JSON.parse(core.getInput('customHeaders'));
  } catch(error) {
    core.error('Could not parse customHeaders string value')
  }
}

const url = core.getInput('url', { required: true })
const method = core.getInput('method') || "POST";
const headers = { 'Content-Type': core.getInput('contentType') || 'application/json', ...customHeaders }
const json = core.getInput('json') || undefined;
const body = core.getInput('body') || undefined;

//Thanks yaml 1.2
const httpVersion = core.getInput('http2').toLowerCase() === 'true' || false;

const args = `-u=${url}` + ` -m=${method}` +  (!!json ? `-J=${JSON.stringify(json)}` : '') + (!!headers ? `-H=${JSON.stringify(headers)}` : '') + (!!body ? ` -b=${body}` : '') + (!!httpVersion? `-v=${httpVersion}`: '')

core.error(`JSON shit what the fuck: ${json}`)
core.error(args)

exec(`"${join(__dirname, 'github-http-reqs')}" ${args}`, (error, stdout, stderr) => {
    if (error) {
      core.error(`exec error: ${error}`);
      return;
    }
    core.setOutput("body", JSON.stringify(`${stdout}`));
    core.setOutput("headers", JSON.stringify(`${stderr}`));
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


//Thanks yaml 1.2
// const http2 = core.getInput('http2').toLowerCase() === 'true' || false;


// newRequest({url: url, method: method, data: data, http2: http2, body: body, headers: headers})