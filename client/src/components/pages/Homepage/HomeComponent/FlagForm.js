import React, { Component } from 'react';
import API from '../../../../utils/API';
import CreatEmployee from './CreateEmployee';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import './style.css';



class FlagForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			FlagForm: true,
			reason: '',
			Flagged: false,
			modal: false,
			showExtra: false,
			
		};
		this.toggle = this.toggle.bind(this);
	}

	toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
	}
	
componentDidMount =() => {
	console.log(this.props.EmployeeIdData)
}
//For forms.......
handleInputChange = event => {
	const { name, value } = event.target;
	this.setState({
		[name]: value
	});
};
handleFormSubmit = (event) => {
	console.log(this.state.reason)
	const id = this.props.EmployeeIdData
	API.updateEmplotee(id,{
		Reason: this.state.reason,
	})
		.then((res) => {
		console.log(res)
		this.setState({
			Flagged: true
		})
		})
		.catch((err) => console.log(err));
};

  FlagFormClick = () => {
    this.setState({
			FlagForm: false,
			show: true
    })
    console.log(this.state.FlagForm)
  }

  //render the whole page
	render() {
	let showText;
	
	if(this.state.showExtra === true){
		 showText = <h2>Thank You!</h2>
	}else {
		showText = <h3>Are you sure you want to flag this employee? </h3>
	}
	
  if(this.state.FlagForm === false) {
		
			return (
				<CreatEmployee></CreatEmployee>
			)
		
    
	}
		return (
			<div className="contanier">
			   <div>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle} className="yellow-text">Warning Please Read!!</ModalHeader>
          <ModalBody>
						{showText}
          </ModalBody>
          <ModalFooter>
            <Button color="warning" onClick={() => this.handleFormSubmit() > this.setState({showExtra: true, FlagForm: false})} >Submit</Button>{' '}
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
				<div className="row">
					<div className="col-2 side-col">
						<h4 className="brand border-bottom border-warning">Secure Security</h4>
						<button className="btn btn-warning go-back-btn " onClick={() =>  this.setState({FlagForm: false}) }>Go Back</button>
          
				</div>
			
          <div className="col-6 flag-form">
					<input
								className="form-control flag-reason-form"
								value={this.state.reason}
                onChange={this.handleInputChange}
                name="reason"
                placeholder="Reason "
							/>

          <button className="btn btn-warning submit-btn " onClick={() => this.handleFormSubmit() > this.setState({modal: true}) }>SUBMIT</button>
          
        
          </div>
			</div>
      </div>
		);
	}
}

export default FlagForm;
