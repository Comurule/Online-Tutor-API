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


let student={
    subject:{
        getAll: async (req, res, next)=>{
            try{
                const subject = await Subject.findById(req.params.subject_id).populate('tutors')
                    if(!subject){throw new Error}

                res.status(200)
                    .send({message: 'All registered tutors in '+ subject.name,
                    result: subject.tutors});
            }catch (error) {
                res.status(401).send({ error: 'Something went wrong. Check the manual' })
        }
        }
            
    }
}
module.exports = student;