const Actions = require('../actions/actions-model');
const Projects = require('../projects/projects-model');

//validate id for both actions and projects
//validate action body and project body

const validateActionId = async (req, res, next) => {
    
    try {
      const user = await Actions.getById(req.params.id)
      if(!user) {
        res.status(404).json({
          message: `action with id ${req.params.id} doesn't exist`
        })
      }else {
        req.action = user;
        next()
      }
    } catch (err){
      next(err)
    }
  
  }

  
  const validateProjectId = async (req, res, next) => {
      
      try {
          const user = await Projects.getById(req.params.id)
          if(!user) {
              res.status(404).json({
          message: `project with id ${req.params.id} doesn't exist`
        })
    }else {
        req.action = user;
        next()
    }
    } catch (err){
      next(err)
    }
  
}

const validateAction = (req, res, next) => {
  if (!req.body.description ){
    res.status(422).json({
      message: 'description is required'
    })
  } else {
      if(!req.body.notes ){
          res.status(422).json({
              message: 'notes are required'
          })
      } else {
          next()
      }
    
  }

}

const validateProject = (req, res, next) => {
    if (!req.body.name || !req.body.name.trim()){
        res.status(422).json({
            message: 'name is required'
        })
    } else {
        if(!req.body.description){
            res.status(422).json({
                message: 'description is required'
            })
        } else {
            if(req.body.completed === !1 && !0){
                res.status(422).json({
                    message: 'please specify if the project is complete or not'
                })
            } else {
                next()
            }
            }
        }
}

  module.exports = {
      validateActionId, 
      validateAction,
      validateProjectId,
      validateProject
  }