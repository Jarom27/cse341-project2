const mongo = require('../database')
const { ObjectId } = require('mongodb')
const { validationResult } = require('express-validator')
const getActivities = async function (req, res) {
    //#swagger.tags = ['Activities']
    const activitiesResult = await mongo.getDatabase().db().collection('activities').find()
    activitiesResult.toArray().then((activities) => {
        res.setHeader("Content-Type", "application/json")
        res.status(200).json(activities)
    })
}
const getActivity = async function (req, res) {
    //#swagger.tags = ['Activities']
    try {
        if (!ObjectId.isValid()) {
            throw Error("Invalid Id, please give a correct id")
        }
        const activityId = new ObjectId(req.params.id)
        const activitiesResult = await mongo.getDatabase().db().collection('activities').find(activityId)
        const data = await activitiesResult.toArray()
        res.setHeader("Content-Type", "application/json")
        res.status(200).json(data)
    } catch (e) {
        res.status(422).json({ errors: e.message })
    }


}
const addActivity = async function (req, res) {
    //#swagger.tags = ['Activities']
    try {
        validationResult(req).throw()
        const activity = {
            title: req.body.title,
            description: req.body.description,
            date: req.body.date,
            place: req.body.place,
            host: req.body.host,
            organizators: req.body.organizators,
            attendance: req.body.attendance,
        }
        const activitiesResult = await mongo.getDatabase().db().collection('activities').insertOne(activity)
        if (activitiesResult.acknowledged) {
            res.status(200).send("Activity was sucessfully registered")

        }
        else {
            res.status(500).json(activitiesResult.error || "There was an error while inserting a new activity")
        }
    } catch (e) {
        res.status(422).json({ errors: e.mapped() })
    }

}
const updateActivity = async function (req, res) {
    //#swagger.tags = ['Activities']
    try {
        if (!ObjectId.isValid(req.params.id)) {
            throw Error("Invalid id, please give a correct Id")
        }
        const activityId = new ObjectId(req.params.id)
        const activity = {
            title: req.body.title,
            description: req.body.description,
            date: req.body.date,
            place: req.body.place,
            host: req.body.host,
            organizators: req.body.organizators,
            attendance: req.body.attendance,
        }
        const activitiesResult = await mongo.getDatabase().db().collection('activities').replaceOne({ _id: activityId }, activity)
        if (activitiesResult.modifiedCount > 0) {
            res.status(200).send("Activity was sucessfully updating")

        }
        else {
            res.status(500).json(activitiesResult.error || "There was an error while updating the activity")
        }
    } catch (e) {
        res.status(422).json({ errors: e.message })
    }

}
const deleteActivity = async function (req, res) {
    //#swagger.tags = ['Activities']
    try {
        if (!ObjectId.isValid(req.params.id)) {
            throw new Error("Invalid id, please give a correct id")
        }
        const activityId = new ObjectId(req.params.id)
        const activitiesResult = await mongo.getDatabase().db().collection('activities').deleteOne({ _id: activityId }, true)
        if (activitiesResult.deletedCount > 0) {
            res.status(200).send("Activity was sucessfully deleting")

        }
        else {
            res.status(500).json(activitiesResult.error || "There was an error while deleting the activity")
        }
    } catch (e) {
        res.status(422).json({ errors: e.message })
    }

}
module.exports = { getActivities, getActivity, addActivity, updateActivity, deleteActivity }