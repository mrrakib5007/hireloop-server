import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { MongoClient } from "mongodb";
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

const client = new MongoClient(process.env.MONGODB_URI);
export async function connectToMongoDB() {
  try {
    await client.connect();
    console.log("You successfully connected to MongoDB!");
    return client;
  } catch (err) {
    console.dir(err);
  }
}

const mongoClient = await connectToMongoDB();
const db = mongoClient.db("hireloop_db");
const usersCollection = db.collection("users");

// health check route
app.get("/", (req, res) => {
  res.send("HireLoop Server is running");
});


if (process.env.NODE_ENV === "production") {  
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
})}

export default app;

