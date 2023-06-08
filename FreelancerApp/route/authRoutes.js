const express = require('express');
const authRoutes = require('../controllers/auth');

const router = express.Router();

router.get('/', (req, res, next) => {
    res.redirect('/Home');
});

router.get('/Home', authRoutes.getIndex);

router.post('/register', authRoutes.postRegister);

router.get('/register', authRoutes.getRegister);

router.post('/login', authRoutes.postLogin);

router.get('/login', authRoutes.getLogin);

router.get('/changepassword', authRoutes.getChangePwd);

router.post('/changepassword', authRoutes.postChangePwd);

router.get('/logout', authRoutes.getLogout);


module.exports = router;