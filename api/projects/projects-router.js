// Write your "projects" router here!
const express = require('express');
// const Actions = require('./actions-model');
const Projects = require('./projects-model');
const mw = require('../middleware/middleware');

const router = express.Router();

// **All these helper methods return a promise. Remember to use .then().catch() or async/await.**

// - `get()`: resolves to an array of all the resources contained in the database. If you pass an `id` to this method it will return the resource with that id if one is found.
// - `insert()`: calling insert passing it a resource object will add it to the database and return the newly created resource.
// - `update()`: accepts two arguments, the first is the `id` of the resource to update, and the second is an object with the `changes` to apply. It returns the updated resource. If a resource with the provided `id` is not found, the method returns `null`.
// - `remove()`: the remove method accepts an `id` as its first parameter and, upon successfully deleting the resource from the database, returns the number of records deleted.

// The `projects-model.js` includes an extra method called `getProjectActions()` that takes a _project id_ as its only argument and returns a list of all the _actions_ for the _project_.


router.get('/', (req,res,next)=> {
    Projects.get(req.query)
    .then(projects => {
        res.status(200).json(projects)
    })
    .catch(next)
});

router.get('/:id', mw.validateProjectId, (req,res, next)=>{
    Projects.getById(req.params.id)
    .then(project => {
        res.status(200).json(project)
    })
    .catch(next)
}) 

router.get('/:id/actions', (req, res)=> {
    const { id } = req.params
    Projects.getProjectActions(id)
    .then(projectActions => {
        res.status(200).json(projectActions)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            message: err.message
        })
    })
})

router.post('/:id', mw.validateProjectId, mw.validateProject, (req, res)=> {
    const projectBody = {...req.body, id: req.params.id};
    // const actionBody = {...req.body};
    Projects.insert(projectBody)
    .then(project => {
        res.status(201).json(project)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            message: 'Error inserting project'
        })
    })
})

router.put('/:id', mw.validateProjectId, (req, res, next) => {

    Projects.update(req.params.id, req.body)
    .then(project => {
      res.status(200).json(project)
    })
    .catch(next)
  });

  router.delete('/:id', mw.validateProjectId, (req, res) => {
    Projects.remove(req.params.id)
    .then(()=> {
      res.status(204).json({message: 'the project objects last words were, "I will haunt yoooou!"'})
    })
  });

module.exports = router;