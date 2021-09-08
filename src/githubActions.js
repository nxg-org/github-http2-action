//Not my code. https://github.com/fjogeleit/http-request-action/blob/master/src/githubActions.js
const core = require("@actions/core");

class GithubActions {
  debug(message) {
    core.debug(message)
  }

  warning(message) {
    core.warning(message)
  }

  setOutput(name, output) {
    core.setOutput(name, output)
  }

  setFailed(message) {
    core.setFailed(message)
  }

  error(message) {
    core.error(message)
  }
}

class LogActions {
  debug(message) {
    console.info(message)
  }

  warning(message) {
    console.warn(message)
  }

  setOutput(name, output) {
    console.log(name, output)
  }

  setFailed(message) {
    console.error(message)
  }
}

module.exports = { GithubActions, LogActions }
