// import some dependencies
const fs = require("fs");
const spawn = require("child_process").spawn;

// get the running mode
const mode = process.argv[2] || "start";

// perform the compilation
if (mode === "start" || mode === "dev") {

  // prepare the sass arguments
  const sassArgs = ["public/assets/scss:public/assets/css", "--load-path=node_modules/"];

  // for the dev mode, keep sass watching for changes
  if (mode === "dev") sassArgs.push("--watch");

  // launch sass (wont block the script execution)
  const sassCMD = spawn("sass", sassArgs, {shell: true});
  sassCMD.stdout.on("data", (data) => console.log(data.toString()));
  sassCMD.stderr.on("data", (data) => console.error(data.toString()));
}

// perform some cleanup
if (mode === "clean") {
    
  // remove the css files
  try {
    fs.rmSync("public/assets/css", { recursive: true });
  } catch (err) {
    console.log(err);
  }

  console.log("Cleanup done");
}
