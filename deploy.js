// Since postinstall will also run when you run npm install
// locally we make sure it only runs in production
console.log('In deploy.js');
if (process.env.NODE_ENV === 'production') {
  // We basically just create a child process that will run
  // the production bundle command
  console.log('in the if statement in deploy.js');

  var child_process = require('child_process');
  child_process.exec("webpack -p --config webpack.production.config.js", function (error, stdout, stderr) {
    console.log('stdout: ' + stdout);
    console.log('stderr: ' + stderr);
    if (error !== null) {
      console.log('exec error: ' + error);
    }
  });
}
