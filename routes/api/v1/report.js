const express = require('express');
const router = express.Router();
const passport = require('passport');
const reportController = require('../../../controller/api/v1/reportController');

router.post('/:id/create_report', passport.authenticate("jwt", { session: false }), reportController.create_report);
router.get('/:status',  reportController.report_by_status);
module.exports = router;