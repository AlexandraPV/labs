var net = require('net');
var rl = require('readline');
var fs = require('fs');

var clientMas = [];
var server = net.createServer(function(connection) {
   console.log('client %s:%s connected', connection.remoteAddress, connection.remotePort);
   clientMas.push(connection.remoteAddress);
   connection.on("data", data => {
          // receive message from client
          var command = data.toString().trim();
          console.log("Client: " + command);
          //console.log(String(data));
          switch(command) {
            case 'end': {
              connection.end("Good bye!");
              console.log("Send: Good bye!");
              break;
            }
            case 'doc': {
              fs.readFile('brands.json', function(err, data) {
                if (err) {
                  throw err;
                }
                connection.write(data);
                console.log("Send: " + data);
              });
              break;
            };
            case 'help': {
                connection.write("\n end - exit \n doc - all list from documents \n quantity - quantity of elements \n info - information about clients \n sort,field,(=,>,<),characteristic - sorting or find ");
                break;
            };
            case 'quantity': {
              fs.readFile('brands.json', function(err, data) {
                if (err) {
                  throw err;
                }
                if (data !== null) {
                  var mas = JSON.parse(data);
                  connection.write((mas.length).toString());
                  console.log("Send: " + (mas.length).toString());
                 }
               });
              break;
             }

            case 'info': {
              var str = clientMas.join();
              connection.write(str + "\n");
              console.log("Send: " + str);
              break;
            }
            case 'Hello world!': {
              break;
            }
           default:{
             var field = [];
             field = data.toString().trim();
             var comMas = [];
             comMas = field.split(",");

             if (comMas[0]=="sort"){
               fs.readFile('brands.json', function(err, data) {
                 if (err) {
                   throw err;
                 }
                 if (comMas[1]=="name" || comMas[1]=="founder" || comMas[1]=="date" || comMas[1]=="staf" || comMas[1]=="cost"  ){
                 var masBr = JSON.parse(data);


                 if(comMas[2]=="="){
                   var filtMas = [];
                 for (var i = 0; i < masBr.length; i++) {
                   var band = masBr[i];
                   if(band[comMas[1]] == comMas[3]) {
                       filtMas.push(band);
                   }
                 }
                   var strJ = JSON.stringify(filtMas, "", 4);

                   console.log("Sent: \n" + strJ);
                   connection.write(strJ);

               } else  if(comMas[2]==">"){
                 var filtMas = [];
                for (var i = 0; i < masBr.length; i++) {
                  var band = masBr[i];
                  if(band[comMas[1]] > comMas[3]) {
                      filtMas.push(band);
                    }
                  }
                  var strJ = JSON.stringify(filtMas, "", 4);

                  console.log("Sent: \n" + strJ);
                  connection.write(strJ);

              }
              else  if(comMas[2]=="<"){
                var filtMas = [];
               for (var i = 0; i < masBr.length; i++) {
                 var band = masBr[i];
                 if(band[comMas[1]] < comMas[3]) {
                     filtMas.push(band);
                 }
               }
                 var strJ = JSON.stringify(filtMas, "", 4);

                 console.log("Sent: \n" + strJ);
                 connection.write(strJ);

             }
              }
              else {
                connection.write("Data received.Incorrect command.");
              }
            });
             }
             else {
               connection.write("Data received.Incorrect command.");
              }

           }
          /*  case 'sort' :{

              connection.write("Enter field, characteristics");
              console.log("Send: Enter field, characteristics ");
              connection.on("data", dataNew => {
                var field = [];
                field = data.toString().trim();
                var comMas = [];
                comMas = field.split(",");
                console.log("0" + comMas[0]);
                console.log("1" + comMas[1]);
                console.log("2" + comMas[2]);
              //  if (comMas.length==2){
               console.log(comMas);
                switch (comMas[0]) {
                case 'name':{
                  fs.readFile('brands.json', function(err, data) {
                    if (err) {
                      throw err;
                    }
                    var mas = JSON.parse(data);
                    var filtMas = [];
                    for (var i = 0; i < mas.length; i++) {
                      var brand = mas[i];
                      if(brand["name"] == comMas[1]) {
                          filtMas.push(brand);
                      }
                    }

                    strJ = JSON.stringify(filtMas, "", 4);   //4?

                    console.log("Send: \n" + strJ);
                    connection.write(strJ);
                    strJ.length=0;
                    filtMas.length=0;
                    delete strJ;
                    delete filtMas;
                  });
                  break;
                }
                case 'founder':{
                  fs.readFile('brands.json', function(err, data) {
                    if (err) {
                      throw err;
                    }
                    var mas = JSON.parse(data);
                    var filtMas = [];
                    for (var i = 0; i < mas.length; i++) {
                      var brand = mas[i];
                      if(brand["founder"] == comMas[1]) {
                          filtMas.push(brand);
                      }
                    }
                    var strJ = JSON.stringify(filtMas, "", 4);   //4?

                    console.log("Send: \n" + strJ);
                    connection.write(strJ);
                    delete strJ;
                    delete filtMas;
                  });
                  break;
                }
                case 'date':{
                  fs.readFile('brands.json', function(err, data) {
                    if (err) {
                      throw err;
                    }
                    var mas = JSON.parse(data);
                    var filtMas = [];
                    for (var i = 0; i < mas.length; i++) {
                      var brand = mas[i];
                      if(brand["date"] == comMas[1]) {
                          filtMas.push(brand);
                      }
                    }
                    var strJ = JSON.stringify(filtMas, "", 4);   //4?

                    console.log("Send: \n" + strJ);
                    connection.write(strJ);
                    delete strJ;
                    delete filtMas;

                  });
                  break;
                }
                case 'staf':{
                  fs.readFile('brands.json', function(err, data) {
                    if (err) {
                      throw err;
                    }
                    var mas = JSON.parse(data);
                    var filtMas = [];
                    for (var i = 0; i < mas.length; i++) {
                      var brand = mas[i];
                      if(brand["staf(million)"] == comMas[1]) {
                          filtMas.push(brand);
                      }
                    }
                    var strJ = JSON.stringify(filtMas, "", 4);   //4?

                    console.log("Send: \n" + strJ);
                    connection.write(strJ);
                    delete strJ;
                    delete filtMas;
                  });
                  break;
                }
                case 'cost':{
                  fs.readFile('brands.json', function(err, data) {
                    if (err) {
                      throw err;
                    }
                    var mas = JSON.parse(data);
                    var filtMas = [];
                    for (var i = 0; i < mas.length; i++) {
                      var brand = mas[i];
                      if(brand["cost(billions)"] == comMas[1]) {
                          filtMas.push(brand);
                      }
                    }
                    var strJ = JSON.stringify(filtMas, "", 4);   //4?

                    console.log("Send: \n" + strJ);
                    connection.write(strJ);
                    delete strJ;
                    delete filtMas;
                  });
                   break;
                }
                   //default:{connection.write("sdhksdjhgksdjghkdsjgh"); break;};
                  break;
                  comMas.length=0;
                 delete comMas;
                }
//}
            //});
                  break;
              };*/
              /*default:{
                connection.write("ERROR");
                break;
              }*/

break;
            }


  });

   connection.on('end', function() {
          console.log('client disconnected');
          var delUser = connection.remoteAddress + ':' + connection.remotePort;
          clientMas.splice(clientMas.indexOf(delUser), 1);
          connection.end();

   });

   connection.write('Hello World!\r\n');  // send message to client
  // connection.pipe(connection);
});

 var rl = rl.createInterface({
   input: process.stdin,
   output: process.stdout
 });

 rl.question('PORT: ', (port) => {

   console.log('You would like to connect with port:', port);
   server.listen(port, function() {
     console.log('Server is listening');
   });
   rl.close();
 });
