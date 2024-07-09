const router = require('express').Router()
const peopleController = require('../controllers/people')
const { peopleValidationRules, updatePeopleValidationRules } = require('../utilities/validator')
const { isAuthenticated } = require('../middleware/authenticate')

router.get('/', peopleController.getPeople)
router.get('/:id', peopleController.getPerson)
router.post('/', isAuthenticated, peopleValidationRules(), peopleController.addPerson)
router.put("/:id", isAuthenticated, updatePeopleValidationRules(), peopleController.updatePerson)
router.delete("/:id", isAuthenticated, peopleController.deletePerson)
module.exports = router