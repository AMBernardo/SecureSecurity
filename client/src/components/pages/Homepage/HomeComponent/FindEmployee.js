
import React , { Component } from 'react';
import "./style.css";
import API from '../../../../utils/API';
// const employee = require("../../../../../../controllers/employeeController");

class FindEmployee extends Component {
    state = {
        namesArray: null,
        inputName: null
      };


    componentDidMount() {
        API.getAllEmployees()
            .then(namesArray => {
                this.setState({namesArray : namesArray.data})
            })
    }

    // matchEmployee() {
    //     let matchedEmp = [];
    //     var employeeName = this.state.inputName;

    //     this.state.namesArray.forEach( (name) => {
    //         let counter = employeeName.length

    //         matchedEmp.push(name)

    //         for( let i =0 ; i < counter; i++) {
    //             if(employeeName[i] !== name[i]){
    //                 matchedEmp.pop();
    //             }
    //         }
    //     })
    //     console.log(matchedEmp);
    // }

    //use matchedEmp to loop thru the employee DB and see if it matches any of the employees
    // checkEmployee(){
    //     API.sendEmployeeNameToDb()
    //     .then(namesArray => {
    //         this.setState({namesArray: namesArray.data})
    //     })
    //     .then(match => {
    //         if(match === this.matchEmployee){
    //             console.log(match);
    //         }
    //     })
    // }

    //if it matches send it to another component

    // filter the nameArray with inputName
    filterEmployee() {
        var currentEmployee = this.state.inputName;
        let filteredEmployee = [];
        
        // filter employees
        this.state.namesArray.forEach( (name) => {
            let counter = currentEmployee.length

            // we push name first
            filteredEmployee.push(name)
            // check each word depending on length of inputName, then pop if letter compared is false
            for( let i = 0; i < counter; i++) {

                // we pop if not we don't have an equal letter
                if(currentEmployee[i] !== name[i]){
                    filteredEmployee.pop()
                }
            }
        })

        console.log(filteredEmployee)
    }

    //sets the current value to what's typed in the form
    handleInputChange = (event) => {

        const { value } = event.target;

		this.setState({
			inputName: value
        }, () => this.filterEmployee() );
        
    };
    

//push found employee data to another component




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
                <button type="button" className="btn btn-warning btn1">
                    {' '}
                    Submit
                </button>
            </div>
        )
    };
}

    export default FindEmployee;
