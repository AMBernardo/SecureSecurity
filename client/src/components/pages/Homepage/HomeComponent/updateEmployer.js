import React, { Component } from 'react';
import API from '../../../../utils/API';
import { getFromStorage, setInStorage } from '../../../../utils/storage';
import './style.css';
import CreateEmployee  from './CreateEmployee';




class UpdateEmployer extends Component {
	constructor(props) {
		super(props);
	
		this.state = {
            StillWithAnEmployer: false,
			tooltipOpen: false,
            deleteEmployee: false,
            EmployerChange: true,
            UpdateEmployer: [],
			Employee: [],
			reason: '',
			fullname: '',
			dob: '',
			gender: '',
			token: '',
      falseEntry: false,
      FlagForm: false,
			Usertoken: "",
			ID:''
		};
	}
  //Logout Function to log the user out......
	logout() {
		const obj = getFromStorage('the_main_app');
		if (obj && obj.token) {
			const { token } = obj;
			//verify token
			fetch('/api/account/logout?token=' + token).then((res) => res.json()).then((json) => {
				if (json.success) {
					this.setState({
						token: ''
          });
          //set the blank UserSession token into the local storage
          setInStorage('the_main_app', { token: this.state.token });
          setInStorage('SecureSecruity',  {Usertoken: '' });
          //redirct them to the home page
					window.location.assign('/');
				}
			});
		}
  }
  //Saves Employee that was added
  handleFormSubmit = (event) => {
    event.preventDefault();
const TheUser = getFromStorage('SecureSecruity')

  const {UserToken} = TheUser
  console.log(UserToken)
  this.setState({
      Usertoken: UserToken
  })
//API call to save the employee to the DB
API.getEmployeeForupdate({})
    .then((res) => {
        this.setState({
            UpdateEmployer: res.data
        })
        console.log(this.state.UpdateEmployer)
            for (let i = 0; i < this.state.UpdateEmployer.length; i++) {
                const EmployerCheck = this.state.UpdateEmployer[i]
                if(EmployerCheck.UserToken === '') {
                 const FindEmployee = this.state.UpdateEmployer[i]
              
                if(FindEmployee.name === this.state.fullname && FindEmployee.dob === this.state.dob && FindEmployee.gender === this.state.gender){
                    console.log(FindEmployee._id)
                    API.updateEmplotee(FindEmployee._id,{
                        UserToken: UserToken
                    })
                        .then((res) => {
                        console.log(res)
                        
                        })
                        .catch((err) => console.log(err));
                }else{
                    console.log('No record of this person')
                }
            
            }else{
                console.log('Employee still with an employer')
                this.setState({
                    StillWithAnEmployer: true
                })
            }
            }
        
    })
    .catch((err) => console.log(err));
};
  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({
        [name]: value
    });
};
  ChangeEmployer =() => {
    this.setState({
       EmployerChange: false
    })
   }
  //render the whole page
	render() {
        let StillWithAnEmployerShow;
        if(this.state.EmployerChange===false){
            return(
                <CreateEmployee></CreateEmployee>
            )
        }
        if(this.state.StillWithAnEmployer){
            StillWithAnEmployerShow = <h3 className="red-text">Employee still with an employer</h3>
        }
		return (
			<div className="contanier">
      
				<div className="row">
					<div className="col-2 side-col">
						<h4 className="brand border-bottom border-warning">Secure Security</h4>
						<div className="form-group Employee-Search">
						</div>
						<div className="button-bundle">
							<button
								type="button"
								className="btn btn-outline-warning btn3-3"
								onClick={() => this.logout()}
							>
								Logout
							</button>
							{/* <h5 className="Employee-Settings ">Employee Settings</h5> */}
							<button
								type="button"
								className="btn btn-outline-warning btn-delete-2"
								onClick={() => this.ChangeEmployer()}
							>
								Leave Employer Updater
							</button>
						</div>
					</div>
                  
					<div className="col-6 add-employer shadow-lg p-3 mb-5 ">
						<h3 className="employee-header yellow-text">Update Employer</h3>
                        {StillWithAnEmployerShow}
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
									placeholder="Date of birth"
								>
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
							<button
								type="button"
								className="btn btn-outline-warning "
								onClick={this.handleFormSubmit}
								// disabled={!(this.state.fullname && this.state.dob && this.state.gender)}
							>
								Submit
							</button>
						</div>
					</div>
				
				</div>
			</div>
		);
	}
}

export default UpdateEmployer;
