const express = require("express");
const app = express();

app.use(express.json());

let cards = [
  { id: 1, name: "Ace of Spades", type: "Spades" },
  { id: 2, name: "King of Hearts", type: "Hearts" }
];

app.get("/", (req, res) => {
  res.send("Playing Card REST API Running...");
});

app.get("/cards", (req, res) => {
  res.json(cards);
});

app.get("/cards/:id", (req, res) => {
  const card = cards.find(c => c.id == req.params.id);

  if (!card) {
    return res.status(404).json({ message: "Card not found" });
  }

  res.json(card);
});

app.post("/cards", (req, res) => {
  const newCard = {
    id: cards.length + 1,
    name: req.body.name,
    type: req.body.type
  };

  cards.push(newCard);
  res.status(201).json(newCard);
});

app.put("/cards/:id", (req, res) => {
  const card = cards.find(c => c.id == req.params.id);

  if (!card) {
    return res.status(404).json({ message: "Card not found" });
  }

  card.name = req.body.name;
  card.type = req.body.type;

  res.json(card);
});

app.delete("/cards/:id", (req, res) => {
  cards = cards.filter(c => c.id != req.params.id);

  res.json({ message: "Card deleted" });
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

