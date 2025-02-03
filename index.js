const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const PORT = 5000;
app.use(cors());
app.use(express.json());

const client = new MongoClient(process.env.URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

// Creating collection in database
const furniturecollection = client.db("aytfurniture").collection("furnitures");
const reviewcollection = client.db("aytfurniture").collection("reviews");
const contactcollection = client.db("aytfurniture").collection("contacts");

app.post("/add-a-product", async (req, res) => {
  try {
    const furniture = req.body;
    const result = await furniturecollection.insertOne(furniture);
    res.send(result);
  } catch (error) {
    res.send("Error");
  }
});

// Reading All data from a collection
app.get("/all-product", async (req, res) => {
  try {
    const result = await furniturecollection.find().toArray();
    res.send(result);
  } catch (error) {
    res.send("Error");
  }
});

// Reading single data from a collection
app.get("/single-product/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const result = await furniturecollection.findOne({ _id: new ObjectId(id) });
    res.send(result);
  } catch (error) {
    res.send("Error");
  }
});

// Updating single info of from a collection
app.put("/update-product/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const filter = { _id: new ObjectId(id) };

    const updatedfurniture = req.body;

    const updates = { $set: updatedfurniture };
    const result = await furniturecollection.updateOne(filter, updates);
    res.send(result);
  } catch (error) {
    res.send("Error");
  }
});

// Deleting a data from db
app.delete("/delete-product/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const filter = { _id: new ObjectId(id) };
    const result = await furniturecollection.deleteOne(filter);
    res.send(result);
  } catch (error) {
    res.send("Error");
  }
});

// For reading all Review Collection
app.get("/review", async (req, res) => {
  try {
    const result = await reviewcollection.find().toArray();
    res.send(result);
  } catch (error) {
    res.send("Error");
  }
});

// For creating new feedback from contact
app.post("/add-contact-info", async (req, res) => {
  try {
    const info = req.body;
    const result = await contactcollection.insertOne(info);
    res.send(result);
  } catch (error) {
    res.send("Error");
  }
});

app.listen(PORT, () => {
  console.log("Server running at PORT: ", PORT);
});
