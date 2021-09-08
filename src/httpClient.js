const {GithubActions} = require("./githubActions");
const actions = new GithubActions();
const http2 = require("http2-wrapper");
const got = require("got");
const { HttpsAgent } = require("agentkeepalive")

const METHOD_GET = 'GET'
const METHOD_POST = 'POST'


const https2Agent = new http2.Agent({
  timeout: 60000,
  maxEmptySessions: 10000,
  maxCachedTlsSessions: 10000,
});

const httpsAgent = new HttpsAgent({
  keepAlive: true,
  keepAliveMsecs: 120000,
  maxSockets: Number.MAX_VALUE,
  maxFreeSockets: Number.MAX_VALUE,
  timeout: 60000,
  freeSocketTimeout: 120000,
  maxCachedSessions: 10000,
});


/**
 * @param {Object} param0
 * @param {string} param0.method HTTP Method
 * @param {{ baseURL: string; timeout: number; headers: { [name: string]: string } }} param0.instanceConfig
 * @param {string} param0.data Request Body as string, default {}
 * @param {string} param0.files Map of Request Files (name: absolute path) as JSON String, default: {}
 * @param {{ username: string; password: string }|undefined} param0.auth Optional HTTP Basic Auth
 * @param {*} param0.actions 
 * @param {number[]} param0.ignoredCodes Prevent Action to fail if the API response with one of this StatusCodes
 * @param {boolean} param0.preventFailureOnNoResponse Prevent Action to fail if the API respond without Response
 * @param {boolean} param0.escapeData Escape unescaped JSON content in data
 *
 * @returns {void}
 */

const request = async ( url, method, data, { http2, body, headers } = {}) => {
  try {
    var result = await got(url, {
      method,
      agent: {
        http: httpsAgent,
        https: httpsAgent,
        http2: https2Agent,
      },
      headers,
      body: body ? body : data ? JSON.stringify(data) : undefined,
      http2,
      dnsLookupIpVersion: 'ipv4',
      throwHttpErrors: false,
      responseType: 'text',
    })

    actions.setOutput('headers', JSON.stringify(result.headers))
    actions.setOutput('body', JSON.stringify(result.body))

  } catch (error) {
    if (error.toJSON) {
      actions.setOutput('requestError', JSON.stringify(error.toJSON()));
    } else {
      actions.debug(error)
    }
  }
};

(async () => { 
  console.log(await request('https://nghttp2.org/httpbin/headers', "GET", undefined, {http2: true, body: undefined, headers: {"authorization": "bruh"}}))
})();


module.exports = {
  request,
  METHOD_POST,
  METHOD_GET,
}
