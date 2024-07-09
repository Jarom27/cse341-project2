const express = require('express')
const passport = require('passport')
const router = express.Router()
router.use('/', require('./swagger'))
router.use('/people/', require('./people'))
router.use('/activities/', require('./activities'))
router.get('/login', passport.authenticate('github'), (req, res) => {

})
router.get('/logout', (req, res, next) => {
    req.logOut(function (err) {
        if (err) { return next(err) }
        res.redirect('/')
    })
})

module.exports = router