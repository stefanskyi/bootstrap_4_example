const path=require('path')
const webpack=require('webpack')


const MiniCssExtractPlugin=require('mini-css-extract-plugin')
const CopyWebpackPlugin=require('copy-webpack-plugin')
const HtmlWebpackPlugin=require('html-webpack-plugin')

const PATHS={
    src: path.join(__dirname, '../src'),
    dist: path.join(__dirname, '../dist'),
    assets: 'assets/'
}

module.exports={
    externals:{
        paths:PATHS
    },
    entry:{
        app:PATHS.src,
    },
    output:{
        filename:`${PATHS.assets}js/[name].js`,
        path:PATHS.dist,
        publicPath:''
    },
    module:{
        rules:[{
            test:/\.js$/,
            loader:'babel-loader',
            exclude:'/node_modules'
        },{
            test:/\.(gif|png|jpe?g|svg)$/i,
            use:[
                {
                    loader:'file-loader',
                    options:{
                        name:'[name].[ext]',
                        outputPath: './assets/img',
                        // outputPath: './assets/img' это удалить если не заведется
                    }
                },{
                    loader: 'image-webpack-loader',
                    options: {
                        mozjpeg: {
                            progressive: true,
                            quality: 65
                        },
          // optipng.enabled: false will disable optipng
                        optipng: {
                            enabled: false,
                        },
                        pngquant: {
                            quality: '65-90',
                            speed: 4
                        },
                        gifsicle: {
                            interlaced: false,
                        },
          // the webp option will enable WEBP
                        webp: {
                            quality: 75
                        }
                    }
                }
            ]
        },{
            test:/\.scss$/,
            use:[
                'style-loader',
                MiniCssExtractPlugin.loader,
                {
                    loader:'css-loader',
                    options:{sourceMap:true}
                },{
                    loader:'postcss-loader',
                    options:{sourceMap:true, config:{ path:`${PATHS.src}/js/postcss.config.js`}}
                },{
                    loader:'sass-loader',
                    options:{sourceMap:true}
                }
            ]
        },{
            test:/\.css$/,
            use:[
                'style-loader',
                MiniCssExtractPlugin.loader,
                {
                    loader:'css-loader',
                    options:{sourceMap:true}
                },{
                    loader:'postcss-loader',
                    options:{sourceMap:true, config:{ path:`${PATHS.src}/postcss.config.js`}}
                },
            ]
        }]
    },
    plugins: [
        new webpack.ProvidePlugin({
            $:'jquery',
            jQuery:'jquery',
            jquery:'jquery',
            Popper: ['popper.js', 'default']
        }),
        new MiniCssExtractPlugin({
          filename:`${PATHS.assets}css/[name].css`,
        }),
        new HtmlWebpackPlugin({
            hash:false,
            template:`${PATHS.src}/index.html`,
            filename:'./index.html'
        }),
        new CopyWebpackPlugin([
            {from:`${PATHS.src}/assets/img`,to:`${PATHS.assets}img`},
            {from:`${PATHS.src}/static`,to:''},
        ]),
      ],
}