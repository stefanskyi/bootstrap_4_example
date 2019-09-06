const webpack=require('webpack')
const merge=require('webpack-merge')
const baseWebpackConfig=require('./webpack.base.conf')
const  { CleanWebpackPlugin }  = require('clean-webpack-plugin');

const buildWebpackConfig=merge(baseWebpackConfig, {
    mode:'production',
    plugins:[
        new CleanWebpackPlugin(),
    ]
})

module.exports=new Promise((resolve, reject)=>{
    resolve(buildWebpackConfig)
})