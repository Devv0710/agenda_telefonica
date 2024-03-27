require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3001;
const { Person } = require("./models/person");

app.use(express.json());
app.use(morgan("tiny"));
app.use(cors());
app.use(express.static("dist"));

app.get("/api/persons", (req, res) => {
  Person.find().then((persons) => {
    res.status(200).json(persons);
  });
});

app.get("/api/persons/:id", (req, res, next) => {
  const id = req.params.id;
  Person.findById(id)
    .then((person) => {
      if (person) {
        res.status(200).json(person);
      } else {
        res.status(404).end();
      }
    })
    .catch((error) => next(error));
});

app.post("/api/persons", (req, res, next) => {
  const body = req.body;
  if (!body.name || !body.number) {
    return res.status(400).json({ error: "insert a name and a number" });
  }

  const person = new Person({
    number: body.number,
    name: body.name,
  });

  person
    .save()
    .then((newPerson) => {
      if (newPerson) {
        res.status(201).json(newPerson);
      }
    })
    .catch((error) => next(error));
});

app.put("/api/persons/:id", (req, res, next) => {
  const id = req.params.id;
  const body = req.body;
  const person = { ...body };

  Person.findByIdAndUpdate(id, person, {
    new: true,
    runValidators: true,
    context: "query",
  })
    .then((newPerson) => {
      if (newPerson) {
        res.status(201).json(newPerson);
      } else {
        res.status(404).end();
      }
    })
    .catch((error) => next(error));
});

app.delete("/api/persons/:id", (req, res, next) => {
  const id = req.params.id;
  Person.findByIdAndDelete(id)
    .then((deletedPerson) => {
      if (deletedPerson) {
        res.status(202).end();
      } else {
        res.status(404).end();
      }
    })
    .catch((error) => next(error));
});

app.get("/info", (req, res, next) => {
  Person.find()
    .then((persons) => {
      res.send(`<p>Phonebook has info for ${persons.length} people</p>
                <p>${new Date()}</p>`);
    })
    .catch((error) => next(error));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

const errorHandler = (error, req, res, next) => {
  console.log(error);
  if (error.name === "CastError") {
    res.status(500).end();
  } else {
    res.status(500).send(error);
  }
  next();
};

app.use(errorHandler);
