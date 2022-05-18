const { Schema, model, Types } = require("mongoose");
const moment = require("moment");

const ReactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtVal) => moment(createdAtVal).calendar(),
    },
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

const ThoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtVal) => moment(createdAtVal).calendar(),
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    reactions: [ReactionSchema],
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

const Thought = model("Thought", ThoughtSchema);

module.exports = Thought;
