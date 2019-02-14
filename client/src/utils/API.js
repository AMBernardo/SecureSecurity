import axios from "axios";

export default {
  // Gets all books
  getEmployees: function(UserToken) {
    return axios.get(`/api/employee/ ${UserToken}`);
  },
  // Gets the book with the given id
  getEmployee: function(id) {
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
  // Saves a book to the database
  saveEmployee: function(employeeData) {
    return axios.post("/api/employee", employeeData);
  },
  saveUser: function(employeeData) {
    return axios.post("/api/account/signup", employeeData);
  },
  signIN: function(employeeData) {
    return axios.post("/api/account/signin", employeeData);
  },

  
};