/**
 * Plugin that integrates our emscripten build with the webpack build process.
 *
 * Expects the following npm scripts to be defined:
 * - emscripten:generate, to generate the emscripten build with cmake
 * - emscripten:build, to run the emscripten build
 */
const fg = require("fast-glob");
const path = require("path");
const shell = require("shelljs");
const { Compilation } = require("webpack");

const pluginName = "EmscriptenBuildWebpackPlugin";

class EmscriptenBuildWebpackPlugin {
  apply(compiler) {
    // Make sure the project is generated before building
    compiler.hooks.initialize.tap(pluginName, () => {
      generate();
    });

    compiler.hooks.thisCompilation.tap(pluginName, async (compilation) => {
      // Setup watching and build on change
      compilation.hooks.processAssets.tapPromise(
        { name: pluginName, stage: Compilation.PROCESS_ASSETS_STAGE_ADDITIONAL },
        async () => {
          // Just watch all C++ source files, at the minute, we won't see new files, just pick up changes
          // to existing ones.
          const sourceFiles = await fg([
            "src/**/*.c",
            "src/**/*.cpp",
            "src/**/*.h",
            "src/**/*.hpp"
          ]);

          sourceFiles.forEach((sourceFile) => {
            compilation.fileDependencies.add(path.resolve(sourceFile));
          });

          await build();
        }
      );
    });
  }
}

function generate() {
  const { code } = shell.exec("npm run emscripten:generate");
  if (code !== 0) {
    throw new Error("Failed to generate emscripten build");
  }
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
