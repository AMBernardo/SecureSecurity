const mongoose = require("mongoose");
const bcrypt = require("bcrypt")
const Schema = mongoose.Schema;

const userSchema = new Schema({
  companyName : {
      type: String,
      default: ''
  },
  email : {
      type: String,
      default: ''
  },
  password : {
      type: String,
      default: ''
  },
  employee: {
    type: Array,
    default: ""
  },
  isDeleted : {
      type: Boolean,
      default: false
  },

});

userSchema.methods.generateHash =function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8) , null)
};

userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password)
};

const User = mongoose.model("User", userSchema);

module.exports = User;