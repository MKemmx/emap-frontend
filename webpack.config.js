const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['my-custom-babel-preset'],
            ignore: ['./node_modules/mapbox-gl/dist/mapbox-gl.js'],
          },
        },
      },
    ],
  },
};
