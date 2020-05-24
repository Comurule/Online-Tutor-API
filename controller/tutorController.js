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

// Move to a new file called TutorController
exports.update_a_tutor = [
    auth.adminAuth,
    async (req, res, next) => {
        const admin = req.body.admin;
        const userCategory = req.body.userCategory;

        const tutor_id = req.params.tutor_id;

        //check if the tutor exists
        User.findOne({ _id: tutor_id, userCategory: 'tutor' })
            .then(user => {
                if (!user) {
                    return res.status(400)
                        .send('Tutor account does not exist')

                } else {
                    user.admin = (admin == '' || !admin) ? user.admin : admin;
                    user.userCategory = (userCategory == '' || !userCategory) ? user.userCategory : userCategory;

                    user.save()
                        .then(() => {
                            res.status(200)
                                .send({
                                    status: true,
                                    message: 'Updated successfully',
                                    user

                                });
                        })
                }
            })
    }
]
exports.get_a_tutor = [
    auth.adminAuth,
    async (req, res) => {
        // const category = req.params.category;
        const _id = req.params.tutor_id;

        let tutor = await User.find({ _id: _id, userCategory: 'tutor' })
        try {
            if (!tutor) {

                throw new Error()
            } else {

                res.status(200)
                    .send(tutor)
            }
        } catch (error) {
            res.status(400).send({ error: 'Something went wrong: Check the manual.' })
        }

    }
]
exports.getAll_tutors_by_subject = [
    auth.studentAuth,
    async (req, res) => {
        switch (req.params.subject) {
            case (req.params.subject):
                const name = req.params.subject;
                try {
                    let subject = await Subject.findOne({ name }).populate('tutors')
                    if (!subject) { throw new Error() }
                    res.status(200)
                        .send({
                            status: true,
                            result: subject.tutors
                        })
                } catch{
                    res.status(400).send({  error: 'Something went wrong. Check the manual' })
                }

                break;

            default:
                const user = await User.find({ userCategory: 'tutor' })
                res.status(200)
                    .send({
                        status: true,
                        user
                    });
                break;
        }
    }
]
exports.getAll_tutors = [
    auth.AdminStudent,
    (req, res, next) => {
        const sort = req.body.sort;
        switch (sort) {
            case "firstName:1":
                User.find({ userCategory: 'tutor' }).sort({ 'firstName': 1 })
                    .then(user => {
                        res.status(200)
                            .send({
                                message: 'Tutors sorted by first name alphabetically in ascending order.',
                                user
                            });
                    })

                break;

            case "firstName:-1":
                User.find({ userCategory: 'tutor' }).sort({ 'firstName': -1 })
                    .then(user => {
                        res.status(200)
                            .send({
                                message: 'Tutors sorted by firstName alphabetically in descending order.',
                                user
                            });
                    })
                break;

            case "category:1":
                User.find({ userCategory: 'tutor' }).sort({ 'schoolCategory': 1 })
                    .then(user => {
                        res.status(200)
                            .send({
                                message: 'Tutors sorted by category alphabetically.',
                                user
                            });
                    })
                break;


            default: User.find({ userCategory: 'tutor' })
                .then(user => {
                    res.status(200)
                        .send(user);
                })
                break;
        }
    }
]