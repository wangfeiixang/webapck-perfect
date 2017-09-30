
const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');

const ExtractTextPlugin = require('extract-text-webpack-plugin');


module.exports = {
  devtool: 'eval-source-map',
  entry:  __dirname + "/app/main.js",//已多次提及的唯一入口文件
  output: {
    path: __dirname + "/build",//打包后的文件存放的地方
    filename: "js/bundle[hash].js"//打包后输出文件的文件名
  },
  devServer: {
    contentBase: "./build",//本地服务器所加载的页面所在的目录
    historyApiFallback: false,//不跳转
    host:'localhost',
    inline: true,//实时刷新
    port: 9000,//实时刷新
    // hot:true
  },
  module: {
        rules: [
            {
                test: /(\.jsx|\.js)$/,
                use: {
                    loader: "babel-loader",
                },
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [{
                        loader: "css-loader",
                        options: {
                            minimize: true
                        }
                    }, {
                        loader: "postcss-loader"//自动加前缀
                    }],
                })
            }
        
        ]
        
    },
    plugins: [
        new webpack.BannerPlugin('版权所有，翻版必究'),
        new HtmlWebpackPlugin({
            // template: __dirname + "/app/index.tmpl.html"//new 一个这个插件的实例，并传入相关的参数
            filename: 'index.html',
     	    template: __dirname + "/app/index.tmpl.html"
        }),
        new webpack.optimize.UglifyJsPlugin(),
        new ExtractTextPlugin({
           filename:'css/app.min[hash].css',
           allChunks:true
        })
        // new webpack.HotModuleReplacementPlugin()//热加载插件
    ]    

}

