const express = require('express');
const router = express.Router();
const passport = require('passport');
const patientController = require('../../../controller/api/v1/patientController');
const reportController = require('../../../controller/api/v1/reportController');

router.post('/register',passport.authenticate("jwt", { session: false }), patientController.register);


 //- /patients/:id/create_report
router.post('/:id/createReport',passport.authenticate("jwt", { session: false }),reportController.create_report);
router.get('/:id/allReports',  reportController.all_reports);

module.exports = router;