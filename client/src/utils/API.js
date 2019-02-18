import axios from "axios";

export default {
  // Gets Employees for each user
  getEmployees: function(UserToken) {
    return axios.get(`/api/employee/ ${UserToken}`);
  },
  // Gets Employee to update new employer
  getEmployeeForupdate: function(employeeData) {
    return axios.get("/api/employee" , employeeData);
  },
  // Gets the book with the given id
  getEmployee: function(id,name,dob) {
    return axios.get(`/api/employee/find/ ${id}`);
  },
  // Gets the book with the given id
  updateEmplotee: function(id ,employeeData) {
    return axios.put("/api/employee/find/" + id, employeeData);
  },
  // Deletes the book with the given id
  deleteEmployee: function(id, employeeData) {
    return axios.delete("/api/employee/" + id , employeeData);
  },
  saveEmployee: function(employeeData) {
    return axios.post("/api/employee", employeeData);
  },
  saveUser: function(employeeData) {
    return axios.post("/api/account/signup", employeeData);
  },
  saveUser: function(employeeData) {
    return axios.post("/api/account/signup", employeeData);
  },
  signIN: function(employeeData) {
    return axios.post("/api/account/signin", employeeData);
  },

  
};