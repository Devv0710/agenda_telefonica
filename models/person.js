const mongoose = require("mongoose");
const url = process.env.MONGODB_URL;
console.log("Connecting to ", url);

mongoose
  .connect(url)
  .then((result) => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log("Failed to connect ", error.message);
  });

mongoose.set("strictQuery", false);

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
  },
  number: {
    type: String,
    minLength: 8,
    validate: {
      validator: function (num) {
        return /^\d{2,3}-\d{4,}$/.test(num);
      },
    },
  },
});

personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Person = mongoose.model("Person", personSchema);

module.exports = { Person };
