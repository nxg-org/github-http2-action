const core = require("@actions/core");
const { newRequest } = require('./newHttpClient');

let customHeaders = {}

if (!!core.getInput('customHeaders')) {
  try {
    customHeaders = JSON.parse(core.getInput('customHeaders'));
  } catch(error) {
    core.error('Could not parse customHeaders string value')
  }
}

const url = core.getInput('url', { required: true })
const headers = { 'Content-Type': core.getInput('contentType') || 'application/json', ...customHeaders }

const data = core.getInput('data') || undefined;
const http2 = core.getInput('http2').toLowerCase() === 'true' || false;
const body = core.getInput('body') || undefined;
const method = core.getInput('method') || "POST";


(async() => newRequest({url: url, method: method, data: data, http2: http2, body: body, headers: headers}))()