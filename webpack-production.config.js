const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const path = require('path');

module.exports = {
  entry: {
    app:'./src/components/app.js',
  },

  output: {
    path: path.resolve(__dirname,'dist'),
    filename: '[name].js',
    publicPath:'./'
  },

  devtool:'cheap-source-map',

  module: {
    rules: [
      {
        test:/\.scss$/,
        exclude:/node_modules/,
        use: ExtractTextPlugin.extract({
          fallback:'style-loader',
          use:['css-loader','postcss-loader','sass-loader'],
          publicPath:'./'
        })
      },
      {
        test:/\.js$/,
        exclude:/node_modules/,
        use:['babel-loader']
      },
      {
        test:/\.(jpe?g|png|svg|gif)$/i,
        exclude:/node_modules/,
        use:[
          // 'file-loader?name=[name].[ext]&outputPath=images/&publicPath=images/',
          // 'file-loader?name=[name].[ext]&outputPath=images/&publicPath=../',
          // 'file-loader?name=images/[name].[ext]&publicPath=/',
          'file-loader?name=images/[name].[ext]&publicPath=./',
          'image-webpack-loader'
        ]
      },
      {
        test: /\.(ttf|woff|eot)$/,
        // use: 'file-loader?name=fonts/[name].[ext]&publicPath=../'
        // use: 'file-loader?name=fonts/[name].[ext]&publicPath=../'
        // use: 'file-loader?name=fonts/[name].[ext]&publicPath=/'
        use: 'file-loader?name=fonts/[name].[ext]&publicPath=./'
      },
      {
        test: /\.(mp3|mp4)$/,
        // use: 'file-loader?name=audio/[name].[ext]&publicPath=/'
        use: 'file-loader?name=audio/[name].[ext]&publicPath=./'
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      title:'Music visualizer',
      minify: {
        collapseWhitespace:true
      },
      hash: true,
      template: './src/index.ejs',
      favicon: './src/favicon.png'
    }),
    new ExtractTextPlugin({
      filename:'style.css',
      disable:false,
      allChunks:true
    }),
    new webpack.LoaderOptionsPlugin({
      options:{
        postcss:[
          autoprefixer()
        ]
      }
    })
  ]
};
