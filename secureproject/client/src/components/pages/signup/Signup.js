import React, {Component} from "react";
import { Link } from "react-router-dom";
import "./style.css";
import API from "../../../utils/API";
class SignUp extends Component {

  state = {
    companyEmail: "",
    companyName: "",
    companyPassword:  ""
  }


  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
    
  };

  handleFormSubmit = event => {
    event.preventDefault()
    console.log(this.state.companyName) 
    console.log(this.state.companyEmail) 
    console.log( this.state.companyPassword) 
     
   API.saveUser({
    companyName: this.state.companyName,
    companyEmail: this.state.companyEmail,
    companyPassword: this.state.companyPassword
   })
   .then(res => console.log((`${this.state.name} ${this.state.email} ${this.state.password} `)))
   .catch(err => console.log(err));
   
  };




  render(){
  return (
    <div className="container shadow-lg p-3 mb-5 signup-contanier">
      <div className="row">
        <div className="col-6">
      <form>
        <div className="form-group ">
             <label >Full Company Name</label>
          <input 
          type="name" 
          className="form-control" 
          id="CompanyName" 
          onChange={this.handleInputChange}
          value={ this.state.companyName} 
          name="companyName" />
             <label>Company Register Email</label>
          <input 
          type="email" 
          className="form-control" 
          id="comanyEmail" 
          onChange={this.handleInputChange}
          value={ this.state.companyEmail} 
          name="companyEmail" />
            <label >Password</label>
          <input 
          type="password" 
          className="form-control" 
          id="companyPassword" 
          onChange={this.handleInputChange}
          value={ this.state.companyPassword} 
          name="companyPassword" />
         
         <button type="button" className="btn btn-warning" onClick={this.handleFormSubmit}>Submit</button>
        </div>


  
        </form>
       </div>
      </div>
    </div>
  );
  }
}

export default SignUp;
