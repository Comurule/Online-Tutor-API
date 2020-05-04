const router = require ('express').Router();
const {register} = require('../controller/auth');
const {login} = require('../controller/auth');


router.post('/register', register);
router.post('/login', login);
router.get('/', (req, res) =>{
    res.send('Welcome to SNOSch--StartNG Online School');
});



module.exports = router;