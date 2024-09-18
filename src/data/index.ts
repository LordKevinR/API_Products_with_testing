import { exit } from "node:process";
import db from "../config/db";

const clearDB = async () => {
  try {
    await db.sync({ force: true });
    console.log("Database cleared successfully");
    exit(0);
  } catch (error) {
    console.error("Error clearing database:", error);
    exit(1);
  }
};

if (process.argv[2] === "--clear") {
  clearDB();
}
