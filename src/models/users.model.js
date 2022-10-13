const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  lastName: {
    type: String,
    lowercase: true,
    require: true
  },
  firstName: {
    type: String,
    lowercase: true,
    require: true
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
    minlenght: 4,
    unique: true,
  },
  subscription: {
    type: Schema.Types.ObjectId, ref:"Subscription"
},
  created: {
    type: Date,
    default: Date.now()
  },
  resetToken: String,
  image: String
});
module.exports = mongoose.model("User", userSchema);
