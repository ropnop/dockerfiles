const { send } = require('micro');
const _ = require('lodash');
const rawBody = require('raw-body');
const requestIp = require('request-ip');

const renderMessage = (data) => {
  let headerstext = _.reduce(data.headers, (headerstext, headerval, headername) => {
    return headerstext + `${headername}: ${headerval}\n`;
  }, '');
  return `
New Request To: ${data.host}${data.url}
Request From: ${data.ip}
Time (UTC): ${data.timestamp}
Request Details:
---
${data.method} ${data.url} HTTP/${data.httpVersion}
${headerstext}
${data.body}
---
`
}

module.exports = async (req, res) => {
  const clientIp = requestIp.getClientIp(req);
  const now = new Date();
  let headers = req.headers;
  const data = {
    host: req.headers.host,
    url: req.url,
    httpVersion: req.httpVersion,
    method: req.method,
    headers: headers,
    protocol: req.protocol,
    body: String(await rawBody(req)),
    ip: clientIp,
    timestamp: now.toISOString()
  };

  const message = renderMessage(data);

  console.log(message)
  send(res, 404);
}
