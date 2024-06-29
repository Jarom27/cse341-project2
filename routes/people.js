const router = require('express').Router()
const peopleController = require('../controllers/people')
router.get('/', peopleController.getPeople)
router.get('/:id', peopleController.getPerson)
router.post('/', peopleController.addPerson)
router.put("/:id", peopleController.updatePerson)
router.delete("/:id", peopleController.deletePerson)
module.exports = router