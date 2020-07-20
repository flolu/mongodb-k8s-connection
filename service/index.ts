import * as express from "express";
import { MongoClient } from "mongodb";

const server = express();

const connectionString = process.env.MONGO_DB_URL || "";
console.log({ connectionString });
const client = new MongoClient(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const boot = async () => {
  try {
    console.log("try to connect to mongodb");
    await client.connect();
    console.log("connected");
  } catch (err) {
    console.log("error while connecting to mongodb");
    console.error(err);
  }
};

boot();

server.use("**", (_req, res) => {
  res.send("hello from service");
});

server.listen(3333);
