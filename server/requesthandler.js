const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = "mongodb+srv://test:admin@cluster0.3zcsq.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function handleData(call, callback) {

  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    const db = client.db("tenant_catalog");
    const collection = db.collection("tenants");
    const documents = await collection.find().toArray();

    const result = {data:documents};
    callback(null, result);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
    
  }


  async function handleSaveTenant (call,callback) {
    try {
      await client.connect();
      const db = client.db("tenant_catalog");
      const collection = db.collection("tenants");
      const newDocument = {name:call.request.name, dnsExtension:call.request.dnsExtension};

      // code to create separate database in a cluster , since its a free mongo Atlas cluster, we don't have access to perform this operation
      
      // const adminDb = client.db('admin');
      // const dbName = "tenant_"+call.request.dnsExtension;
      // await adminDb.command({ create: dbName });
      // console.log(`Database "${dbName}" created`);
      const document = await collection.insertOne(newDocument);

      const result = {data:document,message:"Tenant added!"};
      callback(null, result);

    } catch(error){
      const result = {code:500,message:"Error Occured while saving tenant"};
      callback(null, result);
    } finally {
      await client.close();
    }
  }

  async function handleSaveUser (call,callback) {
    try {
      await client.connect();
      const tenantDns = call.request.email.split("@")[1].split(".")[0]
      const dbName = "tenant_"+tenantDns;
      const db = client.db(dbName);
      const collection = db.collection("user");
      const newDocument = {firstName:call.request.firstName, lastName:call.request.lastName, email:call.request.email};
      const document = await collection.insertOne(newDocument);
      const result = {data:document,code:200,message:"User added!"};
      callback(null, result);

    } catch(error){
      console.log("error-->",error)
      const result = {code:500,message:"Error Occured while saving user"};
      callback(null, result);
    }
    finally {
      await client.close();
    }
  }
  
  async function handleSaveFolder (call,callback) {
    try {
      await client.connect();
      const tenantDns = call.request.userEmail.split("@")[1].split(".")[0];
      const userId = call.request.userId;
      const dbName = "tenant_"+tenantDns;
      const db = client.db(dbName);
      const collection = db.collection("folder");
      const newDocument = {name:call.request.name,  user: new ObjectId(userId)};
      const document = await collection.insertOne(newDocument);
      const result = {data:document,code:200,message:"folder added!"};
      callback(null, result);
    } catch(error){
      console.log("error-->",error)
      const result = {code:500,message:"Error Occured while saving folder"};
      callback(null, result);
    }
    finally {
      await client.close();
    }
  }

  async function handleGetUserFolders(call,callback) {
    try {
      await client.connect();
      const tenantDns = call.request.userEmail.split("@")[1].split(".")[0];
      const userId = call.request.userId;
      const dbName = "tenant_"+tenantDns;
      const db = client.db(dbName);
      const collection = db.collection("folder");
      const document = await collection.find({user:new ObjectId(userId)}).toArray();
      const result = {data:document};
      callback(null, result);
    } catch(error){
      console.log("error-->",error)

      const result = {code:500,message:"Error Occured while fetching folder"};
      callback(null, result);
    }
    finally {
      await client.close();
    }
  }



  async function handleSaveFile(call,callback) {
    try {
      await client.connect();
      const tenantDns = call.request.userEmail.split("@")[1].split(".")[0];
      const folderId = call.request.folderId;
      const dbName = "tenant_"+tenantDns;
      const db = client.db(dbName);
      const collection = db.collection("file");
      const newDocument = {name:call.request.name, content:call.request.content, folder: new ObjectId(folderId)};
      const document = await collection.insertOne(newDocument);
      const result = {data:document,code:200,message:"file added!"};
      callback(null, result);
    } catch(error){
      console.log("error-->",error)
      const result = {code:500,message:"Error Occured while saving file"};
      callback(null, result);
    }
    finally {
      await client.close();
    }
  }

  

  async function handleGetFiles(call,callback) {
    try {
      await client.connect();
      const tenantDns = call.request.userEmail.split("@")[1].split(".")[0];
      const folderId = call.request.folderId;
      const dbName = "tenant_"+tenantDns;
      const db = client.db(dbName);
      const collection = db.collection("file");
      const document = await collection.find({folder:new ObjectId(folderId)}).toArray();
      const result = {data:document};
      callback(null, result);
    } catch(error){
      console.log("error-->",error)

      const result = {code:500,message:"Error Occured while fetching folder"};
      callback(null, result);
    }
    finally {
      await client.close();
    }
  }

  
  
  
  
  module.exports = { handleData, handleSaveTenant, handleSaveUser, handleSaveFolder, handleGetUserFolders, handleSaveFile, handleGetFiles };
  