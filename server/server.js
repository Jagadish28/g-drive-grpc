

var PROTO_PATH = '../proto/g-drive.proto';

var grpc = require('@grpc/grpc-js');
var protoLoader = require('@grpc/proto-loader');
const requestHandler = require('./requesthandler');

require('./db');

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

function getAllTenants(call, callback) {
  // Call the handler function from the requestHandler module
  requestHandler.handleData(call, callback);
}

function saveTenant(call, callback) {
  // Call the handler function from the requestHandler module
  requestHandler.handleSaveTenant(call, callback);
}

function saveUser(call, callback) {
  // Call the handler function from the requestHandler module
  requestHandler.handleSaveUser(call, callback);
}

function saveFolder(call, callback) {
  // Call the handler function from the requestHandler module
  requestHandler.handleSaveFolder(call, callback);
}

function getUserFolder(call, callback) {
  // Call the handler function from the requestHandler module
  requestHandler.handleGetUserFolders(call, callback);
}

function saveFile(call, callback) {
  // Call the handler function from the requestHandler module
  requestHandler.handleSaveFile(call, callback);
}

function getFiles(call, callback) {
  // Call the handler function from the requestHandler module
  requestHandler.handleGetFiles(call, callback);
}
/**
 * Starts an RPC server that receives requests for the G-Drive service at the
 * sample server port
 */
function main() {
  var server = new grpc.Server();
  server.addService(g_drive.Gdrive.service, {sayHello: sayHello, 
    sayHelloAgain: sayHelloAgain,
    getAllTenants: getAllTenants, saveTenant: saveTenant,saveUser:saveUser, saveFolder: saveFolder, getUserFolder:getUserFolder,
    saveFile:saveFile, getFiles:getFiles});
  server.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), () => {
    server.start();
    console.log("Node gPRC is ready!")
  });
}

main();
