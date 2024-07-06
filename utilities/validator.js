const { body, check, validationResult } = require('express-validator')
const { ObjectId } = require('mongodb')
const mongo = require('../database')
const peopleValidationRules = () => {
    return [
        body('isMember').isBoolean().notEmpty(),
        body('firstname').isAlpha().notEmpty(),
        body('lastname').isAlpha().notEmpty()
    ]
}

const updatePeopleValidationRules = () => {
    return [
        body('isMember').trim().notEmpty().isBoolean(),
        body('firstname').trim().notEmpty().isAlpha(),
        body('lastname').trim().notEmpty().isAlpha()
    ]
}
const activitiesValidationRules = () => {
    return [
        body("title").escape().trim().notEmpty(),
        body("description").escape().trim().notEmpty(),
        body("date").notEmpty().isDate(),
        body("place").escape().trim().notEmpty(),
        body("host").escape().trim().notEmpty(),
        body("organizators").isArray().default([]),
        body("attendance").isArray().default([])
    ]
}
module.exports = { peopleValidationRules, updatePeopleValidationRules, activitiesValidationRules }