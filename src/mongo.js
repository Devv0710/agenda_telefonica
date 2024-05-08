const mongoose = require("mongoose");
// Para que funcione se debe pasar la contraseña al ejecutar el progama
const password = process.argv[2];
const URI = "mongodb+srv://admin:admin@cluster0.swcphwt.mongodb.net/phoneBookApp?retryWrites=true&w=majority&appName=Cluster0";

mongoose.set("strictQuery", false);
// mongoose.connect(URI);

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = new mongoose.model("person", personSchema);

if (process.argv.length > 3) {
  const name = process.argv[3];
  const number = process.argv[4];

  const person = new Person({
    name,
    number,
  });

  person.save().then((result) => {
    console.log(`added ${result.name} number ${result.number} to phonebook`);
    mongoose.connection.close();
  });
} else {
  Person.find().then((result) => {
    console.log("phonebook: ");
    result.forEach((person) => {
      console.log(`${person.name} ${person.number}`);
    });
    mongoose.connection.close();
  });
}
