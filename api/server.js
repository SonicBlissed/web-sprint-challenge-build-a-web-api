const express = require('express');
const actionRouter = require('./actions/actions-router')
const projectRouter = require('./projects/projects-router')
const server = express();
const helmet = require('helmet')


server.use(express.json());
server.use(helmet());

//insert router below
server.use('/api/actions', actionRouter);
server.use('/api/projects', projectRouter)


server.get('/', (req, res) => {
    res.send(`<h2>Let's finish this sprint!</h2>`);
  });
//eslint-disable-next-line
  server.use((err, req, res, next) => {
    res.status(500).json({
      message: err.message,
      stack: err.stack,
      custom: 'not sure what went wrong, but you done goofed.'
    })
  })
  

// Complete your server here!
// Do NOT `server.listen()` inside this file!

module.exports = server;
