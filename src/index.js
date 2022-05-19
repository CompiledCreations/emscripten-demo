import EmscriptenDemo from "EmscriptenDemo";

const root = document.getElementById("root");

(async function () {
  const demo = await EmscriptenDemo();
  demo.hello();

  root.innerHTML = `<h1>${demo.getGreeting()}</h1>`;
})();
