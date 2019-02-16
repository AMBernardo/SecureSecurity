import React, { Component } from 'react';
import './style.css';
import API from '../../../utils/API';
import { getFromStorage, setInStorage } from '../../../utils/storage';
class SignUp extends Component {
	state = {
		isLoading: false,
		token: '',
		tokenLoaded: false,
		signupError: '',
		companyEmail: '',
		companyName: '',
		companyPassword: ''
	};

	componentDidMount() {
		const obj = getFromStorage('the_main_app');
		if (obj && obj.token) {
			const { token } = obj;
			//verify token
			fetch('/api/account/verify?token=' + token).then((res) => res.json()).then((json) => {
				if (json.success) {
					this.setState({
						token,
						isLoading: false,
						tokenLoaded: true
					});
					console.log(this.state.tokenLoaded);
					window.location.reload();
					window.location.assign('/homepage/profile');
				}
			});
		} else {
			this.setState({
				isLoading: false
			});
		}
	}

	handleInputChange = (event) => {
		const { name, value } = event.target;
		this.setState({
			[name]: value
		});
	};

	handleFormSubmit = (event) => {
		event.preventDefault();
		this.setState({
			isLoading: true
		});

		API.saveUser({
			companyName: this.state.companyName,
			email: this.state.companyEmail,
			password: this.state.companyPassword
		})
			.then((res) => res)
			.then((json) => {
				console.log(json.data.success);
				if (json.data.success === true) {
					this.handleSignin();
				} else {
					console.log('it didint work');
				}
			})
			.catch((err) => console.log(err));
	};
	handleSignin() {
		API.signIN({
			email: this.state.companyEmail,
			password: this.state.companyPassword
		})
			.then((res) => res)
			.then((json) => {
				console.log(json.data);
				if (json.data.success) {
					setInStorage('the_main_app', { token: json.data.token });
					setInStorage('SecureSecruity', { UserToken: json.data.Usertoken });

					window.location.assign('/homepage/profile');
				}
				if (json.data.message) {
					this.setState({
						message: json.data.message,
						errorMessages: true
					});
					console.log(`message: ${this.state.message}`);
				} else {
					console.log('ha');
				}
			})
			.catch((err) => console.log(err));
	}

	render() {
		const { isLoading, token } = this.state.isLoading;
		if (isLoading ===true) {
      return(
			<div className="wrap">
				<div className="loading">
					<div className="bounceball" />
					<div className="text">PLEASE WAIT</div>
				</div>
      </div>
      )
		}
		if (!token) {
			return (
				<div className="container shadow-lg p-3 mb-5 signup-contanier">
					<div className="row">
						<div className="col-12">
							<form>
								<div className="form-group yellow-text">
									<label>Full Company Name</label>
									<input
										type="text"
										className="form-control signup-form1"
										id="CompanyName"
										onChange={this.handleInputChange}
										value={this.state.companyName}
										name="companyName"
									/>
									<label>Company Register Email</label>
									<input
										type="email"
										className="form-control signup-form1"
										id="comanyEmail"
										onChange={this.handleInputChange}
										value={this.state.companyEmail}
										name="companyEmail"
									/>
									<label>Password</label>
									<input
										type="password"
										className="form-control signup-form1"
										id="companyPassword"
										onChange={this.handleInputChange}
										value={this.state.companyPassword}
										name="companyPassword"
									/>

									<button
										type="button"
										className="btn btn-warning signup-btn"
										onClick={this.handleFormSubmit}
										disabled={
											!(
												this.state.companyName &&
												this.state.companyEmail &&
												this.state.companyPassword
											)
										}
									>
										Submit
									</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			);
		}
	}
}

export default SignUp;
