module.exports = {
  context: __dirname + "/src",
  entry: "./javascripts/application",
  output: {
      path: __dirname + "/public",
      filename: "application.js",
      publicPath: "/public/"
  },
  module: {
    loaders: [
      { test: /\.less$/, loader: "style-loader!css-loader!less-loader" },
      { test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,   loader: "url?limit=10000&mimetype=application/font-woff" },
      { test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,   loader: "url?limit=10000&mimetype=application/font-woff2" },
      { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,    loader: "url?limit=10000&mimetype=application/octet-stream" },
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,    loader: "file" },
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,    loader: "url?limit=10000&mimetype=image/svg+xml" },
      { test: /\.gif/, loader: "url?limit=10000&mimetype=image/gif" },
      { test: /\.jpg/, loader: "url?limit=10000&mimetype=image/jpg" },
      { test: /\.png/, loader: "url?limit=10000&mimetype=image/png" },
    ]
  }
}
