import * as express from "express";

const server = express();

server.use("**", (_req, res) => {
  res.send("hello from service");
});

server.listen(3333);
