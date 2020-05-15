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
        try{
            const category = await Category.findOne({name:req.body.category})
            const subjectName = await Subject.findOne({name:req.body.name, schoolCategory:category._id})
                if(!subjectName){throw new Error()}
                console.log(req.user.subjects.filter(items=>items==subjectName._id))
               const subject = subjectName._id;
               const tutor = req.user._id
            //save the registration into the subject schema
            subjectName.tutors.push(tutor);
                await subjectName.save()

            //save to User schema
             req.user.subjects.push(subject)
                await req.user.save()
                

                res.status(200)
                    .send({
                        message: 'Registration Successful',
                        tutor: req.user
                    })
                }catch (error) {console.log(error);
                    res.status(400).send({ error: 'Something went wrong, check the manual' })
                }

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