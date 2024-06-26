const { Person } = require("../models/person");

function getAllPersons(req, res, next) {
    Person
        .find()
        .then((persons) => {
            res.status(200).json(persons);
        })
        .catch((error) => next(error))
}
function getPersonById(req, res, next) {
    const id = req.params.id;
    Person
        .findById(id)
        .then((person) => {
            if (person) {
                res.status(200).json(person);
            } else {
                res.status(404).json({ error: 'Person not found' });
            }
        })
        .catch((error) => next(error));
}
function createPerson(req, res, next) {
    const body = req.body;
    if (!body.name || !body.number) {
        return res.status(400).json({ error: 'Name and number are required' });
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
}

function updatePerson(req, res, next) {
    const id = req.params.id;
    const body = req.body;
    const person = { ...body };

    const { number } = req.body
    if (!number) {
        return res.status(400).json({ error: 'Number is required' });
    }

    Person
        .findByIdAndUpdate(id, person, {
            new: true,
            runValidators: true,
            context: "query",
        })
        .then((newPerson) => {
            if (newPerson) {
                res.status(200).json(newPerson);
            } else {
                res.status(404).json({ error: 'Person not found' });
            }
        })
        .catch((error) => next(error));
}
function deletePerson(req, res, next) {
    const id = req.params.id;
    Person
        .findByIdAndDelete(id)
        .then((deletedPerson) => {
            if (deletedPerson) {
                res.status(202).json(deletedPerson);
            } else {
                res.status(404).json({ error: 'Person not found' });
            }
        })
        .catch((error) => next(error));
}

module.exports = {
    getAllPersons,
    getPersonById,
    createPerson,
    updatePerson,
    deletePerson
}