const express = require('express');
const worksRoutes = require('../controllers/works');
const router = express.Router();

router.get('/findJobs', worksRoutes.getFindJobs);
router.get('/jobDetails', worksRoutes.getJobDetails);
router.get('/addJobs', worksRoutes.getAddJobs);


router.post('/jobDetails', worksRoutes.getJobDetails);
router.post('/updateJobs', worksRoutes.getUpdateJobs);
router.post('/update', worksRoutes.postUpdateJobs);
router.post('/addJobs', worksRoutes.postAddjobs);
router.post('/editJobs', worksRoutes.getJobDetails);
router.post('/bidInfo', worksRoutes.postBidInfo);
router.post('/deleteJobs', worksRoutes.postDeleteJobs);



module.exports = router;