const request = require("supertest");
const express = require("express");

const newsRoutes = require("../routes/newsRoutes");

jest.mock("../controllers/newsController", () => ({
  getNews: jest.fn((req, res) =>
    res.status(200).json([{ title: "News 1" }])
  ),
  incrementView: jest.fn((req, res) =>
    res.status(200).json({ message: "View incremented" })
  ),
  getTrending: jest.fn((req, res) =>
    res.status(200).json([{ title: "Trending News" }])
  ),
  createArticle: jest.fn((req, res) =>
    res.status(201).json({ message: "Created" })
  ),
  getNewsByCategory: jest.fn((req, res) =>
    res.status(200).json([{ category: "Tech" }])
  ),
}));

const app = express();
app.use(express.json());
app.use("/news", newsRoutes);

describe("News Routes", () => {

  test("GET /news", async () => {
    const res = await request(app).get("/news");

    expect(res.statusCode).toBe(200);
  });

  test("GET /news/category/tech", async () => {
    const res = await request(app).get("/news/category/tech");

    expect(res.statusCode).toBe(200);
  });

  test("GET /news/trending", async () => {
    const res = await request(app).get("/news/trending");

    expect(res.statusCode).toBe(200);
  });

  test("POST /news/view/:id", async () => {
    const res = await request(app).post("/news/view/1");

    expect(res.statusCode).toBe(200);
  });

});