const router = require ('express').Router();
const Person = require('../controller/auth');
const Admin = require('../controller/admin');

const Student = require('../controller/student');
const auth = require('../controller/token');

router.get('/:tutor_id', auth.adminAuth, Admin.tutor.get);
router.post('/:tutor_id', auth.adminAuth, Admin.tutor.update);//for both deactivating and assigning admin status
router.get('/:subject_id/', auth.studentAuth, Student.subject.getAll);//in a category
// router.get('/v1/lesson', auth.studentAuth, Admin.lesson.create);//copy Admin.lesson.create

router.get('/', auth.AdminStudent, Person.tutor.getAll);
//by firstname, sorted alphabetically in ascending order


module.exports = router;