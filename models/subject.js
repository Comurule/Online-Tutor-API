//Schema for the subjects
const mongoose = require ("mongoose");
const Schema = mongoose.Schema;


const subjectSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    schoolCategory: {
        type: String,
        enum: ['primary', 'jss', 'sss'],
        required: true
    },
    tutor: [{
        type: Schema.Types.ObjectId,
        ref: 'tutor'
    }],
},{timestamps: true});


module.exports = mongoose.model('Subject', subjectSchema);