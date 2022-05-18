const router = require("express").Router();
const {
  allUsers,
  getUserById,
  newUser,
  updateUser,
  deleteUser,
  addFriend
} = require("../../controllers/api/user-controllers");

router.route("/")
.get(allUsers)
.post(newUser)

router.route("/:id")
.get(getUserById)
.put(updateUser)
.delete(deleteUser)

router.route("/:userId/friends/:friendId")
.post(addFriend)

module.exports = router;
