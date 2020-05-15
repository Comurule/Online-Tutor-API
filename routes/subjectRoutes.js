const router = require ('express').Router();
const Person = require('../controller/auth');
const Admin = require('../controller/admin');
const Tutor = require('../controller/tutor');
const Student = require('../controller/student');
const auth = require('../controller/token');




router.post('/register', auth.tutorAuth, Tutor.subject.create);
router.get('/:tutor_id', auth.tutorAuth, Tutor.subject.getAll);
// router.post('/v1/tutors/:subject_id',auth.tutorAuth, Admin.subject.update);//a registered subject
// router.delete('/v1/tutors/:subject_',auth.tutorAuth, Admin.subject.delete);


router.delete('/:subject_id', auth.AdminTutor, Admin.subject.delete);//for both admin and tutors(tutors can only update regstered subjects)
router.get('/:subject_id', Person.subject.get);
router.post('/:subject_id', auth.AdminTutor, Admin.subject.update);//for both admin and tutors(tutors can only update regstered subjects)


router.get('/', auth.AdminStudent, Person.subject.getAll);// for both admins and students
//by name, sorted in alphabetically in ascending order
//by category

router.post('/', auth.adminAuth, Admin.subject.create);

module.exports = router;