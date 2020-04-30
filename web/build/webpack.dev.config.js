const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {

    /*入口文件*/
    entry: path.join(__dirname, '../src/index.js'),
    mode: 'development',//用来指定开发环境
    /*src目录下面的以.js结尾的文件，要使用babel解析*/
    /*cacheDirectory是用来缓存编译结果，下次编译加速*/
    module: {
        rules: [{
            test: /\.jsx?$/,
            use: 'babel-loader',
            include: path.join(__dirname, '../src')
        },{
            test: /\.js$/,
            use: ['babel-loader?cacheDirectory=true'],
            include: path.join(__dirname, '../src')
        },{
            test: /\.css$/,
            use: ['style-loader', 'css-loader', "postcss-loader"]
            //============================================= ↑ 这个自己会加css浏览器前缀
            //{
            //      loader:'css-loader',
            //      options: {
            //          modules: true,
            //          localIdentName: '[local]--[hash:base64:5]'
            //      }
            //  }
         }]
    },
    // webpack-dev-server
    devServer: {
        //需要写死引入的JS，比较麻烦,所以使用html-webpack-plugin来优化
        // contentBase: path.join(__dirname, '../dist'),
        compress: true,  // gzip压缩
        host: '0.0.0.0', // 允许ip访问
        hot: true, // 热更新
        historyApiFallback: true, // 解决启动后刷新404
        proxy: { // 配置服务代理
            '/api': {
                target: 'http://localhost:8000',
                pathRewrite: { '^/api': '' },  //可转换
                changeOrigin: true
                //如果后端服务托管在虚拟主机的时候，也就是一个IP对应多个域名，需要通过域名区分服务，那么参数changeOrigin必须为true(默认为false)，这样才会传递给后端正确的Host头，虚拟主机才能正确回应。否则http-proxy-middleware会原封不动将本地HTTP请求发往后端，包括Host: localhost而不是Host: httpbin.org，只有正确的Host才能使用虚拟主机，不然会返回404 Not Found。
            }
        },
        port: 8000 // 端口
    },
    /*添加下述属性，然后就可以在srouce里面能看到写的代码，也能打断点调试*/
    devtool: 'source-map',
    /**alias 别名配置 要注意避免起成别的包名 像redux 或者react之类的 */
    resolve: {
        alias: {
            sections: path.join(__dirname, '../src/sections'),
            components: path.join(__dirname, '../src/components'),
            router: path.join(__dirname, '../src/router'),
            actions: path.join(__dirname, '../src/redux/actions'),
            reducers: path.join(__dirname, '../src/redux/reducers')
        }
    },
    /*输出到dist目录，输出文件名字为bundle.js*/
    output: {
        path: path.join(__dirname, '../dist'),
        filename: 'bundle.js'
    },
    
    plugins: [
        /*插件 用来优化contentBase */
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.join(__dirname, '../public/index.html')
        })
    ]
    
};
