// const Admin = require('../controller/admin');
const auth = require('../middleware/token');
const Subject = require('../models/subject');
const Category = require('../models/category');
const User = require('../models/user');

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
// This is the file called SubjectController

    exports.create_a_subject = [
        auth.adminAuth,
        (req, res)=>{
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
             }else{console.log(typeof(category.name));
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
                         }else{schoolCategory= category._id;
                                                               
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
                                     message: name + ' created successfully in '+ req.body.category,
                                     subject
                                     })
                                 }).catch(err=> {
                                     console.log (err);
                                     res.status(400)
                                         .send({status: false,
                                             message:''+ err});
                                     });
                         };
                     }else{console.log(schoolCategory);
                         schoolCategory= category._id;
                         
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
                                message: name + ' created successfully in '+ req.body.category,
                                subject
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
        }
    ]
    exports.update_a_subject = [
        auth.AdminTutor,
        (req, res)=>{
         //taking parameters
         const _id = req.params.subject_id;
         const name = req.body.name;
         const schoolCategory = req.body.category;
         const paramsCategory = req.params.category;
          
         //check if subject exists then read
         Subject.findById(_id)
             .then(subject=>{
                 if(!subject){
                     res.status(400)
                         .send({status: false,
                         message: _id + ' does not exist in the database.'})
                 }
                 //remove the subject id from the current category
                 Category.findById(subject.schoolCategory)
                     .then((category)=>{
                         category.subjects = category.subjects.filter(items=> items!=_id)
                         category.save()
                     }).catch(err=> {if(err){
                         console.log(err);
                     }})
             
             //save the subject details to the updated category schema
             Category.findOne({name:schoolCategory})
                 .then((category)=>{
                     if(!category){
                         res.status(400)
                             .send({
                                 status: false,
                                 message: schoolCategory + ' not found in the database.'
                             })
                     }else{
                         console.log((_id));
                         category.subjects.push(subject._id);
                         category.save().catch(err=>{if(err){console.log(err)}})
                         const schoolCategory_id = category._id;

                         //receive update parameters
                         subject.name = (name=='' || !name)?subject.name: name;
                         subject.schoolCategory = (schoolCategory_id =='' || !schoolCategory_id)?subject.schoolCategory: schoolCategory_id;
             
                         //save the update
                         subject.save()
                         .then(
                             res.status(200)
                                 .send({
                                     message: 'Update successful',
                                     subject
                                 }))
                         .catch(err=>{if(err){
                             res.status(400).send(''+err)}})
                     }
                 }).catch(err=> {if(err){
                     res.send(''+err);
                     console.log(err);
                 }})
             })
        }
    ]
    exports.delete_a_subject = [
        auth.AdminTutor,
        async(req, res)=>{
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
                 category.subjects = category.subjects.filter(items=> items != _id)
                  category.save();
             //delete subject
             await Subject.deleteOne({_id: subject._id})
                 // if(error){
                 //     throw new Error()
                 res.status(200)
                     .send({
                         status: true,
                         message: subject.name + ' in '+subject.schoolCategory.name+
                         ' category has been deleted successfully.'
                     })
             }                
         } catch (error) {
             console.log(error);
             res.status(400)
                 .send({
                     status: false,
                     message: 'Something went wrong, check the manual or the console.'
                 })
         }
        }
    ]
    exports.register_a_subject= [
        auth.tutorAuth,
        async(req, res, next)=>{
        try{
            const category = await Category.findOne({name:req.body.category})
            const subjectName = await Subject.findOne({name:req.body.name, schoolCategory:category._id})
                if(!subjectName){throw new Error()}
                console.log(req.user.subjects.filter(items=>items==subjectName._id))
               const subject = subjectName._id;
               const tutor = req.user._id

               //check if the subject has been registered before by same user
               for (let i = 0; i < subjectName.length; i++) {
                   const tutorId = subjectName[i];
                   if(tutor=tutorId){
                       res.status(400)
                        .send({
                            status: false,
                            error: 'You have registered this subject'
                        })
                    }else{
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
                    }
                   
               }
           
                }catch (error) {console.log(error);
                    res.status(400).send({ error: 'Something went wrong, check the manual' })
                }

        }
    ]
    exports.getAll_registered_subjects_by_a_tutor = [
        auth.tutorAuth,
        async(req, res, next)=>{
        const _id = req.params.tutor_id;
        const tutor = await User.findOne({_id:_id, userCategory:'tutor'}).populate('subjects')
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
                        'Registered Subjects': tutor.subjects
                    })
            }

            

        }
    ]
    exports.getAll_subjects = [
        auth.AdminStudent,
        (req,res)=>{
        const sort = req.body.sort;
        switch (sort) {
            case "name:1" :
                Subject.find({}).sort({'name':  1}).populate('schoolCategory')
                    .then(subject=>{
                        res.status(200)
                            .send({
                                message: 'Subjects sorted by name alphabetically in ascending order.',
                                results:{
                                    _id:subject._id,
                                    name:subject.name,
                                    category:subject.schoolCategory,

                                }
                            });
                    })
            
            break;

            case "name:-1" :
                Subject.find({}).sort({'name':  -1}).populate('schoolCategory')
                .then(subject=>{
                    res.status(200)
                    if(subject==''){res.send('no subject registered')}
                    else{
                     res.send({
                            message: 'Subjects sorted by name alphabetically in descending order.',
                            subject
                        });}
                })
            break;

            case "category:1" :
                Subject.find({}).sort({'schoolCategory': 1}).populate('schoolCategory')
                .then(subject=>{
                    res.status(200)
                    if(subject==''){res.send('no subject registered')}
                    else{
                     res.send({
                            message: 'Subjects sorted by category alphabetically.',
                            subject
                        });}
                })
            break;

    
            default:Subject.find({}).populate('schoolCategory')
                .then(subject=>{
                    res.status(200)
                    if(subject==''){res.send('no subject registered')}
                    else{
                     res.json(subject);}
                })
            break;
        };
        }
    ]
    exports.get_subject_byId = [
        async(req,res,next)=>{
                
        const _id = req.params.subject_id;
        try {
            let subject = await Subject.findById(_id)
                if(!subject){
                    console.log(1,'hi');
                    throw new Error()
                }else{
                                                  
                    res.status(200)
                    .send({message: subject.name + ' in '+  category.name + ' category.',
                                    subject})
                
                }

           
                
            
    
        } catch (error) {
            res.status(400).send({ error: 'Something went wrong, check the manual' })
        }
        } 
    ]
