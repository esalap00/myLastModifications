const request = require("supertest");
const app = require("../src/app");

describe("App", () => {
  test("serves the index correctly", async () => {
    const response = await request(app).get("/");
    expect(response).not.toBeNull();
    expect(response.status).toBe(200)
  });
});

