const HTMLWebpackPlugin = require('html-webpack-plugin');

const devPlugins = [
  new HTMLWebpackPlugin({
    template: 'src/index.html'
  })
]

const plugins = [
  ...devPlugins
];

module.exports = {
  entry: "./src/main.ts",
  mode: 'development',
  optimization: {
    minimize: true
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  plugins: plugins,
  resolve: {
    extensions: [".ts", ".tsx", ".js"]
  }
};