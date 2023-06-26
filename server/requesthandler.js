const { MongoClient, ServerApiVersion } = require('mongodb');
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
    console.log(documents);

    const result = {data:documents};
    callback(null, result);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
    
  }
  
  module.exports = { handleData };
  