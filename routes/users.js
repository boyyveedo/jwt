const express = require('express');
const router = express.Router();
const { userDashboard, userLogin, userRegister } = require('../controller/users');

router.route('/login').post(userLogin);
router.route('/register').post(userRegister);
router.route('/dashboard').get(userDashboard);

module.exports = router;
