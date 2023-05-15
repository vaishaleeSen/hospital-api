const Patient = require('../../../models/patient');
const Report = require('../../../models/report');
const Doctor = require('../../../models/doctor');
module.exports.register = async (req, res) => {
    
    try {
        const { name, phone ,doctor} = req.body; //destructure the name and phone from body
        let patient;
        patient = await Patient.find({phone});
        
        if(phone.length !== 10){
            return res.status(400).json({
                success:false,
                message:'Please enter 10 Digit Number',
                data:{}
            });
        }
        //if there is patient success if not then create
        if (patient.length > 0) {
            return res.status(200).json({
                success: true,
                body: patient[0]
            });
        }


        patient = await Patient.create({
            name,
            phone,
            doctor
        });
        // Return response
        return res.status(201).json({
            success: true,
            data: patient,
            msg: 'Patient Registered Sucessfully!'
        });
    } catch (err) {
        // Error handling
        return res.status(401).json({
            success: false,
            msg: 'Error Occoured!',
            data:err
        });
    }
};

