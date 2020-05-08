const router = require ('express').Router();
const Person = require('../controller/auth');
const Admin = require('../controller/admin');
const Tutor = require('../controller/tutor');
const Student = require('../controller/student');
const auth = require('../controller/token');

router.post('/v1/register', Person.person.register);
router.post('/v1/login', Person.person.login);
router.get('/v1/subjects', auth.AdminStudent, Person.subject.getAll);// for both admins and students
//by name, sorted in alphabetically in ascending order
//by category
router.get('/v1/:category/:subject_id', Person.subject.get);
router.get('/v1/category', Person.category.getAll);
router.get('/v1/tutors', auth.AdminStudent, Person.tutor.getAll); 
//by firstname, sorted alphabetically in ascending order

//admin roles
router.post('/v1/subjects', auth.adminAuth, Admin.subject.create);
router.delete('/v1/subjects/:subject_id', auth.AdminTutor, Admin.subject.delete);//for both admin and tutors(tutors can only update regstered subjects)

router.post('/v1/subjects/:subject_id', auth.AdminTutor, Admin.subject.update);//for both admin and tutors(tutors can only update regstered subjects)

router.post('/v1/category', auth.adminAuth, Admin.category.create);
router.post('/v1/category/:category_id', auth.adminAuth, Admin.category.update);
router.delete('/v1/category/:category_id', auth.adminAuth, Admin.category.delete);

router.post('/v1/lessons',auth.AdminStudent, Admin.lesson.create);//for both admins and students
router.get('/v1/lessons', auth.adminAuth, Admin.lesson.getAll);
router.get('/v1/lessons/:lesson_id', auth.adminAuth, Admin.lesson.get);
router.post('/v1/lessons/:lesson_id', auth.adminAuth, Admin.lesson.update);
router.delete('/v1/lessons/:lesson_id', auth.adminAuth, Admin.lesson.delete);


router.get('/v1/tutors/:tutor_id', auth.adminAuth, Admin.tutor.get);
router.post('/v1/tutors/:tutor_id', auth.adminAuth, Admin.tutor.update);//for both deactivating and assigning admin status
  
// //tutor roles
// router.post('/v1/subjects  /register', Tutor.subject.create);
// router.get('/v1/subjects/:tutor_id', Tutor.subject.getAll);
// router.post('/v1/tutors/:username', Admin.subject.update);//a registered subject
// router.delete('/v1/tutors/:username', Admin.subject.delete);

// //students roles
// router.get('/v1/tutors/:subject_id/', Student.subject.getAll);//in a category
// router.get('/v1/lesson', Admin.lesson.create);//copy Admin.lesson.create


//default response
router.get('/', (req, res) =>{
    res.send('Welcome to SNOSch--StartNG Online School. Kindly read the manual for guides.');
});
router.post('/', (req, res) =>{
    res.send('Welcome to SNOSch--StartNG Online School. Kindly read the manual for guides.');
});



module.exports = router;
