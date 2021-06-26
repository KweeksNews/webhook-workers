const path = require('path');

module.exports = {
  entry: path.resolve(__dirname, 'src/workers/index.js'),
  output: {
    path: path.resolve(__dirname, 'workers'),
    filename: 'index.js',
    clean: true,
  },
  mode: 'production',
};
