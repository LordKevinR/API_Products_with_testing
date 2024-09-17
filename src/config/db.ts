import { Sequelize } from "sequelize-typescript";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname } from "path";
import Product from "../models/Product.model.js";

dotenv.config();

// Utiliza import.meta.url para obtener la ruta del archivo actual
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const db = new Sequelize(process.env.DATABASE_URL!, {
  models: [__dirname + "/../models/**/*.ts"],
  logging: false,
});

db.addModels([Product]);

export default db;
