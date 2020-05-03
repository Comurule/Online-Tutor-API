//Schema for the subjects
const mongoose = require ("mongoose");
const Schema = mongoose.Schema;


const subjectSchema = new Schema({
    subjectName: {
        type: String,
        required: true
    },
    subjectCategory: {
        type: String,
        enum: ['pry1', 'pry2','pry3','pry4','pry5','pry6',
                'jss1', 'jss2', 'jss3', 'sss1', 'sss2', 'sss3'],
        required: true
    }
},{timestamps: true});


module.exports = mongoose.model('Subject', subjectSchema);