const router = require("express").Router();
const {
  allUsers,
  getUserById,
  newUser,
  updateUser,
  deleteUser
} = require("../../controllers/api/user-controllers");

router.route("/")
.get(allUsers)
.post(newUser)

router.route("/:id")
.get(getUserById)
.put(updateUser)
.delete(deleteUser)

module.exports = router;
