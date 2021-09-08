const {GithubActions} = require("./githubActions");
const actions = new GithubActions();
const http2 = require("http2-wrapper");
const got = require("got");
const { HttpsAgent } = require("agentkeepalive")


const https2Agent = new http2.Agent();

const httpsAgent = new HttpsAgent();


/**
 * @param {Object} param0
 * @param {string} param0.method HTTP Method
 * @param {string} param0.url request URL
 * @param {any} param0.data request Body as string, default: undefined
 * @param {any} param0.body Map of request Files (name: absolute path) as JSON String, default: undefined
 * @param {Object} param0.headers Map of headers.
 *
 * @returns {void}
 */

const newRequest = async ({url, method, data, http2, body, headers}) => {
  actions.debug({url, method, data, http2, body, headers})
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
      throwHttpErrors: false,
      responseType: 'text',
    })

    actions.setOutput('body', JSON.stringify(result.body))
    actions.setOutput('headers', JSON.stringify(result.headers))

  } catch (error) {
    actions.error(error);
  }
};

// (async () => { 
//   console.log(await newRequest({url: 'https://nghttp2.org/httpbin/headers', method: "GET", data: undefined, http2: true, body: undefined, headers: {"authorization": "bruh"}}))
// })();


module.exports = {
  newRequest
}
