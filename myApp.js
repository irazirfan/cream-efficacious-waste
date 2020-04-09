/**********************************************
 * 3. FCC Mongo & Mongoose Challenges
 * ==================================
 ***********************************************/
const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URI);

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  age: Number,
  favoriteFoods: [String]
});

const Person = mongoose.model("Person", personSchema);

const createAndSavePerson = function(done) {
  const iraz = new Person({
    name: "Iraz",
    age: 22,
    favoriteFoods: ["Kitkat", "Noodles"]
  });

  iraz.save((err, data) => {
    if (err) return console.error(err);
    done(null, data);
  });
};

var arrayOfPeople = [
  { name: "Iraz", age: 22, favoriteFoods: ["Coffee"] },
  { name: "Sourav", age: 22, favoriteFoods: ["wine"] },
  { name: "Kohai", age: 20, favoriteFoods: ["vegetable"] }
];

var createManyPeople = function(arrayOfPeople, done) {
  Person.create(arrayOfPeople, (err, people) => {
    if (err) return console.error(err);
    done(null, people);
  });
};

var findPeopleByName = function(personName, done) {
  Person.find({ name: personName }, (err, personFound) => {
    if (err) return console.error(err);
    done(null, personFound);
  });
};

var findOneByFood = function(food, done) {
  Person.findOne({ favoriteFoods: food }, (err, data) => {
    if (err) return console.log(err);
    done(null, data);
  });
};

var findPersonById = function(personId, done) {
  Person.findById(personId, (err, data) => {
    if (err) return console.log(err);
    done(null, data);
  });
};

var findEditThenSave = function(personId, done) {
  var foodToAdd = "hamburger";
  Person.findById(personId, (err, data) => {
    if (err) {
      done(err);
    }
    data.favoriteFoods.push(foodToAdd);
    data.save((err, data) => {
      if (err) done(err);
      done(null, data);
    });
  });
};

var findAndUpdate = function(personName, done) {
  var ageToSet = 20;

  Person.findOneAndUpdate(
    { name: personName },
    { $set: { age: ageToSet } },
    { new: true, useNewUrlParser: true, useUnifinedTopology: true },
    (err, data) => {
      if (err) return done(err, data);
      return done(null, data);
    }
  );
};

var removeById = function(personId, done) {
  Person.findByIdAndRemove(personId, (err, data) => {
    if (err) done(err);
    done(null, data);
  });
};

var removeManyPeople = function(done) {
  var nameToRemove = "Mary";
  Person.deleteMany({ name: nameToRemove }, (err, data) => {
    if (err) done(err);
    done(null, data);
  });
};

var queryChain = function(done) {
  var foodToSearch = "burrito";
  Person.find({ favoriteFoods: foodToSearch}).sort({ name: "asc" }).limit(2).select("-age").exec((err, data) => {
      if (err) done(err);
      done(err, data);
    });
};

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
