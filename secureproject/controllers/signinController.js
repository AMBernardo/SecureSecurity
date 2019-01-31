const axios = require("axios");
const user = require("../models");

module.exports = {
userSignin: function (req , res) {
    const { body } = req;

        const {
            companyName,
            password
        } = body;
        let {
            email
        } = body;
    
        if(!companyName) {
            return res.end({
                success: false,
                message: 'Error: Company name: cannot be blank'
            });
        }
        if(!email) {
            return res.end({
                success: false,
                message: 'Error: Email: cannot be blank'
            });
        }
        if(!password) {
            return res.end({
                success: false,
                message: 'Error: Password: name cannot be blank'
            });
        }
        email = email.toLowerCase();
    
   
    
    user.find({
    }, (err, previousUser) => {
        if (err) {
            return res.end({
                success: false,
                message: 'Error: Server Error'
            });
        } else if (previousUser.length > 0) {
            return res.end({
                success: false,
                message: 'Error: Account alredy exist'
            });
        }

        const newUser = new user();

        newUser.companyName = companyName;
        newUser.email = email;
        newUser.password = newUser.generateHash(password);
        newUser.save((err, user) => {
            if (err) {
             return res.end({
                    success: false,
                    message: 'Error: Server Error'
                }); 
            }
             return res.end({
                success: true,
                message: 'Signed up'
            })
        });

    });




}
}