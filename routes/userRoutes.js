const router = require('express').Router();
const Person = require('../controller/auth');


router.post('/register', Person.person.register);
router.post('/login', Person.person.login);

module.exports = router;
