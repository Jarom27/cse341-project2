const express = require('express')
const router = express.Router()

router.use('/people/', require('./people'))
router.get('/', (req, res) => {
    res.send("Hello world")
})

module.exports = router