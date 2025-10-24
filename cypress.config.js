module.exports = {
  viewportWidth: 1280,
  viewportHeight: 720,
  reporter: "mochawesome",
  reporterOptions: {
    reportDir: "cypress/reports",
    overwrite: false,
    html: false,
    json: true,
  },
  
  e2e: {
     baseUrl: "https://playground.bondaracademy.com/",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
};
