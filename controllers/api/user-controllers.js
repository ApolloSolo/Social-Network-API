const { User } = require("../../models");

const userControllers = {
  async allUsers(req, res) {
    const users = await User.find({});
    if (!users.length) {
      res.json({ message: "Currently, there are no users." });
    }
    res.json(users);
  },

  async newUser({ body }, res) {
    const newUser = await User.create(body);
    if (!newUser) {
      res.status(503).json({ message: "Sorry, this user was not created." });
    }
    res.json(newUser);
  },

  async getUserById({ params }, res) {
    const userData = await User.findOne({ _id: params.id })
      .populate("thoughts")
      .populate("friends")
      .select(["-__v", "-_id", "-email"])
    if (!userData) {
      res.json({ message: "Sorry, we could not find a user by that id." });
    }
    res.json(userData);
  },

  async updateUser({ params, body }, res) {
    const userData = await User.findOneAndUpdate({ _id: params.id }, body, {
      new: true,
    });
    res.json(userData);
  },

  async deleteUser({ params }, res) {
    const userData = await User.findOneAndDelete(
      { _id: params.id },
      { new: true }
    );

    if (!userData) {
      res.json({ message: "Sorry, we could not find a user by that id." });
    }

    res.json(userData);
  },

  async addFriend({ params }, res) {
    const friendData = await User.findOne({ _id: params.friendId });
    const userData = await User.findOneAndUpdate(
      { _id: params.userId },
      { $push: { friends: friendData._id } },
      { new: true }
    ).populate("friends");

    res.json(userData);
  },
};

module.exports = userControllers;
