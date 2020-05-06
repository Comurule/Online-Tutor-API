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

let admin = {
    subject: {
        create: (req, res) => {
           
           
            //taking parameters
            const name = (!req.body.name)? errorCount++ : req.body.name;
            const schoolCategory = (!req.body.category)? errorCount++ : req.body.category;
            const paramsCategory = req.params.category;

            //check for the correct url
            if(!(schoolCategory === paramsCategory)){
                errorCount++
                //show error status if error
                error(res);
            }else{
                //check if the category exists
            Category.findOne({name:schoolCategory}).then(category=>{
                if(!category){
                    res.status(400)
                        .send({
                            status: false,
                            message: 'This category does not exist'
                        });
                }else{

           
          

                //check if the new subject already exist
                Subject.findOne({name})
                    .then(subject=>{
                        if(subject){
                            
                            if(subject.schoolCategory = schoolCategory){
                            return res.status(423)
                                .send({
                                    status: false,
                                    message: name+ ' already exists in '+ schoolCategory+'.'
                                });
                        }else{
                            // save the subject
                            let subject = new Subject({name, schoolCategory});
                                return subject.save()
                                .then(()=>res.status(200).send({
                                    status: true,
                                    message: name + ' created successfully in '+schoolCategory
                                    })
                                ).catch(err=> {
                                    console.log (err);
                                    res.status(400)
                                        .send({status: false,
                                                message:''+ err});
                                        });
                        };
                    }
                        
                    })
            }
            })}          
        },
        update: (req, res)=>{

        },
        
        get: (req, res)=>{

        },
        getAll: {},
        delete: {},
    },
    

    category: {
        create: (req, res) =>{
            //input variables
            const name = !(req.body.name)? errorCount++:req.body.name;

            //show error, if error
            error(res);

            Category.findOne({name})
                .then(category=>{
                    if(category){
                        return res.status(423)
                            .send({
                                status: false,
                                message: 'This category already exist.'
                            });
                    }else{
                        let category = new Category({name});
                        return category.save()
                        .then(res.status(200).send({
                            status: true,
                            message: name+' category created successfuly.'
                        }));
                    }
                }).catch(err=>{
                    if(err){
                        console.log(err);
                        res.status(400).send({
                            status:false,
                            message: ''+err
                        });
                    }
                });
        }
    }
}



module.exports = admin;