const httpProxy = require('http-proxy');

httpProxy.createProxyServer({
  target: 'http://localhost:43762'
}).listen(8000);
