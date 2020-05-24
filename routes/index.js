const router = require ('express').Router();
const subjectRoutes = require('./subjectRoutes.js');
const userRoutes = require('./userRoutes.js');
const categoryRoutes = require('./categoryRoutes.js');
const tutorRoutes = require('./tutorRoutes.js');
const lessonRoutes = require('./lessonRoutes.js');

//trying tp redirect routes
router.use('/subjects', subjectRoutes);
router.use('/category', categoryRoutes);
router.use('/tutors', tutorRoutes);
router.use('/lessons', lessonRoutes);
router.use('/', userRoutes);

//default response
router.use('/', (req, res) =>{
    res.send('Welcome to SNOSch--StartNG Online School. Kindly read the manual for guides.');
});



module.exports = router;