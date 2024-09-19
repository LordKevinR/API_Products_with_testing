import express from "express";
import router from "./router";
import db from "./config/db";
import swaggerUI from "swagger-ui-express";
import swaggerSpec from "./config/swagger";
import cors, { CorsOptions } from "cors";

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

const corsOptions: CorsOptions = {
  origin: "*",
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"],
  methods: ["GET", "PUT", "POST", "DELETE", "PATCH"],
};

server.use(cors(corsOptions));

server.use(express.json());

server.use("/api/products", router);

//Docs
server.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));

export default server;
