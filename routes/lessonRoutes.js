const router = require('express').Router();

const Admin = require('../controller/admin');

const auth = require('../controller/token');



router.get('/:lesson_id', auth.adminAuth, Admin.lesson.get);
router.post('/:lesson_id', auth.adminAuth, Admin.lesson.update);
router.delete('/:lesson_id', auth.adminAuth, Admin.lesson.delete);
router.post('/', auth.AdminStudent, Admin.lesson.create);//for both admins and students
router.get('/', auth.adminAuth, Admin.lesson.getAll);


module.exports = router;