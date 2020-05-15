const router = require ('express').Router();
const subjectRoutes = require('./subjectRoutes.js');
const userRoutes = require('./userRoutes.js');
const categoryRoutes = require('./categoryRoutes.js');
const tutorRoutes = require('./tutorRoutes.js');
const lessonRoutes = require('./lessonRoutes.js');

//trying tp redirect routes
router.use('/v1/subjects', subjectRoutes);
router.use('/v1/category', categoryRoutes);
router.use('/v1/tutors', tutorRoutes);
router.use('/v1/lessons', lessonRoutes);
router.use('/v1', userRoutes);

//default response
router.use('/v1', (req, res) =>{
    res.send('Welcome to SNOSch--StartNG Online School. Kindly read the manual for guides.');
});

router.use('/', (req, res) =>{
    res.send('Welcome to SNOSch--StartNG Online School. Kindly read the manual for guides.');
});

module.exports = router;