import React, { Component } from 'react';
import CreatEmployee from './CreateEmployee';
import './style.css';



class FlagForm extends Component {
	constructor(props) {
		super(props);
	
		this.state = {
			tooltipOpen: false,
			Employee: '',
			fullname: '',
			dob: '',
			gender: '',
			token: '',
      falseEntry: false,
      FlagForm: true,
		};
	}

//For forms.......
	handleInputChange = (event) => {
		const { name, value } = event.target;
		this.setState({
			[name]: value
		});
	};

  FlagFormClick = () => {
    this.setState({
      FlagForm: false
    })
    console.log(this.state.FlagForm)
  }

  //render the whole page
	render() {
  if(this.state.FlagForm === false) {
    return (
      <CreatEmployee></CreatEmployee>
    )
  }
		return (
			<div className="contanier">
      
				<div className="row">
					<div className="col-2 side-col">
						<h4 className="brand border-bottom border-warning">Secure Security</h4>
				</div>
         
          <div className="col-6 flag-form">
          <button className="btn btn-warning" onClick={(param) => this.FlagFormClick(param)}></button>
          </div>
			</div>
      </div>
		);
	}
}

export default FlagForm;
