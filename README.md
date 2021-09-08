# Note:
### This README is edited from [this project](https://github.com/fjogeleit/http-request-action).

# HTTP Request Action

**Create HTTP Requests from GitHub Actions.** This action allows GitHub events to engage with tools like Ansible AWX that use HTTP APIs.

### Example
```yaml
jobs:
  deployment:
    runs-on: ubuntu-latest
    steps:
    - name: Deploy Stage
      uses: nxg-org/github-actions-testing@master
      with:
        url: 'https://ansible.io/api/v2/job_templates/84/launch/'
        method: 'POST'
```

### Request Configuration

|Argument|  Description  |  Default  |
|--------|---------------|-----------|
|url     | Request URL   | _required_ Field |
|method  | Request Method| POST |
|contentType  | Request ContentType| application/json |
|data    | Request Body Content as JSON String, only for POST / PUT / PATCH Requests | '{}' |
|body    | Raw body content of request | '{}' |
|customHeaders| Additional header values as JSON string, keys in this object overwrite default headers like Content-Type |'{}'|

### Response

| Variable |  Description  |
|---|---|
`body` | Response as JSON String |
`headers` | Response headers 

To display HTTP response data in the GitHub Actions log give the request an `id` and access its `outputs`

```yaml
steps:
  - name: Make Request
    id: myRequest
    uses: nxg-org/github-actions-testing@master
    with:
      url: "http://yoursite.com/api"
  - name: Show Response
    run: echo ${{ steps.myRequest.outputs.body }}
```

### Additional Information

Additional information is available if debug logging is enabled:
- Instance Configuration (Url / Timeout / Headers)
- Request Data (Body / Auth / Method)

To [enable debug logging in GitHub Actions](https://docs.github.com/en/actions/managing-workflow-runs/enabling-debug-logging) create a secret `ACTIONS_RUNNER_DEBUG` with a value of `true`