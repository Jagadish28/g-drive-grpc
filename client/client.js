
var PROTO_PATH =  '../proto/g-drive.proto';

var parseArgs = require('minimist');
var grpc = require('@grpc/grpc-js');
var protoLoader = require('@grpc/proto-loader');
const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();

const requestHandler = require('./handlers/requestHandler');

var packageDefinition = protoLoader.loadSync(
    PROTO_PATH,
    {keepCase: true,
     longs: String,
     enums: String,
     defaults: true,
     oneofs: true
    });
    
var g_drive = grpc.loadPackageDefinition(packageDefinition).gdrive;

function main() {
  var argv = parseArgs(process.argv.slice(2), {
    string: 'target'
  });
  var target;
  if (argv.target) {
    target = argv.target;
  } else {
    target = 'localhost:50051';
  }
  var client = new g_drive.Gdrive(target,
                                       grpc.credentials.createInsecure());


  app.use((req, res, next) => {
    req.client = client;
    next();
  });

  app.use(express.json());
  app.use(cookieParser());

  app.get('/',requestHandler.handleRequest);
  app.get('/tenants', requestHandler.handleAllTenantRequest);
  app.post('/tenant', requestHandler.handleAddTenant);
  app.post('/user', requestHandler.handleSaveUser);
  app.post('/folder', requestHandler.handleSaveFolder);
  app.get('/folder', requestHandler.handleGetFolder);


  const port = 3000;
  app.listen(port, () => {
    console.log(`Client listening on port ${port}`);
  });


}

main();
