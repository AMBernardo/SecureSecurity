
import React , { Component } from 'react';
import "./style.css";
import API from '../../../../utils/API';
// import axios from 'axios';
// const employee = require("../../../../../../controllers/employeeController");



class FindEmployee extends Component {
    state = {
        namesArray: null,
        inputName: null
    };


    //scrape all employees from db and send it to namesArray
    componentDidMount() {
        console.log("grabbed")
        API.getAllEmployees()
        
            .then(res => {
                this.setState({namesArray : res.data}) // array of names [mark, shaun, ninja, kira]
                console.log("namesArray log")
                console.log(res.data)
            })
            // .then(() => this.checkEmployee())
            .catch( (err) => console.log(err))
            
        }

    // 1. [mark, shaun, ninja, kira] assume state has been set
    // 2. user types a name on the form then click submit
    // 3. get the value inside the form (name typed) Ex. "Shray"
    // 4. try to see if Shray is in the namesArray state, if yes then get his data into our server, if not in namesarray state then tell him he is not in database ( show error )

    //set form input to current state

    handleInputChange = event => {
        const { value } = event.target;
        this.setState({
          inputName: value
        });      
    };
      

    //compare current state input to all employees on the db
    //if state input matches any employee in the array, push it to another component
    handleFormSubmit = event => {
        event.preventDefault();

        this.state.namesArray.forEach( (name) => {
            if (name === this.state.inputName){
                // api req to database
                API.getOneEmployee()
                //  axios.get(`/api/employee`)
                // axios.get(`/api/employee/ ${this.state.inputName}`)
                .then(res => {
                    console.log("log of found employee")
                    console.log(res)
                })
            } else {
                // sorry user not found
                console.log("employee not found")
            }
        })

    }



    //render the findemployee component
	render() {
        return (
            <div className="form-group Employee-Search">
                <h5 className="Find-employee-search border-bottom border-warning">FIND AN EMPLOYEE</h5>
                    <input
                        className="form-control Employee-name-control"
                        value={this.state.fullname}
                        onChange={this.handleInputChange}
                        name="fullname"
                        placeholder="First and Last "
                        />
                <button type="button" className="btn btn-warning btn1" onClick={this.handleFormSubmit} >
                    {' '}
                    Submit
                </button>
            </div>
        )
    };
}

    export default FindEmployee;
