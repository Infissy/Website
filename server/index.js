
var WebSocket = require('ws');
const { env } = require('process');
const dotenv = require('dotenv').config()

var app = require("./src/config/express.config");


var server = require('http').createServer(app);


const match = require("./game/queue").InitializeConnection(new WebSocket.Server({

  server: server
}));










server.on("error", function error(error){
  console.log(`Server error: ${error.message }`);
});

server.listen(process.env.PORT, function() {
  console.log(`http/ws server listening on ${process.env.PORT}`);

});

if(process.env.NODE_ENV === "test"){

  let Mocha = require('mocha'),
  fs = require('fs'),
  path = require('path');

// Instantiate a Mocha instance.
  let mocha = new Mocha({


});

  let testDir = path.join(__dirname,"../test");

  // Add each .js file to the mocha instance
  fs.readdirSync(testDir).filter(function(file) {
    // Only keep the .js files
    return file.substr(-3) === '.js';

  }).forEach(function(file) {
    mocha.addFile(
        path.join(testDir, file)
    );
  });

// Run the tests.
mocha.run(function(failures) {
process.exitCode = failures ? 1 : 0;  // exit with non-zero status if there were failures
});


}
