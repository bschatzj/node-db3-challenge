const db = require("../data/dbConfig");

module.exports = {
  find,
  findById,
  findSteps,
  add,
  update,
  remove
};

function find() {
  return db("schemes");
}

function findById(id) {
  return db("schemes")
    .where({ id })
    .first();
}

function findSteps(id) {
  return db("schemes")
    .select(
      "steps.id",
      "schemes.scheme_name",
      "steps.step_number",
      "steps.instructions"
    )
    .join("steps", "steps.scheme_id", "schemes.id")
    .where({ scheme_id: id })
    .orderBy("step_number");
}

function add(schemeData) {
  return db("schemes")
    .insert(schemeData, "id")
    .then(ids => {
      const [id] = ids;
      return findById(id);
    });
}

function update(changes, id) {
  return db("schemes")
    .where({ id })
    .update(changes, "*");
}

function remove(id) {
  return db("schemes")
    .where({ id })
    .del();
}