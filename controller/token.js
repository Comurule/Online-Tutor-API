const jwt = require('jsonwebtoken'); 
const User = require('../models/user');

const auth ={
    adminAuth: async(req, res, next) => {
        const token = req.header('Authorization').replace('Bearer ', '')
        const data = jwt.verify(token, "secretkey")
        try {
            const user = await User.findOne({ _id: data._id})
                if(!user || (user.admin !== true)){
                 throw new Error()
                }         
        
                next()
            } catch (error) {
                    res.status(401).send({ error: 'Not authorized to access this resource' })
                }

    },

    tutorAuth: async(req, res, next) => {
        const token = req.header('Authorization').replace('Bearer ', '')
        const data = jwt.verify(token, 'wipe')
        try {
            const user = await User.findOne({ _id: data._id})
                if (!user) {
                 throw new Error()
                }         
        
                next()
            } catch (error) {
                    res.status(401).send({ error: 'Not authorized to access this resource' })
                }

    },
    AdminTutor: async(req, res, next)=>{
        const token = req.header('Authorization').replace('Bearer ', '');
        const data = jwt.verify(token, 'secretkey');
        try {
            const user = await User.findOne({ _id: data._id})                         
                if(!user || (user.userCategory !== 'tutor')){
                    throw new Error()
                } next()
            } catch (error) {
                    res.status(401).send({ error: 'Not authorized to access this resource' })
                }
    },
    AdminStudent: async(req, res, next)=>{
        const token = req.header('Authorization').replace('Bearer ', '');
        const data = jwt.verify(token, 'secretkey');
        try {
            const user = await User.findOne({ _id: data._id})                         
                if(!user || (user.userCategory !== 'tutor') || (user.userCategory == 'tutor' && user.admin !== true)){
                    throw new Error()
                } next()
            } catch (error) {
                    res.status(401).send({ error: 'Not authorized to access this resource' })
                }
    },

}
module.exports = auth