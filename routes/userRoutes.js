const router = require('express').Router();
const User = require('../controller/userController');
const {
    register_a_user,
    login_a_user
} = User;

router.post('/register', register_a_user);
router.post('/login', login_a_user);

module.exports = router;