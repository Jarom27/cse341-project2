const router = require('express').Router()
const activityController = require('../controllers/activities')

router.get('/', activityController.getActivities)
router.get('/:id', activityController.getActivity)
router.post('/', activityController.addActivity)
router.put('/:id', activityController.updateActivity)
router.delete('/:id', activityController.deleteActivity)
module.exports = router