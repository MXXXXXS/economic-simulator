const path = require('path')

const isProduction = typeof NODE_ENV !== 'undefined' && NODE_ENV === 'production'
const mode = isProduction ? 'production' : 'development'

const public = path.resolve(__dirname, 'public')
const dist = path.resolve(__dirname, 'dist')

const entry = path.resolve(__dirname, 'src/index.tsx')

//HTMLWebpackPlugin's options
const HTMLWebpackPlugin = require('html-webpack-plugin')
const indexTemplate = path.resolve(public, 'index.html')
const favicon = path.resolve(public, 'favicon.ico')

//clean-webpack-plugin
// const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
  watch: true,
  mode: mode,
  entry: entry,
  output: {
    filename: 'run.js',
    path: dist,
  },
  devtool: 'source-map',
  devServer: {
    open: true,
    compress: true,
    contentBase: public,
    host: '0.0.0.0',
    port: 8080,
    watchContentBase: true,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [{
          loader: 'babel-loader'
        }],
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.html?$/,
        use: [{
          loader: 'html-loader',
          options: { minimize: isProduction }
        }]
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  plugins: [
    // new CleanWebpackPlugin(),
    new HTMLWebpackPlugin({
      template: indexTemplate,
      favicon: favicon,
      filename: 'index.html'
    })
  ]
}

console.log("Mode: ", mode, "NODE_ENV", process.env.NODE_ENV)