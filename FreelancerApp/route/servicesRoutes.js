const express = require('express');
const servicesRoutes = require('../controllers/services');
const router = express.Router();

router.get('/add', servicesRoutes.getAddServices);
router.get('/userPosts', servicesRoutes.getUserPosts);
router.get('/findServices', servicesRoutes.getFindServices);
router.get('/contactUs', servicesRoutes.getContact);

router.post('/edit', servicesRoutes.getUpdateServices);
router.post('/add', servicesRoutes.postAddServices);
router.post('/editSave', servicesRoutes.postUpdateServices);
router.post('/delete', servicesRoutes.postDeleteServices);
router.post('/getServiceContact', servicesRoutes.getServiceContact);

module.exports = router;