const mongoose = require ("mongoose");
const Schema = mongoose.Schema;

//Schema for the users
const userSchema = new Schema({
    fullName: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password : {
        type: String,
        required: true
    },
    userCategory : {
        type: String,
        enum: ['student', 'tutor'],
        required: true
    },
    schoolCategory : {
        type: String,
        enum: ['pry1', 'pry2','pry3','pry4','pry5','pry6',
                'jss1', 'jss2', 'jss3', 'sss1', 'sss2', 'sss3'],
        required: true
    },
    subjects: {
        type: Array,
    }
    },
    {timestamps: true});


   




module.exports = mongoose.model('User', userSchema);

