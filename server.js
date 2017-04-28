const path = require('path');
const express = require('express');
const webpackGlobal = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const proxyMiddleware = require('http-proxy-middleware');
const fromJSON = require('./configures/functions/fromJSON');
const webpackConfig = require('./configures/webpack.dev');

const serverConfig = fromJSON(path.resolve('./.serverrc'));
const webpackDevMiddlewareConfig = {
    noInfo: false,
    quiet: false,
    reporter: null,
    hot: true,
    historyApiFallback: true,
    publicPath: webpackConfig.output.publicPath,
    stats: {
        chunks: false,
        colors: true
    },
    watchOptions: {
        aggregateTimeout: 300,
        poll: true
    }
};

const app = express();
const compiler = webpackGlobal(webpackConfig);
const listenAddress = 'http://' + serverConfig.hostname + (serverConfig.port ? ':' + serverConfig.port : '');
const has = Object.prototype.hasOwnProperty;

// set server proxies
for (const prxy in serverConfig.proxy) {
    if (has.call(serverConfig.proxy, prxy)) {
        const target = serverConfig.proxy[prxy];
        app.use(proxyMiddleware(target.ctx, target.opt));
    }
}

app.use(webpackDevMiddleware(compiler, webpackDevMiddlewareConfig));
app.use(webpackHotMiddleware(compiler));

app.get('*', function(req, res){
    res.sendFile(path.resolve(serverConfig.defaultEntry));
});

app.listen(serverConfig.port, serverConfig.hostname, function(err){
    if (err) {
        console.log(err);
        return;
    }

    console.log('Listening at ' + listenAddress);
});
