const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const PORT = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://aytfurniture:J8LNRSYEn32Bxe3V@cluster0.r4h2jko.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  // Creating collection in database
  const furniturecollection = client.db("ayt-furniture").collection("furnitures");
  const reviewcollection = client.db("ayt-furniture").collection("reviews");
  const contactcollection = client.db("ayt-furniture").collection("contacts");
  try {
    // For Add, Manage Products

    // Creating new product in Collection
    app.post('/add-a-product', async(req, res)=>{
      const furniture = req.body;
      const result = await furniturecollection.insertOne(furniture);
      res.send(result);
    })

    // Reading All data from a collection
    app.get('/all-product', async(req, res)=>{
      const result = await furniturecollection.find().toArray();
      res.send(result);
    })

    // Reading single data from a collection
    app.get('/single-product/:id', async(req, res)=>{
      const id = req.params.id;
      const result = await furniturecollection.findOne({_id: new ObjectId(id)});
      res.send(result);
    })

    // Updating single info of from a collection
    app.put('/update-product/:id', async(req, res)=>{
      const id = req.params.id;
      const filter = {_id : new ObjectId(id)};
      const updatedfurniture = req.body;
      const updates = {$set: updatedfurniture};
      const result = await furniturecollection.updateOne(filter, updates);
      res.send(result);
    })

    // Deleting a data from db
    app.delete('/delete-product/:id', async(req, res)=>{
      const id = req.params.id;
      const filter = {_id : new ObjectId(id)};
      const result = await furniturecollection.deleteOne(filter);
      res.send(result);
    })

    // For reading all Review Collection
    app.get('/review', async(req, res)=>{
      const result = await reviewcollection.find().toArray();
      res.send(result);
    })

    // For creating new feedback from contact
    app.post('/add-contact-info', async(req, res)=>{
      const info = req.body;
      const result = await contactcollection.insertOne(info);
      res.send(result);
    })
  } finally {
    
  }
}
run().catch(console.dir);

const data = require('./data.json');

app.get('/', (req, res)=>{
  res.send(data);
})

app.listen(PORT, () => {
  console.log("Hello AYT! Your server is on");
});


