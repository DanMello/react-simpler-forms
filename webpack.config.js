const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const path = require('path');

module.exports = (env) => {

  return {
    entry: [
      './src/index'
    ],
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
      libraryTarget: 'commonjs2',
      publicPath: '/dist/'
    },
    optimization: {
      minimizer: [
        new UglifyJsPlugin({
          uglifyOptions: {
            mangle: true,
          },
          cache: true,
          parallel: true,
          sourceMap: true
        })
      ]
    },
    module: {
      rules: [
        {
          test: /\.(js)$/,
          exclude: /(node_modules)/,
          loader: 'babel-loader'
        }
      ]
    },
    externals: {
      react: {          
          commonjs: "react",
          commonjs2: "react",
          amd: "React",
          root: "React"
      },
      "react-dom": {
          commonjs: "react-dom",
          commonjs2: "react-dom",
          amd: "ReactDOM",
          root: "ReactDOM"
      }
    }  
  }
}