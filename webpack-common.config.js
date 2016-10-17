var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpack = require("webpack");

module.exports = {
  loaders: [
    // image loader - https://www.npmjs.com/package/image-webpack-loader
    {
      test: /\.(jpe?g|png|gif|svg|ico)$/i,
      loaders: [
        'file?hash=sha512&digest=hex&name=[hash].[ext]',
        'image?bypassOnDebug&optimizationLevel=7&interlaced=false'
      ]
    },
    // javascript/jsx loader - https://www.npmjs.com/package/babel-loader
    {
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loaders: ['babel-loader?stage=0&optional=runtime'],
    },
    // styles
    {
      test: /\.scss$/,
      loader: "style!css!autoprefixer-loader?browsers=last 2 version!sass"
    },
    { test: /\.css$/, loader: 'style-loader!css-loader' },

    // and font files - embed them if possible
    { test: /\.(woff|woff2)$/, loader:"url?prefix=font/&limit=5000" },
    { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/octet-stream" },
    { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=image/svg+xml" },
    { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file" },

    /*
        {
          test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&minetype=application/font-woff"
        }, {
          test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&minetype=application/font-woff2"
        }, {
          test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&minetype=application/octet-stream"
        }, {
          test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file"
        }*/
  ],
  // https://www.npmjs.com/package/html-webpack-plugin - generate our html file from a template - makes it easier to include custom stuff
  indexPagePlugin: new HtmlWebpackPlugin({
    inject: true,
    title: 'webpack starter template',
    filename: 'index.html',
    template: './app/index_template.html'
  }),
  jQueryPlugin:  new webpack.ProvidePlugin({
    $: "jquery",
    jQuery: "jquery"
  })

}
