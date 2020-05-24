const User = require('../models/user');
const Subject = require('../models/subject');
const Category = require('../models/category');
const Lesson = require('../models/lesson');
const auth = require('../middleware/token');
const Delete_all_subjects = require('../middleware/delete_all_subjects');

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

// Make a new file CategoryController
    exports.create_a_category = [
        auth.adminAuth,
        (req, res)=>{
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
    ]
    exports.update_a_category = [
        auth.adminAuth,
        async(req, res)=>{
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
     }
    ]

    exports.delete_a_category = [
        auth.adminAuth,
        Delete_all_subjects.delete_all_subjects,
        async(req, res)=>{
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
    ]
    exports.getAll_categories = [
        async(req, res, next) => {
                try {
                    let category = await Category.find().populate('subjects')
                        if(!category){throw new Error()}

                    res.status(200)
                        .send({
                            message: 'All categories and the subjects under them',
                            category
                        })
                }catch (error) {
                        res.status(401).send({ error: 'Something went wrong. Check the manual' })
                }
            
        }
    ]
