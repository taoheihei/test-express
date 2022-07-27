
const app = require('./application')
function createApplication(){
  return new app();
  // return app;
}
module.exports = createApplication;