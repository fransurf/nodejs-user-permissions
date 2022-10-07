const { ROLE } = require('../data')

export const canViewProject = (user, project) => {
  return (user.role === ROLE.ADMIN || project.userId === user.id)
}