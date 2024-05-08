const { Person } = require("../models/person");

function getInfo(req, res, next) {
    Person
        .find()
        .then((persons) => {
            res.send(`<p>Phonebook has info for ${persons.length} people</p>
                <p>${new Date()}</p>`);
        })
        .catch((error) => next(error));
}

module.exports = { getInfo }

