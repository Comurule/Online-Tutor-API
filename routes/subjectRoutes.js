const router = require ('express').Router();
const Person = require('../controller/auth');
const Admin = require('../controller/admin');
const Tutor = require('../controller/tutor');
const Student = require('../controller/student');
const auth = require('../controller/token');


 const subjectRoutes = router.get('', auth.AdminStudent, Person.subject.getAll);// for both admins and students
//by name, sorted in alphabetically in ascending order
//by category



module.exports = subjectRoutes;