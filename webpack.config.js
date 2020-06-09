const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: "./src/index.tsx",
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'public', "js"),
    },
    resolve: {
        extensions: [ '.tsx', '.ts', '.js' ],
    },
    devtool: 'source-map',
    plugins: [
        new MiniCssExtractPlugin({
          // Options similar to the same options in webpackOptions.output
          // all options are optional
          // path: path.join(__dirname, '..', 'qr-code-server', 'public', 'css'),
          filename: path.join('..', 'css') + '/styles.css'
        }),
    ],
    devServer: {
      contentBase: path.join(__dirname, 'public'),
      compress: true,
      port: 8080,
      hot: true
    },
    module: {
        rules: [
            {
                test: /\.(ts|js)x?$/,
                exclude: /node_modules/,
                use: {
                  loader: 'babel-loader'
                },
            },
            {
                test: /\.(scss|css)$/,
                use: [
                  {
                    loader: MiniCssExtractPlugin.loader
                  }, 
                  'css-loader', 
                  'sass-loader']
              }
        ],
    }
};

