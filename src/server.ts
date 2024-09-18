import express from "express";
import router from "./router";
import db from "./config/db";

//conect db
export async function connectDB() {
  try {
    await db.authenticate();
    db.sync();
    // console.log("Database connected");
  } catch (error) {
    // console.log(error);
    console.log("Database connection error");
  }
}

connectDB();

const server = express();

server.use(express.json());

server.use("/api/products", router);

export default server;
