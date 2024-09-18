import { Sequelize } from "sequelize-typescript";
import dotenv from "dotenv";
import Product from "../models/Product.model";
import path from "path";

dotenv.config();

const modelsPath = path.join(process.cwd(), "/src/models/**/*.ts");

const db = new Sequelize(process.env.DATABASE_URL!, {
  models: [modelsPath],
  logging: false,
});

db.addModels([Product]);

export default db;
