import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { MongoClient, ObjectId } from "mongodb";
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
const usersCollection = db.collection("user");
const jobsCollection = db.collection("jobs");

// health check route
app.get("/", (req, res) => {
  res.send("HireLoop Server is running");
});

app.get("/users", async (req, res) => {
  const users = await usersCollection.find({}).toArray();
  res.send(users);
});


app.get("/jobs", async (req, res) => {
  const jobs = await jobsCollection.find({}).sort({ _id: -1 }).toArray();
  res.send(jobs);
});

app.post("/add-job", async (req, res) => {
  const job = {
    ...req.body,
    createdAt: req.body.createdAt || new Date().toISOString(),
  };
  const result = await jobsCollection.insertOne(job);
  res.send(result);
});

app.get("/jobs/:id", async (req, res) => {
  const { id } = req.params;
  try {
    if (!ObjectId.isValid(id)) {
      return res.status(404).send({ error: "Invalid job ID" });
    }
    const query = { _id: new ObjectId(id) };
    const job = await jobsCollection.findOne(query);
    if (!job) {
      return res.status(404).send({ error: "Job not found" });
    }
    res.send(job);
  } catch (error) {
    res.status(404).send({ error: error.message });
  }
});

app.put("/jobs/:id", async (req, res) => {
  const { id } = req.params;
  try {
    if (!ObjectId.isValid(id)) {
      return res.status(404).send({ error: "Invalid job ID" });
    }
    const query = { _id: new ObjectId(id) };
    const updatedData = { ...req.body };
    delete updatedData._id;
    const result = await jobsCollection.updateOne(query, { $set: updatedData });
    res.send(result);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

app.delete("/jobs/:id", async (req, res) => {
  const { id } = req.params;
  try {
    if (!ObjectId.isValid(id)) {
      return res.status(404).send({ error: "Invalid job ID" });
    }
    const query = { _id: new ObjectId(id) };
    const result = await jobsCollection.deleteOne(query);
    res.send(result);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});








if (process.env.NODE_ENV === "production") {  
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  })
}

if (process.env.NODE_ENV === "development") {
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  })
}

export default app;

