//npm instal postcss-loader autoprefixer css-mqpacker css-nano --save-dev

module.exports = {
    plugins: [
      require('autoprefixer'),
      require('css-mqpacker'),
      require('cssnano')({
          preset:[
              'default',{
                  discardComments:{
                      removeAll:true,
                  }
              }
          ]
      })
    ]
  }