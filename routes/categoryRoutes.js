const router = require ('express').Router();
const Person = require('../controller/auth');
const Admin = require('../controller/admin');
const Tutor = require('../controller/tutor');
const Student = require('../controller/student');
const auth = require('../controller/token');


router.post('/:category_id', auth.adminAuth, Admin.category.update);
router.delete('/:category_id', auth.adminAuth, Admin.subject.deleteAll, Admin.category.delete);
router.get('/', Person.category.getAll);
router.post('/', auth.adminAuth, Admin.category.create);



module.exports =router;