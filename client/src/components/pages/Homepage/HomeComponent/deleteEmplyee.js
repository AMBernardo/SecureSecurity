import React, { Component } from 'react';
import API from '../../../../utils/API';
import { getFromStorage, setInStorage } from '../../../../utils/storage';
import './style.css';
import SVGIcon from '../../../icons/icons8-remove.svg';
import { Tooltip } from 'reactstrap';
import FalseEntry  from './FalseEntry';
import FlagForm  from './FlagForm';
import CreateEmployee  from './CreateEmployee';



class deleteEmployee extends Component {
	constructor(props) {
		super(props);
		this.state = {
			tooltipOpen: false,
			deleteEmployee: true,
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

  handleFormSubmit = (id) => {
    // const id = this.EmployeeIdData
    // console.log(this.EmployeeIdData)
	API.updateEmplotee(id,{
		UserToken: ''
	})
		.then((res) => {
        this.componentDidMount()
        console.log(res)
		})
		.catch((err) => console.log(err));
};
 deleteEmployeeRender =() => {
	this.setState({
		deleteEmployee: false
	})
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
		if(this.state.deleteEmployee ===false){
			return(
                <CreateEmployee></CreateEmployee>
            )
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
							<h5 className="Employee-Settings ">Employee Settings</h5>
							<button
								type="button"
                                className="btn btn-outline-danger btn-delete"
                                onClick={() => this.deleteEmployeeRender()}
							>
								Leave delete mode
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
																alt="trash"
																className="Flag-icon"
                                                                width="20px"
                                                                onClick={() => this.handleFormSubmit(individual._id)}
															/>
															
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
				</div>
			</div>
		);
	}
}

export default deleteEmployee;
