import React, {Component} from "react";
// import { Link } from "react-router-dom";
import API from "../../../../utils/API";
import{
  getFromStorage,
  setInStorage
} from '../../../../utils/storage'
import "./style.css";

class CreateEmployee extends Component {

    state = {
        Employee:"",
        fullname: "", 
        dob: "",
        gender: "",
        token:"",
        falseEntry: false,
        showEmployees: true
      };
   
 // When the component mounts, load all books and save them to this.state.books
 componentDidMount() {
   this.loadEmployees();
  const obj = getFromStorage('the_main_app')
  if(obj && obj.token) {
    const {token} =obj
    //verify token 
    fetch('/api/account/verify?token=' + token)
      .then(res => res.json())
      .then(json => {
        if(json.success) {
         
          this.setState({
            token,
          })
        } 
      })
  } else {
    this.setState({
      falseEntry: true
    })
    setTimeout(() => {
      window.location.assign('http://localhost:3000/login');
    }, 3000);
    
  }
}
 logout() {
  const obj = getFromStorage('the_main_app')
  if(obj && obj.token) {
    const {token} =obj
    //verify token 
    fetch('/api/account/logout?token=' + token)
      .then(res => res.json())
      .then(json => {
        if(json.success) {
          this.setState({
            token: ''
          })
          setInStorage('the_main_app', {token: this.state.token})
          window.location.assign('http://localhost:3000');
        } 
      })
  } 
}

// Loads all books  and sets them to this.state.books
loadEmployees = () => {

  API.getEmployees()
    .then(res =>
      this.setState({ 
        Employee: res.data, 
        fullname: "", 
        dob: "", 
        gneder: "" ,
        showEmployees: true
      })
    
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
      let employeeModal;
      if(this.state.showEmployees === false) {
        
      }

      if(this.state.falseEntry === true) {
        return(
          <div>
            <h1>You MUSt be logged In to Veiw this page</h1>
            <p>redircting.......</p>
          </div>
        )
      }
    return (
        <div className="contanier">
     <div className="row">
      <div className="col-2 side-col">
        {employeeModal}
      <h4 className="brand">Secure Security</h4>

      <div className="button-bundle">

      <button type="button" className="btn btn-outline-warning btn1">Home</button>
      <button type="button" className="btn btn-outline-warning btn2">Profile</button>
      <button type="button" className="btn btn-outline-warning btn3">Settings</button>

      <button type="button" className="btn btn-outline-warning btn3" onClick={() => this.logout()}>Logout</button>
      </div>
         </div>
         
      <div className="col-4 employee-cards">
      <h2 className="employee-text">Employees</h2>
        {this.state.Employee.length ? (
         <div>
            {this.state.Employee.map(individual => {
              return(
               <div className="card card-space shadow p-1 mb-4 bg-dark rounded"  key={individual._id}>
                <div className="card-header">
               <h5> {individual.name}</h5>
                </div>
                  <div className="card-body">
                    <div className="row">
                      <div className="col-6">
                        <h6>DOB: {individual.dob}</h6>
                      </div>
                      <div className="col-6">
                        <h6>Gender: {individual.gender}</h6>
                      </div>
                      <div className="col-12">
                        <h6>Header</h6>
                        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. At ratione, voluptas sapiente odio nam illum asperiores aliquid reprehenderit quas possimus! Nisi optio provident labore commodi! 
                          Excepturi odit necessitatibus totam debitis!</p>
                      </div>
                    </div>
                 
                  </div>
               </div>
                
              )
            })}
          </div>
        ) : (
            <h3>Add Your Employees</h3>
        ) }
      </div>
      <div className="col-3 add-employee shadow-lg p-3 mb-5 ">
      <h3 className="employee-header">Add A Employee</h3>
      <div className="form-group add-employee-form">
      <input
         className="form-control name-control"
         value={this.state.fullname}
         onChange={this.handleInputChange}
         name="fullname"
         placeholder="First and Last "
      />
      <div className="form-group">
      <select
       
         className="form-control name-control"
         value={this.state.gender}
         onChange={this.handleInputChange}
         name="gender"
         placeholder="Date of birth">
        <option>Male</option>
        <option>Female</option>
        <option>Other</option>
        </select>
        </div>
      <input
         className="form-control name-control"
         value={this.state.dob}
         onChange={this.handleInputChange}
         name="dob"
         placeholder="Date of Birth"
      />
     <button type="button" 
      className="btn btn-outline-warning " 
      onClick={this.handleFormSubmit}
      disabled={!(this.state.fullname && this.state.dob && this.state.gender)}
      >Submit</button>
  
         </div>
       </div>
     </div>
   </div>
    )
    }
    
}

export default CreateEmployee;