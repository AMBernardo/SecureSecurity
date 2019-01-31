import React, {Component} from "react";
// import { Link } from "react-router-dom";
import API from "../../../../utils/API";
import "./style.css";

class CreateEmployee extends Component {

    state = {
        Employee:"",
        fullname: "", 
        dob: "",
        gender: "",
      };
   
 // When the component mounts, load all books and save them to this.state.books
 componentDidMount() {
  this.loadEmployees();
  console.log(this.state.Employee)
}

// Loads all books  and sets them to this.state.books
loadEmployees = () => {

  API.getEmployees()
    .then(res =>
      this.setState({ Employee: res.data, fullname: "", dob: "", gneder: "" })
    )
    .catch(err => console.log(err));
};

    
      handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
          [name]: value
        });
        
      };



      handleFormSubmit = event => {
        event.preventDefault()
        console.log(this.state.fullname) 
        console.log(this.state.dob) 
        console.log(this.state.gender) 
       
       API.saveEmployee({
         name: this.state.fullname,
         dob: this.state.dob,
         gender: this.state.gender
       })
       .then(res => this.loadEmployees())
       .catch(err => console.log(err));
       
      };

      handleEmployeeDelete = id => {
        API.deleteEmployee(id).then(res => this.loadEmployees());
      };
    



    render(){ 
    return (
        <div className="contanier">
     <div className="row">
      <div className="col-2 side-col">

      <h4 className="brand">Secure Security</h4>

      <div className="button-bundle">

      <button type="button" className="btn btn-outline-warning btn1">Home</button>
      <button type="button" className="btn btn-outline-warning btn2">Profile</button>
      <button type="button" className="btn btn-outline-warning btn3">Settings</button>
      </div>
         </div>
         
      <div className="col-4 top-col">
        {this.state.Employee.length ? (
          <ul>
            {this.state.Employee.map(individual => {
              return(
                <li key={individual._id}>
                    <strong>
                      {individual.name}
                      <br />
                      {individual.dob}
                      <br />
                      {individual.gender}
                    </strong>
                    <button className="btn btn-danger" onClick={() => this.deleteEmployee(this.handleEmployeeDelete)}></button>
                </li>
                
              )
            })}
          </ul>
        ) : (
            <h3>nothing here</h3>
        ) }
      </div>
      <div className="col-4 top-col">
      <div className="form-group">
      <input
         className="form-control"
         value={this.state.fullname}
         onChange={this.handleInputChange}
         name="fullname"
         placeholder="First and Last "
      />
      <input
         className="form-control"
         value={this.state.dob}
         onChange={this.handleInputChange}
         name="dob"
         placeholder="Date of birth"
      />
      <input
         className="form-control"
         value={this.state.gender}
         onChange={this.handleInputChange}
         name="gender"
         placeholder="Gender"
      />
    </div>
      <button type="button" 
      className="btn btn-outline-warning btn4" 
      onClick={this.handleFormSubmit}
      disabled={!(this.state.fullname && this.state.dob && this.state.gender)}
      >Submit</button>
      </div>

     </div>
   </div>
    )
    }
    
}

export default CreateEmployee;