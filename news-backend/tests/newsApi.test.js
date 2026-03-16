const request = require("supertest");
const express = require("express");

const newsApiRoutes = require("../routes/newsApiRoutes");

jest.mock("../controllers/newsApiController", () => ({
  fetchExternalNews: jest.fn((req, res) =>
    res.status(200).json({ message: "News fetched" })
  ),
}));

const app = express();
app.use("/api", newsApiRoutes);

describe("External News API", () => {

  test("GET /api/fetch-news", async () => {
    const res = await request(app).get("/api/fetch-news");

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("News fetched");
  });

});