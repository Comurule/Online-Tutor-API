const router = require ('express').Router();
const {register} = require('../controller/auth');



router.post('/register', register);
router.get('/', (req, res) =>{
    res.send('Welcome to SNOSch--StartNG Online School');
});



module.exports = router;