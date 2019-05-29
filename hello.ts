import fs from 'fs';

const httpProxy = require('http-proxy');

httpProxy.createProxyServer({
  ssl: {
    key: fs.readFileSync('./ssl/key.pem', 'utf8'),
    cert: fs.readFileSync('./ssl/cert.pem', 'utf8'),
  },
  target: 'https://github.com',
  secure: true
}).listen(443);
