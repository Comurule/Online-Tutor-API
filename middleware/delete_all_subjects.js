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
       
       //move to middleware
        exports.delete_all_subjects= async(req, res, next)=>{
            //taking parameters
            const _id = req.params.category_id;
            try {
                 //get the category name
                const category = await Category.findById(_id)
                    if(!category){throw new Error()}

                //delete subject
                await Subject.deleteMany({schoolCategory:category._id})
                    // if(error){
                    //     throw new Error()
                   console.log('Subjects deleted successfully');
                           next();    
            } catch (error) {
                res.status(400)
                    .send({
                        status: false,
                        message: 'Something went wrong, check the manual.'
                    })
            }
        }