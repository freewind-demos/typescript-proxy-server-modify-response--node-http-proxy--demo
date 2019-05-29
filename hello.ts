import httpProxy from 'http-proxy';
import http, {IncomingHttpHeaders, ServerResponse} from "http";

const proxy = httpProxy.createProxyServer({});

function modifyBody(body: string): string {
  return body.replace('[placeholder]', 'proxy server! (modified)');
}

function copyHeaders(headers: IncomingHttpHeaders, res: ServerResponse) {
  for (const key in headers) {
    let value = headers[key]!;
    console.log(`### header: ${key}=${value}`)
    res.setHeader(key, value)
  }
}

function resetContentLength(res: ServerResponse, body: string) {
  res.setHeader('content-length', body.length);
}

proxy.on('proxyRes', (proxyRes, req, res) => {
  let body = Buffer.from('');
  proxyRes.on('data', function (data) {
    body = Buffer.concat([body, data]);
  });
  proxyRes.on('end', function () {
    copyHeaders(proxyRes.headers, res);
    const modifiedContent = modifyBody(body.toString());
    resetContentLength(res, modifiedContent);
    res.end(modifiedContent);
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
