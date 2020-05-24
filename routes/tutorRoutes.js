const router = require('express').Router();
const Tutor = require('../controller/tutorController');
const {
    get_a_tutor,
    update_a_tutor,
    getAll_tutors_by_subject,
    getAll_tutors
} = Tutor;

router.get('/:tutor_id', get_a_tutor);
router.post('/:tutor_id', update_a_tutor);//for both deactivating and assigning admin status
router.get('/subjects/:subject_id', getAll_tutors_by_subject);//in a category
// router.get('/v1/lesson', auth.studentAuth, Admin.lesson.create);//copy Admin.lesson.create

router.get('/', getAll_tutors);
//by firstname, sorted alphabetically in ascending order


module.exports = router;