import axios from "axios";

export default {
  // Gets all books
  getEmployees: function(UserToken) {
    return axios.get(`/api/employee/ ${UserToken}`);
  },
  // Gets the book with the given id
  getEmployee: function() {
    return axios.get("/api/employee/" );
  },
  // Deletes the book with the given id
  deleteEmployee: function(id) {
    return axios.delete("/api/employee/" + id);
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