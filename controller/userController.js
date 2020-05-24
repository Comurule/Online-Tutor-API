const User = require('../models/user');
const Category = require('../models/category');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


let errorCount = 0;
const error = (res) => {
    //check for errors
    console.log(errorCount, 'counts');
    if (errorCount > 0) {
        res.status(400).send({
            status: false,
            message: "Something is wrong: check manual and fill all form fields."
        });
        errorCount = 0;
        return;
    }
};

exports.register_a_user = [
    (req, res, next) => {
        //user profile resources
        const firstName = !(req.body.firstName) ? errorCount++ : req.body.firstName;
        const lastName = !(req.body.lastName) ? errorCount++ : req.body.lastName;
        const userName = !(req.body.userName) ? errorCount++ : req.body.userName;
        const email = !(req.body.email) ? errorCount++ : req.body.email;
        const password = !(req.body.password) ? errorCount++ : req.body.password;
        const userCategory = !(req.body.userCategory) ? errorCount++ : req.body.userCategory;
        let subjects;
        let admin = 'false';
        let schoolCategory = !(req.body.schoolCategory) ? errorCount++ : req.body.schoolCategory;
        //check if category exists
        Category.findOne({ name: schoolCategory })
            .then(category => {
                if (!category) {
                    return res.status(400)
                        .send({
                            status: false,
                            message: 'This category does not exist'
                        })
                } else {
                    return schoolCategory = category._id;
                }
            })
        console.log(schoolCategory);
        //check for errors
        console.log(errorCount, 'counts');
        //show error status if error
        if (errorCount > 0) {
            res.status(400).send({
                status: false,
                message: "All fields are required"
            });
            errorCount = 0;
            return;

        }
        //save the user profile
        User.findOne({ userName })
            .then(user => {
                if (user) {
                    return res.status(423)
                        .send({
                            status: false,
                            message: 'This username already exists.'
                        });
                } else {

                    //hashes the password before saving
                    bcrypt.hash(password, 12)
                        .then(password => {
                            let user = new User({ firstName, lastName, userName, email, password, userCategory, admin, schoolCategory });
                            return user.save();
                        })
                        .then(() => res.status(200)
                            .send({
                                status: true,
                                message: userName + ' registered successfully.',
                            })
                        )
                }
            })
            .catch(err => {
                console.log(err);
                res.status(400)
                    .send({
                        status: false,
                        message: '' + err
                    });
            });
    }
]

exports.login_a_user = [
    (req, res, next) => {
        const userName = !(req.body.userName) ? errorCount++ : req.body.userName;
        const password = !(req.body.password) ? errorCount++ : req.body.password;

        //check for errors
        console.log(errorCount, 'counts');
        //show error status if error
        if (errorCount > 0) {
            res.status(400).send({
                status: false,
                message: "All fields are required"
            });
            errorCount = 0;
            return;

        }

        //check for user in the database
        User.findOne({ userName }).populate('schoolCategory')
            .then(user => {
                if (!user) {
                    return res.status(404)
                        .send('User not found,check for errors or register.');
                }
                //check if the password is correct
                bcrypt.compare(password, user.password)
                    .then(valid => {
                        if (!valid) {
                            return res.status(403)
                                .send('Incorrect username or password');
                        }
                        //create token for further authorized actions
                        const token = jwt.sign({ _id: user._id }, "secretkey");


                        res.status(200)
                            .send({
                                message: 'Login successful: Ensure to copy this token key for further authorized activities',
                                _id: user._id,
                                fullname: user.firstName + ' ' + user.lastName,
                                username: user.userName,
                                UserRole: user.userCategory,
                                Category: user.schoolCategory,
                                token: token
                            });
                    });
            }).catch(err => {
                console.log(err);
                res.status(400)
                    .send({
                        status: false,
                        message: '' + err
                    });
            })
    }
]





