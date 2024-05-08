const express = require("express")
const { createPerson, deletePerson, getAllPersons, getPersonById, updatePerson } = require("../controllers/userController")
const router = express.Router()

router.get("/", getAllPersons)
router.get("/:id", getPersonById)
router.post("/", createPerson)
router.put("/:id", updatePerson)
router.delete("/:id", deletePerson)

module.exports = router