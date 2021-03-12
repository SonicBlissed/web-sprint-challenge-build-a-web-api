const express = require('express');
const Actions = require('./actions-model');
const Projects = require('../projects/projects-model');
const mw = require('../middleware/middleware');

const router = express.Router();

// Write your "actions" router here!
// get(returns all actions as the body of the response) /api/actions
// get(returns actions for the specific id) /api/actions/:id
// post (new action status 201) /api/actions
// put (update action for the id status 200) /api/actions/:id
// delete (removes response body status 204) /api/actions/:id

router.get('/', (req,res,next)=> {
    Actions.get(req.query)
    .then(actions => {
        res.status(200).json(actions)
    })
    .catch(next)
});

router.get('/:id', mw.validateActionId, (req,res)=>{
    res.json(req.action)
}) 

module.exports = router;