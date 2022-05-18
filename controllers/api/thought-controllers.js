const { Thought, User } = require("../../models");

const thoughtControllers = {
  async allThoughts(req, res) {
    const thoughts = await Thought.find({});
    res.json(thoughts);
  },

  async newThought({ params, body }, res) {
    const newThought = await Thought.create(body);
    const userData = await User.findOneAndUpdate(
      { _id: params.userId },
      { $push: { thoughts: newThought._id } },
      { new: true }
    );

    newThought.user = userData
    await newThought.save();

    res.send(newThought);
  },

  async getThoughtById({ params }, res) {
    const thoughtData = await Thought.findOne({ _id: params.thoughtId }).populate('user', 'username');
    res.send(thoughtData);
  },
};

module.exports = thoughtControllers;
