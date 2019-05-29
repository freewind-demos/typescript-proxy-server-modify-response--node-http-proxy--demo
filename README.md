TypeScript Https Proxy Server with Node "http-proxy" Demo
==========================================================

TODO:

使用http-proxy创建一个https的proxy server，目前还没搞定

如何创建ssl所需要的密钥文件：

```
openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem -nodes -subj '/CN=localhost' -days 365
```

```
npm install
npm run demo
```
