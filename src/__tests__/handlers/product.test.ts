import request from "supertest";
import server from "../../server";

describe("POST /api/products", () => {
  it("should display validation errors", async () => {
    const res = await request(server).post("/api/products").send({});
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("errors");
    expect(res.headers["content-type"]).toMatch("/json");

    expect(res.status).not.toBe(201);
    expect(res.headers["content-type"]).not.toMatch("/text");
    expect(res.body).not.toHaveProperty("data");
  });

  it("should validate the price is greater than 0", async () => {
    const res = await request(server).post("/api/products").send({
      name: "Test Product",
      price: 0,
    });

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("errors");
    expect(res.headers["content-type"]).toMatch("/json");
    expect(res.body.errors).toHaveLength(1);

    expect(res.status).not.toBe(201);
    expect(res.headers["content-type"]).not.toMatch("/text");
    expect(res.body).not.toHaveProperty("data");
  });

  it("should validate the price is a number and greater than 0", async () => {
    const res = await request(server).post("/api/products").send({
      name: "Test Product",
      price: "Hi",
    });

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("errors");
    expect(res.headers["content-type"]).toMatch("/json");
    expect(res.body.errors).toHaveLength(2);

    expect(res.status).not.toBe(201);
    expect(res.headers["content-type"]).not.toMatch("/text");
    expect(res.body).not.toHaveProperty("data");
  });

  it("should create a new product", async () => {
    const res = await request(server).post("/api/products").send({
      name: "Test Product",
      price: 9.99,
    });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("data");
    expect(res.headers["content-type"]).toMatch("/json");

    expect(res.status).not.toBe(404);
    expect(res.headers["content-type"]).not.toMatch("/text");
    expect(res.body.data).not.toHaveProperty("errors");
  });
});

describe("GET /api/products", () => {
  it("should check if the url exists", async () => {
    const res = await request(server).get("/api/products");
    expect(res.status).not.toBe(404);
  });

  it("should return a JSON response with products", async () => {
    const res = await request(server).get("/api/products");

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("data");
    expect(res.headers["content-type"]).toMatch("/json");
    expect(res.body.data).toHaveLength(1);

    expect(res.status).not.toBe(400);
    expect(res.headers["content-type"]).not.toMatch("/text");
    expect(res.body.data).not.toHaveProperty("errors");
  });
});

describe("GET /api/products/:id", () => {
  it("should check if the url exists", async () => {
    const res = await request(server).get("/api/products/1");
    expect(res.status).not.toBe(404);
  });

  it("should return a 404 response if the product doesn't exists", async () => {
    const res = await request(server).get("/api/products/200");
    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty("error");
  });

  it("should return an error if the param is not a number", async () => {
    const res = await request(server).get("/api/products/hi");
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("errors");
  });

  it("should return a JSON response with a product", async () => {
    const res = await request(server).get("/api/products/1");

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("data");
    expect(res.headers["content-type"]).toMatch("/json");

    expect(res.status).not.toBe(400);
    expect(res.headers["content-type"]).not.toMatch("/text");
    expect(res.body.data).not.toHaveProperty("errors");
  });
});

describe("PUT /api/products/:id", () => {
  it("should check if the url exists", async () => {
    const res = await request(server).put("/api/products/1");
    expect(res.status).not.toBe(404);
  });

  it("should validate the price is a number", async () => {
    const res = await request(server).put("/api/products/1").send({
      name: "Test Product",
      price: "Hi",
    });

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("errors");
    expect(res.headers["content-type"]).toMatch("/json");
    expect(res.body.errors).toHaveLength(2);

    expect(res.status).not.toBe(201);
    expect(res.headers["content-type"]).not.toMatch("/text");
    expect(res.body).not.toHaveProperty("data");
  });

  it("should validate the price is greater than 0", async () => {
    const res = await request(server)
      .put("/api/products/1")
      .send({ name: "Test Product", price: 0 });
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("errors");
    expect(res.body.errors).toHaveLength(1);
    expect(res.status).not.toBe(201);
    expect(res.body).not.toHaveProperty("data");
  });

  it("should return an error if the param is not a number", async () => {
    const res = await request(server).put("/api/products/hi");
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("errors");
  });

  it("should return a 404 response if the product doesn't exists", async () => {
    const res = await request(server).put("/api/products/200").send({
      name: "Test Product",
      price: 100,
    });
    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty("error");

    expect(res.status).not.toBe(200);
    expect(res.body).not.toHaveProperty("data");
  });

  it("should return a JSON response with a product", async () => {
    const res = await request(server).put("/api/products/1").send({
      name: "Updated Product",
      price: 19.99,
    });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("data");
    expect(res.headers["content-type"]).toMatch("/json");

    expect(res.status).not.toBe(400);
    expect(res.headers["content-type"]).not.toMatch("/text");
    expect(res.body.data).not.toHaveProperty("errors");
  });
});

describe("PATCH /api/products/:id", () => {
  it("should return an error if the param is not a number", async () => {
    const res = await request(server).patch("/api/products/hi");
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("errors");
    expect(res.body.errors[0].msg).toBe("Invalid Id");

    expect(res.status).not.toBe(200);
    expect(res.body).not.toHaveProperty("data");
  });

  it("should return a 404 response if the product doesn't exists", async () => {
    const res = await request(server).patch("/api/products/200");
    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty("error");
    expect(res.body.error).toBe("Product not found");

    expect(res.status).not.toBe(200);
    expect(res.body).not.toHaveProperty("data");
  });

  it("should update the availability of a product", async () => {
    const res = await request(server).patch("/api/products/1");

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("data");
    expect(res.body.data).toHaveProperty("availability");

    expect(res.status).not.toBe(404);
    expect(res.status).not.toBe(400);
    expect(res.body.data).not.toHaveProperty("errors");
  });
});

describe("DELETE /api/products/:id", () => {
  it("should return an error if the param is not a number", async () => {
    const res = await request(server).delete("/api/products/hi");
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("errors");
  });

  it("should return a 404 response if the product doesn't exists", async () => {
    const res = await request(server).delete("/api/products/200");
    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty("error");

    expect(res.status).not.toBe(200);
    expect(res.body).not.toHaveProperty("data");
  });

  it("should delete a product", async () => {
    const res = await request(server).delete("/api/products/1");

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("data");
    expect(res.body.data).toBe("Product deleted");

    expect(res.status).not.toBe(404);
    expect(res.status).not.toBe(400);
    expect(res.body.data).not.toHaveProperty("errors");
  });
});
