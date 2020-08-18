const cp = require("child_process");
const colors = require("colors/safe");

const shell = (input, workDir) => {
  return new Promise((resolve, reject) => {
    const inputSubstrings = input.split(" ");
    const command = inputSubstrings[0];
    inputSubstrings.shift();
    const args = inputSubstrings;

    const cwd = workDir || "";

    const proc = cp.spawn(command, args, {
      shell: process.platform == "win32",
      cwd,
    });

    const prefixShellOutput = () => {
      console.log(
        colors.yellow(`Shell: ${command} ${args ? args.join(" ") : ""}`)
      );
      console.log(cwd);
    };

    proc.stdout.on("data", (message) => {
      // prefixShellOutput();
      console.log(colors.grey(message.toString()));
    });
    proc.stderr.on("data", (message) => {
      // prefixShellOutput();
      console.log(colors.red(message.toString()));
    });
    proc.on("close", (code) => {
      let color;
      if (code != 0) {
        color = "red";
        reject(new Error(`Console exited with code ${code}!`));
      } else {
        color = "green";
        resolve();
      }
    });
    proc.on("error", (error) => {
      reject(new Error(`Error in console: ${error.code}`));
    });
  });
};

module.exports = shell;
