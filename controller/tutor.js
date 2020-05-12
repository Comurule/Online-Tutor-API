const User = require('../models/user');
const Subject = require('../models/subject');
const Category = require('../models/category');
const Lesson = require('../models/lesson');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


//error display function
let errorCount=0;
const error= (res)=>{ 
    //check for errors
    console.log(errorCount, 'counts');
    if(errorCount>0){
        res.status(400).send({
            status: false,
            message:"Something is wrong: check manual and fill all form fields."
    });
        errorCount = 0;
        return;

    }
};


let tutor={
    subject: {
        create: async(req, res, next)=>{
            const subjectName = await Subject.findOne({name:req.body.name, schoolCategory:req.body.category})
                if(!subjectName){errorcount++}
               const subject = subjectName._id;
               const tutor = req.user._id
            //save the registration into the subject schema
            subjectName.tutors = subjectName.tutors.push(tutor);
                await subjectName.save(err=>{errorCount++})

            //save to User schema
            req.user.subjects  = req.user.subjects.push(subject)
                await req.user.save(err=>{errorCount++})
                //show error if any
                error(res);

                res.status(200)
                    .send({
                        message: 'Registration Successful',
                        tutor: req.user
                    })

        },
        update: async(req, res, next)=>{

        },
        delete: async(req, res, next)=>{

        },
        getAll: async(req, res, next)=>{
            const _id = req.params.tutor_id;
            const tutor = await User.findOne({_id:_id, userCategory:'tutor'}).populated('subjects')
                if(!tutor){
                    res.status(400)
                        .send({
                            status:false,
                            message: 'Wrong tutor id'
                        })
                }else{
                    res.status(200)
                        .send({
                            status:true,
                            message:'Registered subjects<br/>' +tutor.subjects
                        })
                }

                

        },
    }
};



module.exports = tutor;