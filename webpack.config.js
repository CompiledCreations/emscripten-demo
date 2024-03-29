const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

const EmscriptenBuildWebpackPlugin = require("./emscripten-build-webpack-plugin");

module.exports = {
  devServer: {
    port: 3000,
    static: "./build"
  },
  entry: "./src/index.js",
  experiments: {
    outputModule: true
  },
  externals: {
    // Make our emscripten module extenal, it's compiled to ES6 so our externalsType and scriptLoading settings
    // need to be set to module for this to work. Also devServer serves the build folder where the compiled
    // Wasm module is located.
    EmscriptenDemo: "./EmscriptenDemo.js"
  },
  externalsType: "module",
  output: {
    clean: true,
    filename: "index.js",
    path: path.resolve(__dirname, "build")
  },
  plugins: [
    new HtmlWebpackPlugin({
      scriptLoading: "module",
      template: "./src/index.ejs"
    }),
    new EmscriptenBuildWebpackPlugin()
  ]
};
