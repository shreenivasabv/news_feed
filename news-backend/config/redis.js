const { createClient } = require("redis");

const redisClient = createClient({
  url: process.env.REDIS_URL || "redis://127.0.0.1:6379",
});

redisClient.on("error", (err) => {
  console.log("❌ Redis Error:", err);
});

redisClient.on("connect", () => {
  console.log("🔗 Redis Connecting...");
});

redisClient.on("ready", () => {
  console.log("✅ Redis Connected Successfully");
});

async function connectRedis() {
  try {
    await redisClient.connect();
  } catch (error) {
    console.error("Redis Connection Failed:", error);
  }
}

connectRedis();

module.exports = redisClient;