const User = require('../models/user');
const Subject = require('../models/subject');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


let errorCount=0;
//Registration setup
exports.register = (req, res, next) => {
    
    //user profile resources
    const firstName = !(req.body.firstName)? errorCount++:req.body.firstName;
    const lastName = !(req.body.lastName)? errorCount++:req.body.lastName;
    const userName = !(req.body.userName)? errorCount++:req.body.userName;
    const email = !(req.body.email)? errorCount++:req.body.email;
    const password = !(req.body.password)? errorCount++:req.body.password;
    const userCategory = !(req.body.userCategory)? errorCount++ :req.body.userCategory;
    const admin = req.body.admin;    
    const schoolCategory = !(req.body.schoolCategory)? errorCount++ :req.body.schoolCategory;
    const bookedSubjects = req.body.bookedSubjects;
    const assignedSubjects = req.body.assignedSubjects;
    
    
    //check for errors
    console.log(errorCount, 'counts');
    //show error status if error
    if(errorCount>0){
        res.status(400).send({
             status: false,
            message:"All fields are required"
            });
        errorCount = 0;
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
            }else{
        
    //hashes the password before saving
    bcrypt.hash(password, 12)
        .then(password=>{
            let user = new User({firstName, lastName, userName, email, password, userCategory, admin, schoolCategory, bookedSubjects, assignedSubjects});
            return user.save();
            })
        .then(()=>res.status(200).send({
            status: true,
            message: userName + ' registered successfully.'
                }))
        }})
        .catch(err=> {
            res.status(400)
                .send({status: false,
                        message:''+ err});
                });
};

//login setup
exports.login = (req, res, next) =>{
    const userName = !(req.body.userName)? errorCount++:req.body.userName;
    const password = !(req.body.password)? errorCount++:req.body.password;

    //check for errors
    console.log(errorCount, 'counts');
    //show error status if error
    if(errorCount>0){
        res.status(400).send({
            status: false,
            message:"All fields are required"
            });
            errorCount =0;
            return;
    
    }

    //check for user in the database
    User.findOne({userName})
        .then(user => {
            if(!user){return res.status(404)
                            .send('User not found,check for errors or register.');
                    }
            //check if the password is correct
            bcrypt.compare(password, user.password)
                    .then(valid =>{
                        if(!valid){
                            return res.status(403)
                                .send('Incorrect username or password');
                        }
                        //create token for further authorized actions
                        const token = jwt.sign(
                            {username: user.userName, _id: user._id, admin: user.admin},
                                 "secretkey", 
                            {expiresIn: "1h"}
                            );
                        res.status(200)
                            .send({
                                _id: user._id,
                                fullname: user.firstName +' '+user.lastName,
                                username: user.userName,
                                Category: user.userCategory,
                                SchoolLevel: user.schoolCategory,
                                token: token
                            });
                    });          
        }) .catch(err=> {
            res.status(400)
                .send({status: false,
                        message:''+ err});
                });   
};   

