const express = require("express");
const redis = require("redis");

const app = express();
app.use(express.json());

// Redis Client
const client = redis.createClient();

client.connect();

let TOTAL_SEATS = 10;

// Home
app.get("/", (req, res) => {
  res.send("Concurrent Ticket Booking System Running...");
});

// Check Available Seats
app.get("/seats", async (req, res) => {
  let seats = await client.get("seats");

  if (!seats) {
    await client.set("seats", TOTAL_SEATS);
    seats = TOTAL_SEATS;
  }

  res.json({ availableSeats: seats });
});

// Book Ticket
app.post("/book", async (req, res) => {
  const lockKey = "lock_seat";

  // Try Lock
  const lock = await client.set(lockKey, "locked", {
    NX: true,
    EX: 5
  });

  if (!lock) {
    return res.status(429).json({
      message: "System busy. Try again."
    });
  }

  let seats = await client.get("seats");
  seats = parseInt(seats);

  if (seats > 0) {
    seats--;

    await client.set("seats", seats);
    await client.del(lockKey);

    return res.json({
      message: "Ticket Booked",
      remaining: seats
    });
  } else {
    await client.del(lockKey);

    return res.status(400).json({
      message: "No seats available"
    });
  }
});

// Reset Seats (for testing)
app.post("/reset", async (req, res) => {
  await client.set("seats", TOTAL_SEATS);

  res.json({
    message: "Seats reset",
    total: TOTAL_SEATS
  });
});

// Server
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

