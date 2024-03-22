const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(morgan("tiny"));
app.use(cors());
app.use(express.static("dist"));

const generateId = () => {
  return Math.random() * 1000;
};

let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/api/persons", (req, res) => {
  res.json(persons);
});

app.get("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  const person = persons.find((p) => p.id === id);
  if (!person) {
    return res.status(404).end();
  }
  res.json(person);
});

app.post("/api/persons", (req, res) => {
  const body = req.body;
  if (!body.name || !body.number) {
    return res.status(400).json({ error: "insert a name and a number" });
  }
  const isAlreadyAdded = persons.some((person) => person.name === body.name);
  if (isAlreadyAdded) {
    return res.status(400).json({ error: "name must be unique" });
  }
  const newPerson = req.body;
  newPerson.id = generateId();
  persons = persons.concat(newPerson);
  console.log(JSON.stringify(newPerson));
  res.status(201).send(newPerson);
});

app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  persons = persons.filter((person) => person.id !== id);
  res.status(204).end();
});

app.get("/info", (req, res) => {
  const peoples = persons.length;
  const date = new Date();
  res.send(`<p>Phonebook has info for ${peoples} people</p>
            <p>${date}</p>`);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
