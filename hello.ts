import {IncomingMessage, ServerResponse} from 'http';

const http = require('http');
const httpProxy = require('http-proxy');
const HttpProxyRules = require('http-proxy-rules');

// Set up proxy rules instance
const proxyRules = new HttpProxyRules({
  rules: {
    // '.*/test': 'http://localhost:37238/cool', // Rule (1)
    // '.*/test2/': 'http://localhost:37238/cool2/', // Rule (2)
    // '/posts/([0-9]+)/comments/([0-9]+)': 'http://localhost:37238/p/$1/c/$2', // Rule (3)
    // '/author/([0-9]+)/posts/([0-9]+)/': 'http://localhost:37238/a/$1/p/$2/' // Rule (4)
    '/ts.json': 'http://localhost:37238/tsconfig.json'
  },
  default: 'http://localhost:37238' // default target
});

const proxy = httpProxy.createProxy();

// Create http server that leverages reverse proxy instance
// and proxy rules to proxy requests to different targets
http.createServer(function (req: IncomingMessage, res: ServerResponse) {

  // a match method is exposed on the proxy rules instance
  // to test a request to see if it matches against one of the specified rules
  const target = proxyRules.match(req);
  if (target) {
    return proxy.web(req, res, {
      target: target
    });
  }

  res.writeHead(500, {'Content-Type': 'text/plain'});
  res.end('The request url and path did not match any of the listed rules!');
}).listen(6010, () => {
  console.log('listen on 6010');
  console.log('try http://localhost:6010/ts.json');
});
