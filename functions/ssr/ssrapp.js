const { Nuxt } = require("nuxt-start");
const nuxtConfig = require("./nuxt/nuxt.config.js");

const config = {
  ...nuxtConfig,
  dev: false,
  debug: false,
  buildDir: "nuxt",
};

const nuxt = new Nuxt(config);

module.exports = async (req, res) => {
  await nuxt.ready();
  nuxt.render(req, res);
};
