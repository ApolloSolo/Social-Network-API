const router = require("express").Router();
const { allThoughts, newThought, getThoughtById } = require('../../controllers/api/thought-controllers');

router
.route("/")
.get(allThoughts)

router
.route("/:thoughtId")
.get(getThoughtById)

router
.route("/:userId")
.post(newThought)

module.exports = router