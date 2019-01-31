const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSessionSchema = new Schema({
  userId: {
      type: Number,
      default: -1
  },
  timeStamp: {
      type: Date,
      default: Date.now()
  },
  isDeleted: {
      type: Boolean,
      default: false
  }
});

const UserSession = mongoose.model("UserSession", employeeSchema);
 
module.exports = UserSession;