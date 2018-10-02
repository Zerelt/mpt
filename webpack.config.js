const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const path = require('path');

module.exports = {
  entry: {
    app:'./src/components/app.js'
  },
  output: {
    path: path.resolve(__dirname,'dist'),
    publicPath:'/',
    filename: '[name].bundle.js',
  },

  devtool:'inline-source-map',

  module: {
    rules: [
      {
        test:/\.scss$/,
        exclude:/node_modules/,
        use: ['style-loader','css-loader','postcss-loader','sass-loader']
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
          'file-loader?name=[name].[ext]',
          'image-webpack-loader'
        ]
      },
      {
        test: /\.(ttf|woff|eot)$/,
        use: 'file-loader?name=fonts/[name].[ext]'
      },
      {
        test: /\.(mp3|mp4)$/,
        use: 'file-loader?name=audio/[name].[ext]'
      }
    ]
  },

  devServer:{
    contentBase:path.join(__dirname,'dist'),
    publicPath:'/',
    compress:true,
    inline:true,
    hot: true
  },

  plugins: [
    new HtmlWebpackPlugin({
      title:'Music visulizer',
      minify: {
        collapseWhitespace:true
      },
      hash: true,
      template: './src/index.ejs',
      favicon: './src/favicon.png'
    }),
    new ExtractTextPlugin({
      filename:'app.css',
      disable:true,
      allChunks:true
    }),
    new webpack.LoaderOptionsPlugin({
      options:{
        postcss:[
          autoprefixer()
        ]
      }
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
  ]
};
