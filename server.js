

var PROTO_PATH = __dirname + '/proto/g-drive.proto';

var grpc = require('@grpc/grpc-js');
var protoLoader = require('@grpc/proto-loader');
var packageDefinition = protoLoader.loadSync(
    PROTO_PATH,
    {keepCase: true,
     longs: String,
     enums: String,
     defaults: true,
     oneofs: true
    });
var g_drive = grpc.loadPackageDefinition(packageDefinition).gdrive;

/**
 * Implements the SayHello RPC method.
 */
function sayHello(call, callback) {
  callback(null, {message: 'Hello ' + call.request.name});
}

function sayHelloAgain(call, callback) {
  callback(null, {message: 'Hello again, ' + call.request.name});
}

/**
 * Starts an RPC server that receives requests for the G-Drive service at the
 * sample server port
 */
function main() {
  var server = new grpc.Server();
  server.addService(g_drive.Gdrive.service, {sayHello: sayHello, sayHelloAgain: sayHelloAgain});
  server.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), () => {
    server.start();
  });
}

main();
