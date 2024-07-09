const router = require('express').Router()
const activityController = require('../controllers/activities')
const { activitiesValidationRules } = require('../utilities/validator')
const { isAuthenticated } = require('../middleware/authenticate')

router.get('/', activityController.getActivities)
router.get('/:id', activityController.getActivity)
router.post('/', isAuthenticated, activitiesValidationRules(), activityController.addActivity)
router.put('/:id', isAuthenticated, activitiesValidationRules(), activityController.updateActivity)
router.delete('/:id', isAuthenticated, activityController.deleteActivity)
module.exports = router