const Actions = require('../actions/actions-model');
const Projects = require('../projects/projects-model');

//validate id for both actions and projects
//validate action body and project body

const validateActionId = async (req, res, next) => {
    
    try {
      const user = await Actions.getById(req.params.id)
      if(!user) {
        res.status(404).json({
          message: `user with id ${req.params.id} doesn't exist`
        })
      }else {
        req.action = user;
        next()
      }
    } catch (err){
      next(err)
    }
  
  }

  module.exports = {
      validateActionId
  }