//Schema for the lessons
const mongoose = require ("mongoose");
const Schema = mongoose.Schema;


const lessonSchema = new Schema({
    student: {
        type: Schema.Types.String,
        ref: 'User'
    },
    schoolCategory: {
        type: Schema.Types.String,
        ref: 'Category'
    },
    
    subject: {
        type: Schema.Types.String,
        ref: 'Subject'
        },
    tutor: {
        type: Schema.Types.String,
        ref: 'User'
        },
    
    
},{timestamps: true});


module.exports = mongoose.model('Lesson', lessonSchema);