import request from "supertest";
import server from "../server.js";

describe("GET /api/products", () => {
  it("should send back a json response", async () => {
    const res = await request(server).get("/api/products");
    console.log(res);
  });
});
