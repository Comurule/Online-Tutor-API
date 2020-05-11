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
            //taking parameters
            const name = (!req.body.name)? errorCount++ : req.body.name;
            let schoolCategory = (!req.body.category)? errorCount++ : req.body.category;
            const paramsCategory = req.params.category;

            //check for errors
            error(res);

              //check if the category exists
              Category.findOne({name:schoolCategory}).then(category=>{
                if(!category){
                    return res.status(400)
                            .send({
                                status: false,
                                message: 'This category does not exist'
                            });
                }else{schoolCategory= category._id;
                     //check if the new subject already exist
                Subject.findOne({name})
                    .then(subject=>{console.log(schoolCategory);
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
                                    .then(()=>{

                                    //save to category
                                    category.subjects.push(subject._id)
                                        category.save();

                                        //responses
                                    res.status(200).send({
                                        status: true,
                                        message: name + ' created successfully in '+ req.body.category
                                        })
                                    }).catch(err=> {
                                        console.log (err);
                                        res.status(400)
                                            .send({status: false,
                                                message:''+ err});
                                        });
                            };
                        }else{console.log(schoolCategory);
                            
                            // save the subject
                       let subject = new Subject({name, schoolCategory});
                           return subject.save()
                               .then(()=>{
                               //save to category
                               category.subjects.push(subject._id)
                                    category.save();

                               //response
                               res.status(200).send({
                                   status: true,
                                   message: name + ' created successfully in '+ req.body.category
                                   })
                                }).catch(err=> {
                                   console.log (err);
                                   res.status(400)
                                       .send({status: false,
                                           message:''+ err});
                                });
                       
                        }
                        
                    });
                }
            })          
                    
                
            
               
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
                   {//remove the subject Id from the current category
                    let initialCategory = await Category.findOne({name:subject.schoolCategory});
                        initialCategory.subjects = initialCategory.subjects.filter(items=>items !== _id)
                            initialCategory.save();

                //receive update parameters
                subject.name=(name=='' || !name)?subject.name: name;
                subject.schoolCategory = (schoolCategory =='' || !schoolCategory)?subject.schoolCategory: schoolCategory;
                
                //save the update
                await subject.save()
                    //save subject to the updated category
                let category = Category.findOne({name:subject.schoolCategory})
                    category.subjects.push(_id);
                    category.save()

                    //response
                res.status(200)
                    .send({
                        status:true,
                        message: 'Update successful',
                        subject
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
                    //delete from category
                    let category = await Category.findOne({name: subject.schoolCategory})
                    category.subjects = category.subjects.filter(items=> items !== _id)
                     category.save();
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
                console.log(error);
                res.status(400)
                    .send({
                        status: false,
                        message: 'Something went wrong, check the manual.'
                    })
            }
        },
        deleteAll: async(req, res, next)=>{
            //taking parameters
            const _id = req.params.category_id;
            try {
                 //get the category name
                const category = await Category.findById(_id)
                    if(!category){throw new Error()}

                //delete subject
                await Subject.deleteMany({schoolCategory:category.name})
                    // if(error){
                    //     throw new Error()
                   console.log('Subjects deleted successfully');
                               
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
                } next();               
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
                const studentUser = await User.findOne({userName: req.body.student, userCategory:'student'})
                    if(!studentUser){console.log(1);throw new Error()}
                    
                    
                const subjectName = await Subject.findOne({name:req.body.subject, schoolCategory: req.body.category})
                    if(!subjectName){console.log(2);throw new Error()}
                        
                    
                const tutorUser = await User.findOne({userName:req.body.tutor, userCategory:'tutor'})
                    if(!tutorUser){console.log(3);throw new Error()}
                        
                // }catch(error){
                //     res.status(400)
                //         .send({
                //             status:false,
                //             message: 'incorrect lesson details: Check the manual.'
                //         })
                // }
           
               //set parameters
               let student = studentUser._id;
               let subject = subjectName._id;
               let schoolCategory = subjectName.schoolCategory;
               let tutor = tutorUser._id;
                    
                //check if the lesson exists
                let testLesson = await Lesson.findOne({student: student, subject:subject, schoolCategory: schoolCategory, tutor:tutor})
                    if(testLesson){
                        return res.status(400)
                                .send({
                                    status: false,
                                    message: 'Booking Failed: Seems you have booked before.'
                                })
                    }
                //save lesson in lesson schema
                let lesson = new Lesson({ student,subject, schoolCategory, tutor});
                
                await lesson.save();

                //save lesson to student schema
                studentUser.lessons = studentUser.lessons.push(lesson._id);
                    await studentUser.save()
                //save lesson to tutor schema
                tutorUser.lessons = tutorUser.lessons.push(lesson._id)
                    await tutorUser.save()

                //response
                res.status(200)
                    .send({
                        status: true,
                        message: 'lesson booked successfully.',
                        lesson
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
                
                const  studentUser =await User.findOne({userName: req.body.student, userCategory:'student'})
                    if(!studentUser){throw new Error()};
                const  subjectName = await Subject.findOne({name: req.body.subject, schoolCategory: req.body.category})
                    if(!subjectName){throw new Error()};
                const  tutorUser = await User.findOne({userName:req.body.tutor, userCategory:'tutor'})
                    if(!tutorUser){throw new Error()};
                   //set parameters
                   let student = studentUser._id;
                   let subject = subjectName._id;
                   let schoolCategory = subjectName.schoolCategory;
                   let tutor = tutorUser._id;


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
                 
             // update parameters validation
             lesson.student = (student == '' || !student)?lesson.student: student;
             lesson.subject = (subject == '' || !subject)?lesson.subject: subject;
             lesson.schoolCategory = (schoolCategory == '' || !schoolCategory)?lesson.schoolCategory: schoolCategory;
             lesson.tutor = (tutor == '' || !tutor)?lesson.tutor: tutor;
             
             console.log(1);
             //save the update
             await lesson.save()
                
                //save update to student 
                //save update to tutor
                //_id kuku no dey change, so it is auto changed

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

                    //delete from student
                    studentUser.lessons = studentUser.lessons.filter(items=>items !==(lesson._id))
                    //delete from tutor
                    tutorUser.lessons = tutorUser.lessons.filter(items=>items !==(lesson._id))

                 //delete lesson
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
            
                

        },
        get:async (req, res, next)=>{
            
            // const category = req.params.category;
            const _id = req.params.lesson_id;
            
                let tutor = await User.find({_id:_id, userCategory: 'tutor'})
                    try{
                        if(!tutor){
                        
                        throw new Error()
                        }else{
                    
                            res.status(200)
                            .send(tutor)
                        }
                    }catch(error) {
                        res.status(400).send({ error: 'Something went wrong: Check the manual.' })
                    }
            
        },
        getAll: async (req, res, next)=>{
            switch (req.params.subject) {
                case (req.params.subject):
                    const name = req.params.subject;
                    try{
                        let subject= await findOne({name}).populate('tutors')
                            if(!subject){throw new Error()}
                        res.status(200)
                            .send({
                                status:true,
                                result: subject.tutors
                            })
                    }catch{
                        res.status(400).send({ error: 'Subject does not exists in the database' })
                    }
                    
                    break;
            
                default:
                    const user= await User.find({userCategory: 'tutor'})
                     res.status(200)
                        .send({
                        status: true,
                        user
                        });
                    break;
            }    
                 
        },
    }
}



module.exports = admin;