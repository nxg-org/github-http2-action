const core = require("@actions/core");
const { request, METHOD_POST } = require('./httpClient');
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
const body = core.getInput('files') || undefined;
const method = core.getInput('method') || METHOD_POST;


request({url, method, data, http2, body, headers})

// request({ data, method, instanceConfig, auth, preventFailureOnNoResponse, escapeData, files, ignoredCodes, actions: new GithubActions() })
