const User = require('../models/user');
const Subject = require('../models/subject');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//Registration setup
exports.register = (req, res, next) => {
    let errorCount=0; 
   
    //user profile resources
    const fullName = !(req.body.fullName)? errorCount++:req.body.fullName;
    const userName = !(req.body.userName)? errorCount++:req.body.userName;
    const email = !(req.body.email)? errorCount++:req.body.email;
    const password = !(req.body.password)? errorCount++:req.body.password;
    const userCategory = !(req.body.userCategory)? errorCount++ :req.body.userCategory;    
    const schoolCategory = !(req.body.schoolCategory)? errorCount++ :req.body.schoolCategory;
    const subjects = req.body.subjects;
    
    
    //check for errors
    console.log(errorCount, 'counts');
    //show error status if error
    if(errorCount>0){
        res.status(400).send({
             status: false,
            message:"All fields are required"
            });
            return;
    
    }
        //save the user profile
    User.findOne({userName})
        .then(user=>{
            if(user){
                return res.status(423)
                        .send({
                            status: false,
                            message: 'This username already exists.'
                        });
            }
        })
    //hashes the password before saving
    bcrypt.hash(password, 12)
        .then(password=>{
            let user = new User({fullName, userName, email, password, userCategory, schoolCategory, subjects});
            return user.save();
            })
        .then(()=>res.status(200).send({
            status: true,
            message: userName + ' registered successfully.'
        }))
        .catch(err=> {
            res.status(400)
                .send({status: false,
                        message:''+ err});
                });
};

//login setup
exports.login =