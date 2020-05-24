const User = require('../models/user');
const Subject = require('../models/subject');
const Category = require('../models/category');
const Lesson = require('../models/lesson');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require('../middleware/token');

//error display function
let errorCount = 0;
const error = (res) => {
    //check for errors
    console.log(errorCount, 'counts');
    if (errorCount > 0) {
        res.status(400).send({
            status: false,
            message: "Something is wrong: check manual and fill all form fields."
        });
        errorCount = 0;
        return;

    }
};
// Move to a new file called LessonController
exports.book_a_lesson = [
    auth.AdminStudent,
    async (req, res, next) => {
        //taking paramters and validating 

        try {
            const studentUser = await User.findOne({ userName: req.body.student, userCategory: 'student' })
            if (!studentUser) { console.log(1); throw new Error() }

            const categoryName = await Category.findOne({ name: req.body.category })
            if (!categoryName) { console.log(4); throw new Error() }

            const subjectName = await Subject.findOne({ name: req.body.subject, schoolCategory: categoryName._id })
            if (!subjectName) { console.log(2); throw new Error() }


            const tutorUser = await User.findOne({ userName: req.body.tutor, userCategory: 'tutor' })
            if (!tutorUser) { console.log(3); throw new Error() }


            //set parameters
            let student = studentUser._id;
            let subject = subjectName._id;
            let schoolCategory = subjectName.schoolCategory;
            let tutor = tutorUser._id;

            //check if the lesson exists
            let testLesson = await Lesson.findOne({ student: student, subject: subject, schoolCategory: schoolCategory, tutor: tutor })
            if (testLesson) {
                return res.status(400)
                    .send({
                        status: false,
                        message: 'Booking Failed: Seems you have booked before.'
                    })
            }
            //save lesson in lesson schema
            let lesson = new Lesson({ student, subject, schoolCategory, tutor });

            await lesson.save();

            //save lesson to student schema
            studentUser.lessons.push(lesson._id);
            await studentUser.save()
            //save lesson to tutor schema
            tutorUser.lessons.push(lesson._id)
            await tutorUser.save()
            //save student to subject schema
            subjectName.students.push(student)
            await subjectName.save()

            //response
            res.status(200)
                .send({
                    status: true,
                    message: 'lesson booked successfully.',
                    lesson
                })



        } catch (error) {
            console.log(error);
            res.status(400)
                .send({
                    status: false,
                    message: 'Something went wrong, check the manual'
                });
        }

    }
]
exports.update_a_lesson = [
    auth.adminAuth,
    async (req, res) => {
        try {
            //taking parameters validation

            const studentUser = await User.findOne({ userName: req.body.student, userCategory: 'student' })
            if (!studentUser) { throw new Error() };
            const categoryName = await Category.findOne({ name: req.body.category })
            if (!categoryName) { throw new Error() }
            const subjectName = await Subject.findOne({ name: req.body.subject, schoolCategory: categoryName._id })
            if (!subjectName) { throw new Error() };
            const tutorUser = await User.findOne({ userName: req.body.tutor, userCategory: 'tutor' })
            if (!tutorUser) { throw new Error() };

            //set parameters
            let student = studentUser._id;
            let subject = subjectName._id;
            let schoolCategory = subjectName.schoolCategory;
            let tutor = tutorUser._id;


            const _id = req.params.lesson_id; console.log(4);

            //check if lesson exists then read
            let lesson = await Lesson.findById(_id)


            if (!lesson) {
                res.status(400)
                    .send({
                        status: false,
                        message: _id + ' does not exist in the database. '
                    })
            }
            console.log(2);

            {
                //delete lesson from current student
                let oldStudent = await User.findById(lesson.student)
                oldStudent.lessons = oldStudent.lessons.filter(items => items != _id)
                await oldStudent.save()
                //delete lesson from current tutor
                let oldTutor = await User.findById(lesson.tutor)
                oldTutor.lessons = oldTutor.lessons.filter(items => items != _id)
                await oldTutor.save()
                //delete student from current subject
                let oldSubject = await Subject.findById(lesson.subject)
                oldSubject.students = oldSubject.students.filter(items => items == (lesson.student))
                await oldSubject.save()


                // update parameters validation
                lesson.student = (student == '' || !student) ? lesson.student : student;
                lesson.subject = (subject == '' || !subject) ? lesson.subject : subject;
                lesson.schoolCategory = (schoolCategory == '' || !schoolCategory) ? lesson.schoolCategory : schoolCategory;
                lesson.tutor = (tutor == '' || !tutor) ? lesson.tutor : tutor;

                console.log(1);
                //save the update
                await lesson.save()


                //save update to student
                studentUser.lessons.push(_id)
                await studentUser.save()

                //save update to tutor
                tutorUser.lessons.push(_id)
                await tutorUser.save()

                //save update student to subject schema
                subjectName.students.push(student)
                await subjectName.save()

                //_id kuku no dey change, so it is auto changed

                res.status(200)
                    .send({
                        status: true,
                        message: 'Update successful',
                        lesson
                    })
            }
        } catch (error) {
            console.log(error);
            res.status(400)
                .send({
                    status: false,
                    message: 'Something went wrong, check the manual.'
                })
        }
    }
]
exports.delete_a_lesson = [
    auth.adminAuth,
    async (req, res, next) => {

        //taking parameters
        const _id = req.params.lesson_id;
        const paramsCategory = req.params.category;

        try {
            //check if subject exists then read
            let lesson = await Lesson.findById(_id)
            if (!lesson) {
                return res.status(400)
                    .send({
                        status: false,
                        message: _id + ' does not exist in the database. '
                    })
            }
            {

                //delete from student
                let studentUser = await User.findById(lesson.student)

                studentUser.lessons = studentUser.lessons.filter(items => items == (lesson._id))
                await studentUser.save()
                //delete from tutor
                let tutorUser = await User.findById(lesson.tutor)
                tutorUser.lessons = tutorUser.lessons.filter(items => items == (lesson._id))
                await tutorUser.save()
                //delete student from subjett schema
                let oldSubject = await Subject.findById(lesson.subject)
                oldSubject.students = oldSubject.students.filter(items => items == (lesson.student))
                await oldSubject.save()

                //delete lesson
                await Lesson.deleteOne({ _id: lesson._id })
                //  if(error){
                //      throw new Error()}


                res.status(200)
                    .send({
                        status: true,
                        message: 'This lesson has been deleted successfully.'
                    })
            }
        } catch (error) {
            console.log(error);
            res.status(400)
                .send({
                    status: false,
                    message: 'Something went wrong, check the manual.'
                })
        }

    }
]
exports.get_a_lesson = [
    auth.adminAuth,
    async (req, res) => {
        const category = req.params.category;
        const _id = req.params.lesson_id;
        try {
            let lesson = await Lesson.findById(_id)
            console.log(41);
            if (!lesson) {
                console.log(44);
                throw new Error()
            } else {
                console.log(42);

                res.status(200)
                    .send(lesson)
            }





        } catch (error) {
            res.status(400).send({ error: 'Something went wrong, check the manual...' })
        }

    }
]
exports.getAll_lessons = [
    auth.adminAuth,
    async (req, res) => {
        Lesson.find().populate('subject')
            .then(lesson => {
                res.status(200)
                    .send({
                        status: true,
                        lesson
                    });
            })

    }
]
