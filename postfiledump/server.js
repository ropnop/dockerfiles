const express = require('express');
const fs = require('fs');
const rawBody = require('raw-body');
const requestIp = require('request-ip');
const uuidv4 = require('uuid/v4');

const app = express();

const ipMiddleware = (req, res, next) => {
  // let clientIp;
  if (req.header('cf-connecting-ip')){
    req.clientIp = req.header('cf-connecting-ip'); // I want to always give priority to this header
  } else {
    req.clientIp = requestIp.getClientIp(req); // if it's not there then fall back
  }
  next();
};

const filenameMiddleware = (req, res, next) => {
  // if a path is scpecified, that will be the filename, otherwise it will be a uuid
  // this lets you quickly define a memorable filename if you want by just choosing where to POST
  let filename;
  if (req.path.length > 1) {
    req.filename = encodeURIComponent(req.path.slice(1));
  } else {
    req.filename = uuidv4();
  }
  next();
}

app.use(ipMiddleware);
app.use(filenameMiddleware);

// Modify this function to customize the slack message to your liking
const renderComment = (data) => {
  return `
*New Request To:* \`${data.host}${data.url}\`
*Request From:* \`${data.ip}\`
*Time (UTC):* \`${data.timestamp}\`
*Filename: * \`${data.filename}\`
`
}

app.post('*', async (req, res) => {
  // if path is specified, make that the filename, else a uuid
  const now = new Date();
  // var body = '';
  const bodyData = await rawBody(req);
  filePath = "/data/" + req.filename;
  const data = {
    host: req.headers.host,
    url: req.url,
    ip: req.clientIp,
    timestamp: now.toISOString(),
    filename: req.filename
  };
  const comment = renderComment(data);
  fs.appendFileSync(filePath, bodyData);
  console.log(req.filename +" written");
  res.end();
});


app.listen(3000, () => console.log("listening on port 3000"));
