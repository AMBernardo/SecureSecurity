const mongoose = require("mongoose");
const Employer = require('./user')
const Schema = mongoose.Schema;

const employeeSchema = new Schema({
  name: { type: String, required: true },
  dob: { type: String, required: true },
  gender: { type: String, required: true },
});


employeeSchema.associate = function(models) {
  employeeSchema.belongsTo(models.Employer.employee, {
    foreignKey: {
      allowNull:false
    }
  })

}

const Employee = mongoose.model("Employee", employeeSchema);

module.exports = Employee;