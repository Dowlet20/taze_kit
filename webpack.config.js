const path = require('path');

module.exports = {
  ignoreWarnings: [
    {
      message: /Critical dependency: the request of a dependency is an expression/,
    },
  ],
  entry: './app/layout.jsx',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: {
    extensions: ['.js', '.jsx'], 
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
            loader: 'babel-loader',
        },
    },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      
    {
        test: /\.(ttf|eot|woff|woff2|svg)$/,
        use: {
            loader: 'file-loader',
            options: {
                name: '[name].[hash].[ext]',
                outputPath: 'fonts/', 
            },
        },
    },
    {
      test: /\.tsx?$/, 
      use: 'ts-loader',
      exclude: /node_modules/,
      use: {
        loader: 'ts-loader',
        options: {
          transpileOnly: true, // Skip type checking
        },
      },
    },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ['file-loader'],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: ['file-loader'],
      }
    ],
  },
  devtool: 'source-map',
  devServer: {
    contentBase: './dist',
  },
  mode: 'development',
};