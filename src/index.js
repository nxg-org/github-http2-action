const core = require("@actions/core");
const { newRequest, METHOD_POST } = require('./newHttpClient');
const { GithubActions } = require('./githubActions');

let auth = undefined
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

const data = core.getInput('data') || '{}';
const http2 = core.getInput('http2') || false;
const body = core.getInput('body') || undefined;
const method = core.getInput('method') || METHOD_POST;


newRequest({url: url, method: method, data: data, http2: http2, body: body, headers: headers})

// request({ data, method, instanceConfig, auth, preventFailureOnNoResponse, escapeData, files, ignoredCodes, actions: new GithubActions() })
