const shell = require("./utils/shell");
const fs = require("fs");
const path = require("path");
const colors = require("colors/safe");
const nuxtPackageJson = require("../nuxt/package.json");

(async () => {
  try {
    // Clean up
    if (fs.existsSync(path.join(__dirname, "../functions/package-temp.json"))) {
      fs.renameSync(
        path.join(__dirname, "../functions/package-temp.json"),
        path.join(__dirname, "../functions/package.json")
      );
    }

    // Generate Nuxt files

    await shell("npm run --prefix nuxt build");
    console.log(colors.green("Nuxt files generated!"));

    // Copy ~/nuxt/nuxt.config.js to ~/functions/ssr/nuxt/nuxt.config.js

    fs.copyFileSync(
      path.join(__dirname, "../nuxt/nuxt.config.js"),
      path.join(__dirname, "../functions/ssr/nuxt/nuxt.config.js")
    );
    console.log(
      colors.green(
        "Copied ~/nuxt/nuxt.config.js to ~/functions/ssr/nuxt/nuxt.config.js"
      )
    );

    // Copy ~/functions/ssr/nuxt/dist/client/ to ~/public/assets/

    // fs.copyFileSync(
    //   path.join(__dirname, "../functions/ssr/nuxt/dist/client/"),
    //   path.join(__dirname, "../public/assets/")
    // );

    // Copy ~/nuxt/static/ to ~/public/
    // TODO

    // Create temporairy package-temp.json to store the original dependencies

    fs.copyFileSync(
      path.join(__dirname, "../functions/package.json"),
      path.join(__dirname, "../functions/package-temp.json")
    );

    // Add nuxt project dependencies to ~/functions/package.json

    let nuxtPackageJson = fs.readFileSync(
      path.join(__dirname, "../nuxt/package.json"),
      {
        encoding: "utf8",
      }
    );

    let functionsPackageJson = fs.readFileSync(
      path.join(__dirname, "../functions/package.json"),
      {
        encoding: "utf8",
      }
    );

    nuxtPackageJson = JSON.parse(nuxtPackageJson);
    functionsPackageJson = JSON.parse(functionsPackageJson);

    functionsPackageJson.dependencies = {
      ...functionsPackageJson.dependencies,
      ...nuxtPackageJson.dependencies,
    };

    delete functionsPackageJson.dependencies["nuxt"];

    fs.writeFileSync(
      path.join(__dirname, "../functions/package.json"),
      JSON.stringify(functionsPackageJson, null, 2)
    );

    // Install dependencies

    await shell("npm install", path.join(__dirname, "../functions"));
    console.log(colors.green("Installed dependencies!"));

    await shell("firebase deploy", path.join(__dirname, ".."));

    // Restore package-temp.json / Clean up dependencies
    fs.renameSync(
      path.join(__dirname, "../functions/package-temp.json"),
      path.join(__dirname, "../functions/package.json")
    );
  } catch (error) {
    console.log(colors.red(error.message));
    // Clean up
    if (fs.existsSync(path.join(__dirname, "../functions/package-temp.json"))) {
      fs.renameSync(
        path.join(__dirname, "../functions/package-temp.json"),
        path.join(__dirname, "../functions/package.json")
      );
    }
  }
})();
