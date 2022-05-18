const router = require("express").Router();
const { allThoughts, newThought, getThoughtById, addReaction, deleteReaction } = require('../../controllers/api/thought-controllers');

router
.route("/")
.get(allThoughts)

router
.route("/:thoughtId")
.get(getThoughtById)

router
.route("/:userId")
.post(newThought)

router.route('/:thoughtId/reactions')
.post(addReaction)

router.route("/:thoughtId/reactions/:reactionId")
.delete(deleteReaction)

module.exports = router