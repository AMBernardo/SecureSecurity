import axios from "axios";

export default {
  // Gets all books
  getEmployees: function() {
    return axios.get("/api/employee");
  },
  // Gets the book with the given id
  getEmployee: function(id) {
    return axios.get("/api/employee/" + id);
  },
  // Deletes the book with the given id
  deleteEmployee: function(id) {
    return axios.delete("/api/employee/" + id);
  },
  // Saves a book to the database
  saveEmployee: function(employeeData) {
    return axios.post("/api/employee", employeeData);
  },
  
};