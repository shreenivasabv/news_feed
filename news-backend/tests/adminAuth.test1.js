const request = require("supertest");
const express = require("express");

const authRoutes = require("../routes/adminRoutes");

jest.mock("../controllers/adminAuthController", () => ({
  registerAdmin: jest.fn((req, res) =>
    res.status(201).json({ message: "Admin registered" })
  ),
  loginAdmin: jest.fn((req, res) =>
    res.status(200).json({ token: "test-token" })
  ),
}));

const app = express();
app.use(express.json());
app.use("/admin", authRoutes);

describe("Admin Auth Routes", () => {

  test("POST /admin/register", async () => {
    const res = await request(app)
      .post("/admin/register")
      .send({ email: "admin@test.com", password: "123456" });

    expect(res.statusCode).toBe(201);
  });

  test("POST /admin/login", async () => {
    const res = await request(app)
      .post("/admin/login")
      .send({ email: "admin@test.com", password: "123456" });

    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined();
  });

});