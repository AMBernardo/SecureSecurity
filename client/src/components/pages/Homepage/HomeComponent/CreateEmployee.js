import React, { Component } from 'react';
import API from '../../../../utils/API';
import { getFromStorage, setInStorage } from '../../../../utils/storage';
import './style.css';
import SVGIcon from '../../../icons/flag.svg';
import { Tooltip } from 'reactstrap';
import FalseEntry  from './FalseEntry';
import FlagForm  from './FlagForm';



class CreateEmployee extends Component {
	constructor(props) {
		super(props);
		this.toggle = this.toggle.bind(this);
		this.state = {
			tooltipOpen: false,
			Employee: [],
			reason: '',
			fullname: '',
			dob: '',
			gender: '',
			token: '',
      falseEntry: false,
      FlagForm: false,
			UserToken: "",
			ID:''
		};
	}
//For Tooltip For Flag......
	toggle() {
		this.setState({
			tooltipOpen: !this.state.tooltipOpen
		});
	}
  // When the component mounts, Loads Employees........ 
  //Verifies if they have a token and  if they dont it will redirect them out of the page...
	componentDidMount() {
    //loads Employees from DB
    this.loadEmployees();
		const obj = getFromStorage('the_main_app');
		if (obj && obj.token) {
			const { token } = obj;
			//verify token
			fetch('/api/account/verify?token=' + token).then((res) => res.json()).then((json) => {
				if (json.success) {
					this.setState({
						token
					});
				}
			});
		} else {
      //false entry renders a diffrent page if they were loged in 
			this.setState({
				falseEntry: true
      });
      //redirects them to the login page in 3sec
			setTimeout(() => {
				window.location.assign('/login');
			}, 3000);
		}
  }
  //LogOut Function to log the user out......
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
  //Load the employees from the DB.......
	loadEmployees = () => {
    //API call to grab Employees form DB
    const TheUser = getFromStorage('SecureSecruity')
    
      const {UserToken} = TheUser
      // console.log(UserToken)
    
    API.getEmployees(UserToken)
      .then((res) => {
				// console.log(res)
				this.setState({
					Employee: res.data,
					fullname: '',
					dob: '',
					gender: '',
				})
				console.log(this.state.Employee)
      }
			)
			.catch((err) => console.log(err));
	};
//For forms.......
	handleInputChange = (event) => {
		const { name, value } = event.target;
		this.setState({
			[name]: value
		});
	};
//Saves Employee that was added
	handleFormSubmit = (event) => {
		event.preventDefault();
    const TheUser = getFromStorage('SecureSecruity')
    
      const {UserToken} = TheUser
      console.log(UserToken)
      
//API call to save the employee to the DB
  console.log(UserToken)
		API.saveEmployee({
			name: this.state.fullname,
			dob: this.state.dob,
      gender: this.state.gender,
      UserToken: UserToken
		})
			.then((res) => this.loadEmployees())
			.catch((err) => console.log(err));
	};
//Broken need to fix
	handleEmployeeDelete = (id) => {
		API.deleteEmployee(id)
		.then((res) => this.loadEmployees())
		.catch(err => console.log(err));
  };
	FlagFormClick = id => {
    this.setState({
			FlagForm: true,
			ID: id
		})
		console.log(id)
		API.getEmployee(id)
		.then(res => console.log(res.data))
		.catch(err => console.log(err));
  }
 

  //render the whole page
	render() {
		const EmployeeIdData = this.state.ID
    if(this.state.FlagForm === true) {
			return(
				<FlagForm EmployeeIdData={EmployeeIdData} ></FlagForm>
			)
    }


		if (this.state.falseEntry === true) {
			return (
				//Renders Diffrent page if they are not logged in
				<div>
				<FalseEntry  />
				</div>
			);
    }
 
		return (
			<div className="contanier">
      
				<div className="row">
					<div className="col-2 side-col">
						<h4 className="brand border-bottom border-warning">Secure Security</h4>
						<div className="form-group Employee-Search">
							<h5 className="Find-employee-search border-bottom border-warning">FIND AN EMPLOYEE</h5>
							<input
								className="form-control Employee-name-control"
								value={this.state.fullName}
								onChange={this.handleInputChange}
								name="fullName"
								placeholder="First and Last "
							/>
							<input
								className="form-control Employee-name-control"
								value={this.state.fullname}
								onChange={this.handleInputChange}
								name="fullname"
								placeholder="First and Last "
							/>
							<input
								className="form-control Employee-name-control"
								value={this.state.fullname}
								onChange={this.handleInputChange}
								name="fullname"
								placeholder="First and Last "
							/>

							<button type="button" className="btn btn-warning btn1">
								{' '}
								Submit
							</button>
						</div>
						<div className="button-bundle">
							<button
								type="button"
								className="btn btn-outline-warning btn3"
								onClick={() => this.logout()}
							>
								Logout
							</button>
						</div>
					</div>

					<div className="col-4 employee-cards">
						<h2 className="employee-text">Employees</h2>
						{this.state.Employee.length ? (
							<div>
								{this.state.Employee.map((individual) => {
									return (
										<div className="card Employee-cards" key={individual._id}>
											<div className="card-body">
												<div className="row">
													<div className="col-6">
														<div className="card-title">
															<h5> {individual.name}</h5>
														</div>
													</div>
													<div className="col-4">
												
													</div>
													<div className="col-2">
														<div>
                            
															<img
																src={SVGIcon}
																alt="Flag"
																className="Flag-icon"
																width="20px"
                                id="TooltipExample"
                                onClick={() => this.FlagFormClick(individual._id)}
															/>
															<Tooltip
																placement="right"
																isOpen={this.state.tooltipOpen}
																target="TooltipExample"
																toggle={this.toggle}
															>
																Red Flag This Employee.
															</Tooltip>
														</div>
													</div>
													<div className="col-12 employee-content">
														<div className="flagged-header">
                              <h5 className="yellow-text">Reason For Being Flagged</h5>
                              <p>{individual.Reason}</p>
														</div>
													</div>
													<div className="col-6 employee-content" />
												</div>
											</div>
										</div>
									);
								})}
							</div>
						) : (
							<h3>Add Your Employees</h3>
						)}
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
								disabled={!(this.state.fullname && this.state.dob && this.state.gender)}
							>
								Submit
							</button>
						</div>
					</div>
					<div className="col-4 Employee-Searched-Card" />
				</div>
			</div>
		);
	}
}

export default CreateEmployee;
