const db = require('../../data/dbConfig.js');
const mappers = require('../../data/helpers/mappers');

module.exports = {
  get,
  getById,
  insert,
  update,
  remove,
};

function get() {
  return db('actions')
}

function getById(id) {
  return db('actions')
    .where({ id })
    .first();
}


function insert(action) {
  return db('actions')
    .insert(action, 'id')
    .then(([id]) => get(id));
}

function update(id, changes) {
  return db('actions')
    .where('id', id)
    .update(changes)
    .then((count) => (count > 0 ? get(id) : null));
}

function remove(id) {
  return db('actions').where('id', id).del();
}
