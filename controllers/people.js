const { validationResult } = require('express-validator')
const mongo = require('../database')
const { ObjectId } = require('mongodb')
const getPeople = async function (req, res) {
    //#swagger.tags = ['People']
    try {
        const peopleResult = await mongo.getDatabase().db().collection('people').find()
        peopleResult.toArray().then((people) => {
            res.setHeader("Content-Type", "application/json")
            res.status(200).json(people)
        })
    }
    catch (err) {
        console.error(err.message)
    }



}

const getPerson = async function (req, res) {
    //#swagger.tags = ['People']
    try {
        const personId = new ObjectId(req.params.id)
        const peopleResult = await mongo.getDatabase().db().collection('people').find({ _id: personId })

        // peopleResult.toArray().then((people) => {
        //     res.setHeader("Content-Type", "application/json")
        //     res.status(200).json(people)
        // })
        const data = await peopleResult.toArray()
        res.setHeader("Content-Type", "application/json")
        res.status(200).json(data)
    } catch (err) {
        res.status(404).json({ errors: "Person not found" })
    }

}
const addPerson = async function (req, res) {
    //#swagger.tags = ['People']
    try {
        validationResult(req).throw()
        const isMember = req.body.isMember
        let person = {}
        if (isMember) {
            person = {
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                isMember: isMember,
                ward: req.body.ward,
                stake: req.body.stake,
            }
        }
        else {
            person = {
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                isMember: isMember,
            }
        }
        const personResult = await mongo.getDatabase().db().collection('people').insertOne(person)
        if (personResult.acknowledged) {
            res.status(200).send("The person was sucessfully added into the database")
        }
        else {
            res.status(500).json(personResult.error || "Server error happened while inserting a new person")
        }
    } catch (e) {
        res.status(422).json({ errors: e.mapped() })
    }


}
const updatePerson = async function (req, res) {
    //#swagger.tags = ['People']
    try {
        validationResult(req).throw()
        if (!ObjectId.isValid(req.params.id)) {
            //console.log("Hola es invalido")
            throw Error("Invalid id, please give a valid id")
        }
        else {
            const personId = new ObjectId(req.params.id)
            const isMember = req.body.isMember
            let person = {}

            if (isMember) {
                person = {
                    firstname: req.body.firstname,
                    lastname: req.body.lastname,
                    isMember: isMember,
                    ward: req.body.ward,
                    stake: req.body.stake,
                }
            }
            else {
                person = {
                    firstname: req.body.firstname,
                    lastname: req.body.lastname,
                    isMember: isMember,
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

    } catch (e) {
        //console.log(e)
        res.status(422).json({ errors: e.message })
    }
}
const deletePerson = async function (req, res) {
    //#swagger.tags = ['People']
    try {
        const personId = new ObjectId(req.params.id)
        const personResult = await mongo.getDatabase().db().collection('people').deleteOne({ _id: personId }, true)
        if (personResult.deletedCount > 0) {
            res.status(200).send("The person was successfully deleted")
        }
        else {
            res.status(500).json(personResult.error || "Server error ocurred while deleting the person")
        }
    } catch (err) {
        res.status(404).json({ errors: "not found" })
    }


}
module.exports = { getPeople, getPerson, addPerson, updatePerson, deletePerson }

