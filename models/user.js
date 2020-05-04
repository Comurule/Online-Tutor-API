const mongoose = require ("mongoose");
const Schema = mongoose.Schema;

//Schema for the users
const userSchema = new Schema(
    {
    firstName: {
        type: String,
        required: true
    },
    lastName: {
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
    admin:{
        type: Boolean,
        default: false,
    },
    schoolCategory : {
        type: String,
        enum: ['primary', 'jss', 'sss'],
        required: true
    },
    bookedSubjects: [{
        type: Schema.Types.ObjectId,
        ref: 'Subject'
    }],
    assignedSubjects:[{
        type: Schema.Types.ObjectId,
        ref: 'Subject'
    }],
},
    {timestamps: true}
);


   




module.exports = mongoose.model('User', userSchema);

