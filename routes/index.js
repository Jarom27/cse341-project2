const express = require('express')
const router = express.Router()
router.use('/', require('./swagger'))
router.use('/people/', require('./people'))
router.use('/activities/', require('./activities'))
router.get('/', (req, res) => {
    // #swagger.tags = ['Hello']
    res.send("Hello world")
})

module.exports = router