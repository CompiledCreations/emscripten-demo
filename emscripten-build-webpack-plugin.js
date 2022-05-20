/**
 * Plugin that integrates our emscripten build with the webpack build process.
 *
 * Expects the following npm scripts to be defined:
 * - emscripten:generate, to generate the emscripten build with cmake
 * - emscripten:build, to run the emscripten build
 */
const shell = require("shelljs");

class EmscriptenBuildWebpackPlugin {
  apply(compiler) {
    compiler.hooks.afterEmit.tapPromise("EmscriptenBuildWebpackPlugin", async () => {
      // TODO: Generate before the run starts so its only done once.
      await generate();
      await build();
    });
  }
}

function generate() {
  return new Promise((resolve, reject) => {
    shell.exec("npm run emscripten:generate", (code, stdout, stderr) => {
      if (code === 0) {
        resolve({ stdout, stderr });
      }

      reject(new Error(`Generate failed with code ${code}`));
    });
  });
}

function build() {
  return new Promise((resolve, reject) => {
    shell.exec("npm run emscripten:build", (code, stdout, stderr) => {
      if (code === 0) {
        resolve({ stdout, stderr });
      }

      reject(new Error(`Build failed with code ${code}`));
    });
  });
}

module.exports = EmscriptenBuildWebpackPlugin;
