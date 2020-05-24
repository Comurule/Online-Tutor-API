const jwt = require('jsonwebtoken'); 
const User = require('../models/user');

const auth ={
    adminAuth: async(req, res, next) => {
        if((req.header('Authorization')=='') || !(req.header('Authorization'))){
            throw new Error()
            }else{
            const token = req.header('Authorization').replace('Bearer ', '');
            
        
        try {
            const data = jwt.verify(token, "secretkey")
            if(!data){throw new Error()}
            const user = await User.findOne({ _id: data._id})
                if(!user || (user.admin !== true)){
                 throw new Error()
                }         
                req.user = user;
                next()
            } catch (error) {
                    res.status(401).send({ error: 'Not authorized to access this resource' })
                }
            }

    },

    tutorAuth: async(req, res, next) => {
        const token = req.header('Authorization').replace('Bearer ', '')
        
        try {
            const data = jwt.verify(token, 'secretkey')
                if(!data){throw new Error()}
            const user = await User.findOne({ _id: data._id})
                if (!user || (user.userCategory !=='tutor') ) {
                 throw new Error()
                }         
                req.user = user;
                next()
            } catch (error) {
                    res.status(401).send({ error: 'Not authorized to access this resource' })
                }

    },
    studentAuth: async(req, res, next) => {
        const token = req.header('Authorization').replace('Bearer ', '')
        try {
            const data = jwt.verify(token, 'secretkey')
                if(!data){throw new Error()}
            const user = await User.findOne({ _id: data._id})
                if (!user || (user.userCategory !=='student') || (user.admin !== false) ) {
                 throw new Error()
                }         
        
                next()
            } catch (error) {
                    res.status(401).send({ error: 'Not authorized to access this resource' })
                }

    },
    AdminTutor: async(req, res, next)=>{
        const token = req.header('Authorization').replace('Bearer ', '');
        try {
            const data = jwt.verify(token, 'secretkey')
                if(!data){throw new Error()}
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
        
        try {
            const data = jwt.verify(token, 'secretkey')
                if(!data){throw new Error()}
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