const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const Schema = mongoose.Schema;

const usersSchema = new Schema({
    name: {
    type: String,
  },
	email: {
    type: String,
    required: true
  },
	password: {
    type: String,
    required: true
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  subjects: {
    type: Array
  },
  lessons: [{
    type: Schema.Types.ObjectId,
    ref: 'Tutor'
  }],
}, {timestamps: true});

userSchema.methods.generateAuthToken = async () => {
    // Generate an auth token for the user
    const user = this;
    const token = jwt.sign({_id: user._id}, 'idmcalculus');
    user.tokens = user.tokens.concat({token});
    await user.save();
    return token;
};

module.exports = mongoose.model( 'Users', usersSchema )






const jwt = require('jsonwebtoken'); 
const User = require('~/models/user');

const auth = async(req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ', '')
    const data = jwt.verify(token, 'idmcalculus')
    try {
        const user = await User.findOne({ _id: data._id, 'tokens.token': token })
        if (!user) {
            throw new Error()
        }         
        req.user = user
        req.token = token
        next()
    } catch (error) {
        res.status(401).send({ error: 'Not authorized to access this resource' })
    }

}
module.exports = auth