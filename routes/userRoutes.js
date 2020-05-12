const router = require ('express').Router();
const Person = require('../controller/auth');
const Admin = require('../controller/admin');
const Tutor = require('../controller/tutor');
const Student = require('../controller/student');
const auth = require('../controller/token');

router.post('/register', Person.person.register);
router.post('/login', Person.person.login);
router.get('/subjects', auth.AdminStudent, Person.subject.getAll);// for both admins and students
//by name, sorted in alphabetically in ascending order
//by category
router.get('/:category/:subject_id', Person.subject.get);
router.get('/category', Person.category.getAll);
router.get('/tutors', auth.AdminStudent, Person.tutor.getAll); 
//by firstname, sorted alphabetically in ascending order

//admin roles
router.post('/subjects', auth.adminAuth, Admin.subject.create);
router.delete('/subjects/:subject_id', auth.AdminTutor, Admin.subject.delete);//for both admin and tutors(tutors can only update regstered subjects)

router.post('/subjects/:subject_id', auth.AdminTutor, Admin.subject.update);//for both admin and tutors(tutors can only update regstered subjects)

router.post('/category', auth.adminAuth, Admin.category.create);
router.post('/category/:category_id', auth.adminAuth, Admin.category.update);
router.delete('/category/:category_id', auth.adminAuth, Admin.category.delete, Admin.subject.deleteAll);

router.post('/lessons',auth.AdminStudent, Admin.lesson.create);//for both admins and students
router.get('/lessons', auth.adminAuth, Admin.lesson.getAll);
router.get('/lessons/:lesson_id', auth.adminAuth, Admin.lesson.get);
router.post('/lessons/:lesson_id', auth.adminAuth, Admin.lesson.update);
router.delete('/lessons/:lesson_id', auth.adminAuth, Admin.lesson.delete);


router.get('/tutors/:tutor_id', auth.adminAuth, Admin.tutor.get);
router.post('/tutors/:tutor_id', auth.adminAuth, Admin.tutor.update);//for both deactivating and assigning admin status
  
// //tutor roles
router.post('/subjects/register',auth.tutorAuth, Tutor.subject.create);
router.get('/subjects/:tutor_id', auth.tutorAuth, Tutor.subject.getAll);
// router.post('/v1/tutors/:subject_id',auth.tutorAuth, Admin.subject.update);//a registered subject
// router.delete('/v1/tutors/:subject_',auth.tutorAuth, Admin.subject.delete);

// //students roles
router.get('/tutors/:subject_id/', auth.studentAuth, Student.subject.getAll);//in a category
// router.get('/v1/lesson', auth.studentAuth, Admin.lesson.create);//copy Admin.lesson.create


//default response
router.get('/', (req, res) =>{
    res.send('Welcome to SNOSch--StartNG Online School. Kindly read the manual for guides.');
});
router.post('/', (req, res) =>{
    res.send('Welcome to SNOSch--StartNG Online School. Kindly read the manual for guides.');
});



module.exports = router;
