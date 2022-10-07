const express = require('express')
const router = express.Router()
const { projects } = require('../data')
const { authUser } = require('../basicAuth')
const { canViewProject } = require('../permissions/projects')

router.get('/', (req, res) => {
  res.json(projects)
})

router.get('/:projectId', setProject, authUser, authGetProject, (req, res) => {
  res.json(req.project)
})

function setProject(req, res, next) {
  const projectId = parseInt(req.params.projectId)
  req.project = projects.find(project => project.id === projectId)
  
  if (req.project == null) {
    res.status(404)
    return res.send('Project not found')
  }
  next()
}

const authGetProject = (req, res, next) => {
  if (!canViewProject(req.user, req.project)) {
    return res.status(401).send('Not Allowed')
  }

  next()
}

module.exports = router