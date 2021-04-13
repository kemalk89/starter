const {
    createProxyMiddleware
} = require('http-proxy-middleware');

const target = process.env.CRA_PROXY_TARGET || 'http://localhost:8080';

module.exports = function (app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target,
            changeOrigin: true,
        })
    );
};