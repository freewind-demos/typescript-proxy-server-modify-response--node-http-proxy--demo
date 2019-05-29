import httpProxy from 'http-proxy';
import http from "http";

const proxy = httpProxy.createProxyServer({});

proxy.on('proxyRes', (proxyRes, req, res) => {
  let body = Buffer.from('');
  proxyRes.on('data', function (data) {
    body = Buffer.concat([body, data]);
  });
  proxyRes.on('end', function () {
    const modifiedBody = body.toString().replace('[placeholder]', 'proxy server! (modified)');
    res.end(modifiedBody);
  });
});

http.createServer((req, res) => {
  proxy.web(req, res, {
    target: 'http://localhost:39738',
    selfHandleResponse: true
  });
}).listen(8000, () => {
  console.log('http://localhost:8000')
});
