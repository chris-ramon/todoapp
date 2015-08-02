module.exports = {
  entry: "./index.js",
  output: "./bundle.js",
  module: {
    loaders: [{
      loaders: ["babel"]
    }]
  }
};
