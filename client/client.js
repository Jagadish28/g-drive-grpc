
var PROTO_PATH =  '../proto/g-drive.proto';

var parseArgs = require('minimist');
var grpc = require('@grpc/grpc-js');
var protoLoader = require('@grpc/proto-loader');
const express = require('express');
const app = express();

const tenantHandler = require('./handlers/tenantHandler');

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

  app.get('/',tenantHandler.handleRequest);
  app.get('/tenants', tenantHandler.handleAllTenantRequest);


  const port = 3000;
  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });


}

main();
