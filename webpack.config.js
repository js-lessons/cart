module.exports = {
  entry: __dirname + "/src/javascripts/main",
  devtool: 'source-map',
  output: {
    path: __dirname + "/public",
    filename: "main.js",
    publicPath: "./public/",
  },
  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader'},
      { test: /\.less$/, loader: "style!css!less" },
      { test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/font-woff" },
      { test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/font-woff2" },
      { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/octet-stream" },
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file" },
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=image/svg+xml" },
      { test: /\.gif/, loader: "url?limit=10000&mimetype=image/gif" },
      { test: /\.jpg/, loader: "url?limit=10000&mimetype=image/jpg" },
      { test: /\.png/, loader: "url?limit=10000&mimetype=image/png" }
    ]
  }
}
