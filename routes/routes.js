const router = require ('express').Router();
const Person = require('../controller/auth');
const Admin = require('../controller/admin');
const Tutor = require('../controller/tutor');
const Student = require('../controller/student');
const auth = require('../controller/token');
const userRoutes = require('./userRoutes.js');


//trying tp redirect routes
router.use('/v1', userRoutes);

//default response
router.use('/', (req, res) =>{
    res.send('Welcome to SNOSch--StartNG Online School. Kindly read the manual for guides.');
});

module.exports = router;