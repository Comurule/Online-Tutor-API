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
        create: (req, res,next) => {
            const token = req.header('Authorization').replace('Bearer ', '');
            const data = jwt.verify(token, 'secretkey');

            const user = User.findOne({ _id: data._id})
                .then(user => {
                    if(!user || (user.admin !== true)){
                        res.status(401)
                            .send('Access denied')
               
                    }
                })
                    {
                        //taking parameters
            const name = (!req.body.name)? errorCount++ : req.body.name;
            const schoolCategory = (!req.body.category)? errorCount++ : req.body.category;
            const paramsCategory = req.params.category;

              //check if the category exists
              Category.findOne({name:schoolCategory}).then(category=>{
                if(!category){
                    return res.status(400)
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
                        
                    });
                }
            })
                    }          
                    
                
            
               
        },
        update: async(req, res,next)=>{
            //taking parameters
            const _id = req.params.subject_id;
            const name = req.body.name;
            const schoolCategory = req.body.category;
            const paramsCategory = req.params.category;
            try {
                   //check if subject exists then read
                let subject = await Subject.findById(_id)
                    
                    if(!subject){
                        res.status(400)
                            .send({status:false,
                                message: _id + ' does not exist in the database. '})
                    }
                   {
                //receive update parameters
                subject.name=(name=='' || !name)?subject.name: name;
                subject.schoolCategory = (schoolCategory =='' || !schoolCategory)?subject.schoolCategory: schoolCategory;
                
                //save the update
                await subject.save()
                    // if(error) {
                    //     console.log(2);
                    //     throw new Error()
                    // } 
                res.status(200)
                    .send({
                        status:true,
                        message: 'Update successful',
                        subject
                    })
                }
            } catch (error) {
                res.status(400)
                    .send({
                        status: false,
                        message: 'Something went wrong, check the manual.'
                    })
            }
         

        },
        
        delete: async(req, res, next)=>{
            //taking parameters
            const _id = req.params.subject_id;
            const paramsCategory = req.params.category;
            try {
                   //check if subject exists then read
                let subject = await Subject.findById(_id)
                    if(!subject){
                        res.status(400)
                            .send({status:false,
                                message: _id + ' does not exist in the database. '})
                    }
                   {
                //delete subject
                await Subject.deleteOne({_id: subject._id})
                    // if(error){
                    //     throw new Error()
                    res.status(200)
                        .send({
                            status: true,
                            message: subject.name + ' in '+subject.schoolCategory+
                            ' category has been deleted successfully.'
                        })
                }                
            } catch (error) {
                res.status(400)
                    .send({
                        status: false,
                        message: 'Something went wrong, check the manual.'
                    })
            }
        },
        
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
        },
        update: async(req, res, next)=>{
            //taking parameters
            const  name= req.body.name;
            const _id= req.params.category_id;

            try {
                //check if category exists then read
             let category = await Category.findById(_id)
                 
                 if(!category){
                     res.status(400)
                         .send({status:false,
                             message: _id + ' does not exist in the database. '})
                 }
                {
             //receive update parameters
             category.name=(name=='' || !name)?category.name: name;
             
             
             //save the update
             await category.save()
                 // if(error) {
                 //     console.log(2);
                 //     throw new Error()
                 // } 
             res.status(200)
                 .send({
                     status:true,
                     message: 'Update successful',
                     category
                 })
             }
         } catch (error) {
             res.status(400)
                 .send({
                     status: false,
                     message: 'Something went wrong, check the manual.'
                 })
         }
        },
        delete: async(req, res, next)=>{
            //taking parameters
            const _id = req.params.category_id;
            const paramsCategory = req.params.category;
            try {
                   //check if subject exists then read
                let category = await Category.findById(_id)
                    if(!category){
                        res.status(400)
                            .send({status:false,
                                message: _id + ' does not exist in the database. '})
                    }
                   {
                //delete subject
                await Category.deleteOne({_id: category._id})
                    // if(error){
                    //     throw new Error()
                    res.status(200)
                        .send({
                            status: true,
                            message: category.name + ' category has been deleted successfully.'
                        })
                }                
            } catch (error) {
                res.status(400)
                    .send({
                        status: false,
                        message: 'Something went wrong, check the manual.'
                    })
            }
        }
    },

    lesson: {
        create: async(req, res, next)=> {
            //taking paramters and validating 
            try {
                const studentUser = await User.findOne({userName: req.body.studentUserName, userCategory:'student'})
                    if(!studentUser){console.log(1);throw new Error()}
                    
                    
                const subjectName = await Subject.findOne({name:req.body.subject, schoolCategory: req.body.category})
                    if(!subjectName){console.log(2);throw new Error()}
                        
                    
                const tutorUser = await User.findOne({userName:req.body.tutorUserName, userCategory:'tutor'})
                    if(!tutorUser){console.log(3);throw new Error()}
                        
                // }catch(error){
                //     res.status(400)
                //         .send({
                //             status:false,
                //             message: 'incorrect lesson details: Check the manual.'
                //         })
                // }
            
                
                
           
                let student = req.body.studentUserName;
                let subject = req.body.subject;
                let schoolCategory = req.body.category;
                let tutor = req.body.tutorUserName;
                    
                //check if the lesson exists
                let testLesson = await Lesson.find({student: student, subject:subject, schoolCategory: schoolCategory, tutor:tutor})
                    if(testLesson){
                        return res.status(400)
                                .send({
                                    status: false,
                                    message: 'Booking Failed: Seems you have booked before.'
                                })
                    }
                //save lesson
                
                let lesson = new Lesson({ student,subject, schoolCategory, tutor});
                
                await lesson.save();
                       
                //response
                res.status(200)
                    .send({
                        status: true,
                        message: 'lesson booked successfully.'
                    })
                
               
            }catch(error){
                res.status(400)
                    .send({
                        status:false,
                        message: 'Something went wrong, check the manual'
                    });
            }
            
        },
        update: async(req, res, next)=>{
            try {
                //taking parameters validation
                
                const  studentUser =await User.findOne({userName: req.body.studentUserName, userCategory:'student'})
                    if(!studentUser){throw new Error()};
                const  subjectName = await Subject.findOne({name: req.body.subject, schoolCategory: req.body.category})
                    if(!subjectName){throw new Error()};
                const  tutorUser = await User.findOne({userName:req.body.tutorUserName, userCategory:'tutor'})
                    if(!tutorUser){throw new Error()};
                
                const _id= req.params.lesson_id;console.log(4);

                //check if lesson exists then read
                let lesson = await Lesson.findById(_id)
                console.log(3);
                 
                     if(!lesson){
                         res.status(400)
                             .send({status:false,
                                 message: _id + ' does not exist in the database. '})
                     }
                     console.log(2);
                
                {
                    //set parameters
                let student = req.body.studentUserName;
                let subject = req.body.subject;
                let schoolCategory = req.body.category;
                let tutor = req.body.tutorUserName;
             // update parameters validation
             lesson.student = (student == '' || !student)?lesson.student: student;
             lesson.subject = (subject == '' || !subject)?lesson.subject: subject;
             lesson.schoolCategory = (schoolCategory == '' || !schoolCategory)?lesson.schoolCategory: schoolCategory;
             lesson.tutor = (tutor == '' || !tutor)?lesson.tutor: tutor;
             
             console.log(1);
             //save the update
             await lesson.save()
                 // if(error) {
                 //     console.log(2);
                 //     throw new Error()
                 // } 
             res.status(200)
                 .send({
                     status:true,
                     message: 'Update successful',
                     lesson
                 })
             }
            } catch (error) {
                res.status(400)
                    .send({
                        status: false,
                        message: 'Something went wrong, check the manual.'
                    })
                }
        },
        delete: async(req, res, next)=>{
            console.log(1);
             //taking parameters
             const _id = req.params.lesson_id;
             const paramsCategory = req.params.category;
                
             try {
                    //check if subject exists then read
                 let lesson = await Lesson.findById(_id)
                     if(!lesson){
                         return res.status(400)
                             .send({status:false,
                                 message: _id + ' does not exist in the database. '})
                     }
                    {
                 //delete subject
                 await Lesson.deleteOne({_id: lesson._id})
                    //  if(error){
                    //      throw new Error()}
                     res.status(200)
                         .send({
                             status: true,
                             message: 'This lesson has been deleted successfully.'
                         })
                 }                
             } catch (error) {
                 console.log(error);
                 res.status(400)
                     .send({
                         status: false,
                         message: 'Something went wrong, check the manual.'
                     })
             }
         
        },
        get: async(req, res, next)=>{
            // const category = req.params.category;
            const _id = req.params.lesson_id;
            try {
                let lesson = await Lesson.findById(_id)
                    if(!lesson){
                        console.log(1,'hi');
                        throw new Error()
                    }else{
                    
                        res.status(200)
                        .send(lesson)
                    }

               
                    
                
        
            } catch (error) {
                res.status(400).send({ error: 'Something went wrong, check the manual' })
            }
         
        },
        getAll: async(req, res, next)=>{
            const token = req.header('Authorization').replace('Bearer ', '');
            const data = jwt.verify(token, 'secretkey');
            
            const user = User.findOne({ _id: data._id})
                .then(user => {
                   
                    if(!user || (user.admin !== true)){
                        return res.status(401)
                            .send('Access denied')
               
                    }else{
                        Lesson.find()
                        .then(lesson=>{
                            res.status(200)
                                .send({
                                    status: true,
                                    lesson
                    });
                        })

                    }
                })

            
        },
    },
    tutor: {
        update: (req, res, next)=>{
            const token = req.header('Authorization').replace('Bearer ', '');
            const data = jwt.verify(token, 'secretkey');
            
            User.findOne({ _id: data._id})
                .then(user => {
                    
                   
                    if(!user || (user.admin !== true)){
                        return res.status(401)
                            .send('Access denied')
               
                    }else{
                        const admin = req.body.admin;
                        const userCategory = req.body.userCategory;

                        const tutor_id = req.params.tutor_id;
                        
                        //check if the tutor exists
                        User.findOne({_id: tutor_id, userCategory: userCategory})
                            .then(user=>{
                                if(!user){
                                    return res.status(400)
                                        .send('Tutor account does not exist')

                                }else{
                                    user.admin = admin;
                                    user.userCategory = userCategory;

                                    user.save()
                                .then(()=>{
                                    res.status(200)
                                        .send({
                                            status:true,
                                            message: 'Update Successful',
                                            user
                                            
                                        });
                                })
                                 


                            }
                            })
                    }
                })

        },
        get: (req, res, next)=>{
            const token = req.header('Authorization').replace('Bearer ', '');
            const data = jwt.verify(token, 'secretkey');
            
            const user = User.findOne({ _id: data._id})
                .then(user => {
                    
                   
                    if(!user || (user.admin !== true)){
                        return res.status(401)
                            .send('Access denied')
               
                    }else{
            // const category = req.params.category;
            const _id = req.params.lesson_id;
            
                let tutor = User.find({_id:_id, userCategory: 'tutor'})
                    if(!tutor){
                        console.log(1,'hi');
                        throw new Error()
                    }else{
                    
                        res.status(200)
                        .send(tutor)
                    }
                }
            })
        },
        getAll: (req, res, next)=>{
            const token = req.header('Authorization').replace('Bearer ', '');
            const data = jwt.verify(token, 'secretkey');
            
            const user = User.findOne({ _id: data._id})
                .then(user => {
                    
                   
                    if(!user || (user.admin !== true)){
                        return res.status(401)
                            .send('Access denied')
               
                    }else{
                        User.find({userCategory: 'tutor'})
                        .then(user=>{ console.log(1);
                            res.status(200)
                                .send({
                                    status: true,
                                    user
                    });
                        })

                    }
                })

        },
    }
}



module.exports = admin;