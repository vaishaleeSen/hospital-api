const Patient = require('../../../models/patient');
const Doctor = require('../../../models/doctor');
const Report = require('../../../models/report');

module.exports.create_report = async function (req, res) {
    try {
        const patient = await Patient.findById(req.params.id);
        const doctor = patient.doctor._id;
        console.log("Dr:" + doctor);

        const report = await Report.create({
            doctor: doctor,
            patient: req.params.id,
            status: req.body.status
        });

        return res.status(200).json({
            success: true,
            message:'Report Created ',
            data:report
        });
    }
    catch (err) {
        // Error handling
        return res.status(401).json({
            success: false,
            msg: 'Opps Something Went Wrong While Creating Report Status',
            data:err
        });
    }
}

//find patient with id and send report
module.exports.all_reports = async function (req, res) {
    try {
        const reports = await Report.find({"patient": req.params.id});
        return res.status(200).json({
            success: true,
            message: "Reports fetch succesfully",
            data: {reports},
        });
    }
    catch (err) {
        // Error handling
        return res.status(401).json({
            success: false,
            msg:'Getting error While Fetching All reports',
            data:err
        });
    }

}

//send report by status
module.exports.report_by_status = async (req, res) => {

    try {
        const reports = await Report.find({ "status": req.params.status });
        return res.status(200).json({
            success: true,
            message: "Reports fetch succesfully",
            data: {reports},
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: 'error in reports fetching',
            data:err
        });
    }

}