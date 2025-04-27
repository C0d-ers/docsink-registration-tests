// In your `step_definitions/hooks.js` or `world.js`

const { setDefaultTimeout } = require('@cucumber/cucumber');

// Set global timeout to 20 seconds (20000 milliseconds)
setDefaultTimeout(20000);
