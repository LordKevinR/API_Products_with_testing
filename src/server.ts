import express from "express";
import router from "./router";
import db from "./config/db";

//conect db
async function connectDB() {
  try {
    await db.authenticate();
    db.sync();
    console.log("Database connected");
  } catch (error) {
    console.log(error);
    console.log("there was an error connecting to db");
  }
}

connectDB();

const server = express();

server.use(express.json());

server.use("/api/products", router);

export default server;
