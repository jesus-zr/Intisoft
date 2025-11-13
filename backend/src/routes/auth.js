const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/login', authController.loginUser);
router.get('/user/:userId', authController.getUserInfo);
router.post('/forgot-password', authController.forgotPassword);

module.exports = router;
