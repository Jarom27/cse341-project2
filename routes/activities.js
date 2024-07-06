const router = require('express').Router()
const activityController = require('../controllers/activities')
const { activitiesValidationRules } = require('../utilities/validator')
router.get('/', activityController.getActivities)
router.get('/:id', activityController.getActivity)
router.post('/', activitiesValidationRules(), activityController.addActivity)
router.put('/:id', activitiesValidationRules(), activityController.updateActivity)
router.delete('/:id', activityController.deleteActivity)
module.exports = router