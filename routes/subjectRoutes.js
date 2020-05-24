const router = require ('express').Router();
const Subject = require('../controller/subjectController');
const {
    create_a_subject,
    update_a_subject,
    delete_a_subject,
    register_a_subject,
    getAll_registered_subjects_by_a_tutor,
    getAll_subjects,
    get_subject_byId
} = Subject;

router.post('/register', register_a_subject);
router.get('/tutors/:tutor_id', getAll_registered_subjects_by_a_tutor);
// router.post('/v1/tutors/:subject_id',auth.tutorAuth, Admin.subject.update);//a registered subject
// router.delete('/v1/tutors/:subject_',auth.tutorAuth, Admin.subject.delete);


router.delete('/:subject_id', delete_a_subject);//for both admin and tutors(tutors can only update regstered subjects)
router.get('/:subject_id', get_subject_byId);
router.post('/:subject_id', update_a_subject);//for both admin and tutors(tutors can only update regstered subjects)


router.get('/', getAll_subjects);// for both admins and students
//by name, sorted in alphabetically in ascending order
//by category

router.post('/', create_a_subject);

module.exports = router; 