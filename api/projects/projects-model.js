const db = require("../../data/dbConfig.js");
const mappers = require('../../data/helpers/mappers');

module.exports = {
  get,
  getById,
  insert,
  update,
  remove,
  getProjectActions,
};

function get() {
  return db("projects as p");
  
}

function getById(id) {
  return db('projects')
    .where({ id })
    .first();
}

function insert(project) {
  return db("projects")
    .insert(project, "id")
    .then(([id]) => get(id));
}

function update(id, changes) {
  return db("projects")
    .where("id", id)
    .update(changes)
    .then(count => (count > 0 ? get(id) : null));
}

function remove(id) {
  return db("projects")
    .where("id", id)
    .del();
}

function getProjectActions(projectId) {
  return db("actions")
    .where("project_id", projectId)
    .then(actions => actions.map(action => mappers.actionToBody(action)));
}
