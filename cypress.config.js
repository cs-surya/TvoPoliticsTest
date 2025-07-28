const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://www.tvo.org",

    retries: 1,

    viewportWidth: 1280,
    viewportHeight: 800,

    setupNodeEvents(on, config) {},
  },
});
