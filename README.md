# Emscripten Demo

Demo project showing how to setup emscripten to build a module and load it in the browser.

## Installation

Clone the repository and `npm install`.

`npm run build` to build everything to the "build" directory.
`npm start` to run the server.

## To Do

- Use a bundler to emit HTML, JavaScript, CSS etc
- Add typescript and typing for the emscripten module

## Notes

Using the emscripten/emsdk docker image to compile the emscripten module. Use `npm run docker -- [command]` to run command inside the emscripten environment.
