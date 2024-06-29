const mongo = require('../database')
const { ObjectId } = require('mongodb')
const getPeople = async function (req, res) {
    //#swagger.tags = ['People']
    const peopleResult = await mongo.getDatabase().db().collection('people').find()
    peopleResult.toArray().then((people) => {
        res.setHeader("Content-Type", "application/json")
        res.status(200).json(people)
    })
}

const getPerson = async function (req, res) {
    //#swagger.tags = ['People']
    const personId = new ObjectId(req.params.id)
    const peopleResult = await mongo.getDatabase().db().collection('people').find({ _id: personId })
    peopleResult.toArray().then((people) => {
        res.setHeader("Content-Type", "application/json")
        res.status(200).json(people)
    })

}
const addPerson = async function (req, res) {
    //#swagger.tags = ['People']
    const isMember = req.body.isMember
    const person = {}
    if (isMember) {
        person = {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            member: isMember,
            ward: req.body.ward,
            stake: req.body.stake,
        }
    }
    else {
        person = {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            member: isMember,
        }
    }
    const personResult = await mongo.getDatabase().db().collection('people').insertOne(person)
    if (personResult.acknowledged) {
        res.status(200).send("The person was sucessfully added into the database")
    }
    else {
        res.status(500).json(personResult.error || "Server error happened while inserting a new person")
    }
}
const updatePerson = async function (req, res) {
    //#swagger.tags = ['People']
    const personId = new ObjectId(req.params.id)
    const isMember = req.body.isMember
    const person = {}

    if (isMember) {
        person = {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            member: isMember,
            ward: req.body.ward,
            stake: req.body.stake,
        }
    }
    else {
        person = {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            member: isMember,
        }
    }
    const personResult = await mongo.getDatabase().db().collection('people').replaceOne({ _id: personId }, person)
    if (personResult.modifiedCount > 0) {
        res.status(200).send("The person was successfully updated")
    }
    else {
        res.status(500).json(personResult.error || "Server error ocurred while updating the user")
    }
}
const deletePerson = async function (req, res) {
    //#swagger.tags = ['People']
    const personId = new ObjectId(req.params.id)
    const personResult = await mongo.getDatabase().db().collection('people').deleteOne({ _id: personId }, true)
    if (personResult.deletedCount > 0) {
        res.status(200).send("The person was successfully deleted")
    }
    else {
        res.status(500).json(personResult.error || "Server error ocurred while deleting the person")
    }
}
module.exports = { getPeople, getPerson, addPerson, updatePerson, deletePerson }

