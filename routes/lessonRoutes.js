const router = require('express').Router();
const Lesson = require('../controller/lessonController');

const {
    get_a_lesson,
    update_a_lesson,
    book_a_lesson,
    getAll_lessons,
    delete_a_lesson
} = Lesson;

router.get('/:lesson_id', get_a_lesson);
router.post('/:lesson_id', update_a_lesson);
router.delete('/:lesson_id', delete_a_lesson);
router.post('/', book_a_lesson);//for both admins and students
router.get('/', getAll_lessons);

module.exports = router;