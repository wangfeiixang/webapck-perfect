var webpack = require('webpack');
var	HtmlWebpackPlugin = require('html-webpack-plugin')
var path = require('path')

module.exports = {
    entry : [
        './src/index'
    ],
    output :{
        filename:'bundle.js',
        path:'./dist',
        publicPath: '/'
    },
    resolve : {
        extensions:['','.js','.jsx','.css'],
    },
    module:{
        loaders:[
            {
                test: /\.jsx?$/,
                exclude:/node_modules/,
                loader:['babel-loader'],
                query: {
                    plugins: [
                        ["transform-runtime", {
                            "helpers": false,
                            "polyfill": true,
                            "regenerator": true
                        }],
                        'add-module-exports',
                        'transform-es3-member-expression-literals',
                        'transform-es3-property-literals',
                    ],
                    presets: [
                        'react',
                        'es2015',
                        'stage-0'
                    ]
                }
            },
            { test: /\.css$/, loader: 'style!css' },
            { test: /\.(jpe|jpg|png)$/, loader: 'url?limit=100000' },
            { test: /\.(woff|woff2|eot|ttf|svg)(\?.*$|$)/, loaders: ["file"] }
        ],
        postLoaders: [
            {
                test: /\.jsx?$/,
                loaders: ['es3ify-loader'],
            }
        ]
    },
    plugins : [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development') // default value if not specified
            }
        }),
        new HtmlWebpackPlugin({
            favicon:'./src/www/images/icon.png',
            filename:'index.html',              //生成的html存放路径，相对于 path
            template:'./src/www/index.html',
            inject:true,                        //允许插件修改哪些内容，包括head与body
            hash:true,                          //为静态资源生成hash值
            minify:{                            //压缩HTML文件
                removeComments:true,            //移除HTML中的注释
                collapseWhitespace:false        //删除空白符与换行符
            }
        })
    ]
}

