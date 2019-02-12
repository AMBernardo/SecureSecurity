import React, {Component} from "react";
import { Link } from "react-router-dom";
import "./style.css";
import API from "../../../utils/API";
import{
  getFromStorage,
  setInStorage,
} from '../../../utils/storage'
class SignUp extends Component {

  state = {
    isLoading: true,
    token: "",
    signupError: "",
    companyEmail: "",
    companyName: "",
    companyPassword:  ""
  }

  componentDidMount() {
    const token = getFromStorage('the_main_app')
    if(token) {
      //verify token 
      fetch('/api/account/verify?token=' + token)
        .then(res => res.json())
        .then(json => {
          if(json.success) {
            this.setState({
              token,
              isLoading: false
            });

          } else {
            this.setState({
              isLoading: false 
            })
          }
        })

    } else {
      this.setState({
        isLoading: false,
      })
    }
  }

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
    
  };

  handleFormSubmit = event => {
    
    event.preventDefault()
    this.setState({
      isLoading:true
    });
     
   API.saveUser({
    companyName: this.state.companyName,
    email: this.state.companyEmail,
    password: this.state.companyPassword
   })
   .then(res => res)
   .then(json => {
     console.log(json.data.success)
      if(json.data.success === true) {
          this.handleSignin();
      }else {
        console.log("it didint work")
      }
   })
     .catch(err => console.log(err));
   
  };
  handleSignin()  {
    API.signIN({
      email: this.state.companyEmail,
      password: this.state.companyPassword
     })
     .then(res => res)
     .then(json => {
       console.log(json)
        if(json.data.success) {
          setInStorage('the_main_app', {token: json.data.token})
          
          window.location.assign('https://securesecurity.herokuapp.com/homepage/profile');
        } if (json.data.message) {
          
          this.setState({
            message: json.data.message,
            errorMessages: true
          })
          console.log(`message: ${this.state.message}`)
        } else {
          console.log('ha')
        }
     })
     .catch(err => console.log(err));
    }
  


  render() {
    const{
      isLoading,
      token,
    } = this.state.isLoading

    
    if(!token) {
      return (
        <div className="container shadow-lg p-3 mb-5 signup-contanier">
        <div className="row">
          <div className="col-6">
        <form>
          <div className="form-group ">
               <label >Full Company Name</label>
            <input 
            type="text" 
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
      )
    }
 
  }
}

export default SignUp;
