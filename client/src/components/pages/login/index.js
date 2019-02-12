import React, {Component} from "react";
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
    UserToken: "",
    signupError: "",
    companyEmail: "",
    companyName: "",
    companyPassword:  "",
    message: "",
    errorMessages: false,
    
  }

  componentDidMount() {
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
              isLoading: false
            })
             window.location.reload();
             window.location.assign('https://securesecurity.herokuapp.com/homepage/profile');
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
 
   API.signIN({
    email: this.state.companyEmail,
    password: this.state.companyPassword
   })
   .then(res => res)
   .then(json => {
     console.log(json)
      if(json.data.success) {
        setInStorage('the_main_app', {token: json.data.token})
        setInStorage('SecureSecruity', {UserToken: json.data.Usertoken})
        window.location.assign('/homepage/profile');
      } if (json.data) {
        this.setState({
          message: json.data.message,
          errorMessages: true,
          UserToken: json.data.Usertoken
        })
        console.log(`message: ${this.state.message}`)
        console.log(` ${this.state.UserToken}`)
      } else {
        console.log('ha')
      }
   })
   .catch(err => console.log(err));

  };
  


  render(){
    let header;
      if(this.state.errorMessages === true) {
        header = <h1>{this.state.message}</h1>
      }
  
    const{
      errorMessages,
      token,
    } = this.state.isLoading
  
    if(!token) {
      return (
        <div className="container shadow-lg p-3 mb-5 signup-contanier">
        
            <div errorMessages={errorMessages}>
              {header}
            </div>
        <form>
          <div className="form-group ">
             <div /> 
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
           
           <button type="button" className="btn btn-warning signin-btn" onClick={this.handleFormSubmit}>Submit</button>
          </div>
  
  
    
          </form>
         </div>
      
      )
    }
   
  }
}

export default SignUp;
