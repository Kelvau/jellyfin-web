const { merge } = require('webpack-merge');

const common = require('./webpack.common');

const JELLYFIN_SERVER = process.env.JELLYFIN_SERVER || 'http://tv.steinov.co:8096';
const JELLYFIN_PROXY_PATH = '/jellyfin-proxy';

module.exports = merge(common, {
    // In order for live reload to work we must use "web" as the target not "browserslist"
    target: process.env.WEBPACK_SERVE ? 'web' : 'browserslist',
    mode: 'development',
    devtool: 'eval-cheap-module-source-map',
    module: {
        rules: [
            {
                test: /\.(js|jsx|ts|tsx)$/,
                exclude: /node_modules/,
                enforce: 'pre',
                use: ['source-map-loader']
            }
        ]
    },
    devServer: {
        compress: true,
        proxy: [
            {
                context: [JELLYFIN_PROXY_PATH],
                target: JELLYFIN_SERVER,
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    [`^${JELLYFIN_PROXY_PATH}`]: ''
                },
                secure: false
            }
        ],
        client: {
            overlay: {
                errors: true,
                warnings: false
            }
        }
    }
});
