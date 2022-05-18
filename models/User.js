const { Schema, model } = require("mongoose");

const validateEmail = function (email) {
  const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};

const UserSchema = new Schema({
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
  },
  thoughts: [
    {
      type: Schema.Types.ObjectId,
      ref: "Thought"
    }
  ]
});

const User = model("User", UserSchema);

module.exports = User;