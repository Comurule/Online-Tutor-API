//Schema for the lessons
const mongoose = require ("mongoose");
const Schema = mongoose.Schema;


const lessonSchema = new Schema({
    student: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
        
    subject: {
        type: Schema.Types.ObjectId,
        ref: 'Subject'
        },
    schoolCategory: {
        type: Schema.Types.ObjectId,
        ref: 'Category'
        },
    tutor: {
        type: Schema.Types.ObjectId,
        ref: 'User'
        },
    
    
},{timestamps: true});


module.exports = mongoose.model('Lesson', lessonSchema);