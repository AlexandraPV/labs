var net = require('net');
var readl = require('readline');

var stdin = process.openStdin();

var rl = readl.createInterface({
  input: process.stdin,
  output: process.stdout
});

var connectionOptions;
var client;

rl.question('Enter ADDRESS and PORT :', (port) => {
  var addPort = port.toString().split(':');
  console.log('You would like to connect with host:' + addPort[0] + ":" + addPort[1]);
  console.log("You can start work. Enter the command. Enter 'help' for help if you need");
   connectionOptions={
    host: addPort[0],
    port: addPort[1]
  }

   client = net.connect(connectionOptions, () => {
    // 'connect' listener
    console.log('connected to server!');
    client.write('Hello world!\r\n');  // send data to server

    client.on('data',(data) => {
      console.log("Server: " + data.toString());
      //console.log(data.toString());

    });

    client.on('end', () => {
      console.log('disconnected from server');
      //stdin.removeListener('data', stdinDataListener);  // unsubscribe
      stdin.destroy();  // close stdin
      //client.off();
    });

    rl.on('line',(data)=>{
          var str= data.toString().trim();
            client.write(str);  // send data to server
    });
    //stdin.addListener('data', stdinDataListener);
  });
});

/*var stdinDataListener = function() {
}*/
