const router = require ('express').Router();
const Person = require('../controller/auth');
const Admin = require('../controller/admin');
const Tutor = require('../controller/tutor');
const Student = require('../controller/student');


router.post('/v1/register', Person.person.register);
router.post('/v1/login', Person.person.login);
router.get('/v1/category/subject', Person.subject.getAll);
//by name, sorted in alphabetically in ascending order
//by category
router.post('/v1/:category/subject_id', Person.subject.get);
// router.get('/v1/category', Person.category.getAll);
// router.get('/v1/tutors', Person.tutor.getAll);
// //by firstname, sorted alphabetically in ascending order

// //admin roles
// router.post('/v1/:category/subject', Admin.subject.create);
// router.delete('/v1/:category/:subject_id', Admin.subject.delete);
// router.post('/v1/:category/:subject_id', Admin.subject.update);

// router.post('/v1/category', Admin.category.create);
// router.post('/v1/:category', Admin.category.update);
// router.delete('/v1/:category', Admin.category.delete);

// router.post('/v1/lesson', Admin.lesson.create);
// router.get('/v1/lesson', Admin.lesson.getAll);
// router.post('/v1/lesson/:_id', Admin.lesson.get);
// router.post('/v1/lesson/:_id', Admin.lesson.update);
// router.delete('/v1/lesson/_id', Admin.lesson.delete);

// router.get('/v1/tutors', Admin.tutor.getAll);
// router.get('/v1/tutors/:tutor_id', Admin.tutor.get);
// router.get('/v1/tutors', Admin.tutor.update);//for both deactivating and assigning admin status

// //tutor roles
// router.post('/v1/tutors/:username/register', Tutor.subject.register);
// router.get('/v1/tutors/:username/', Tutor.subject.getAll);
// router.post('/v1/tutors/:username/', Tutor.subject.update);
// router.delete('/v1/tutors/:username/', Tutor.subject.delete);

// //students roles
// router.get('/v1/tutors/:subject/', Student.subject.getAll);//in a category
// router.get('/v1/lesson', Student.lesson.create);//copy Admin.lesson.create


//default response
router.get('/v1/', (req, res) =>{
    res.send('Welcome to SNOSch--StartNG Online School. Kindly read the manual for guides.');
});
router.get('/v1/', (req, res) =>{
    res.send('Welcome to SNOSch--StartNG Online School. Kindly read the manual for guides.');
});



module.exports = router;