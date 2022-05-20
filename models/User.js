const { Schema, model, Types } = require("mongoose");
const Thought = require("./Thought");

const validateEmail = function (email) {
  const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate: [validateEmail, "Please use a valid email address"],
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Thought",
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

UserSchema.post("findOneAndDelete", async function (thought) {
  console.log("These are thoughts: " + thought)
  if (thought) {
    const data = await Thought.deleteMany({ _id: { $in: [thought.thoughts] } });
    console.log("This is data: " + data);
  }
});

UserSchema.virtual("friendCount").get(function () {
  if (this.friends.length > 0) {
    return this.friends.length;
  } else {
    return 0;
  }
});


const User = model("User", UserSchema);

module.exports = User;
