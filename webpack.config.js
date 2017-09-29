
const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');

const ExtractTextPlugin = require('extract-text-webpack-plugin');

const path = require('path');


module.exports = {
  devtool: 'eval-source-map',
  entry:  __dirname + "/src/main.js",//已多次提及的唯一入口文件
  output: {
    path: __dirname + "/dist",//打包后的文件存放的地方
    filename: "js/bundle[hash].js"//打包后输出文件的文件名
  },
  devServer: {
    contentBase: "./dist",//本地服务器所加载的页面所在的目录
    historyApiFallback: false,//不跳转
    host:'localhost',
    inline: true,//实时刷新
    port: 9000,//实时刷新
//  hot:true
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
                    }]
                })
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: ['css-loader', 'sass-loader'],
										/*use: [{
                        loader: "css-loader",
                        options: {
                            minimize: true
                        }
                    }, {
                        loader: "postcss-loader"//自动加前缀
                    }]*/
                })
          },
          {
		        test: /\.(png|jpg|gif|svg)$/,
		       // use: 'url-loader?limit=1024',//&name=[name].[ext]&outputPath=img/最后打包加上路径 //[path]代表和src下文件同级，最好不用；[name].[ext]代表和原图片后缀名一样
		        use: 'url-loader?limit=1024&name=[name].[ext]&outputPath=img/&publicPath=./',
		      },
		      {
		        test: /\.html$/,
		        loader: "html-loader",
		        query: {
		            minimize: true//html压缩
		        }
		      },
        
        ]
        
    },
    plugins: [
        new webpack.BannerPlugin('版权所有，翻版必究'),
        new HtmlWebpackPlugin({
            // template: __dirname + "/src/index.tmpl.html"//new 一个这个插件的实例，并传入相关的参数
            filename: 'index.html',
     	    template: __dirname + "/src/index.tmpl.html"
        }),
        new webpack.optimize.UglifyJsPlugin(),
        new ExtractTextPlugin({
           filename:'style.min[hash].css',
           allChunks:true
        }),
//      new webpack.HotModuleReplacementPlugin()//热加载插件
    ]    

}

