const Doctor = require('../../../models/doctor');
const bcrypt = require('bcrypt');
const salt = 10;
const jwt = require('jsonwebtoken');


//Register the doctor in app
module.exports.register = async function (req, res) {
    try {
        const { email, password, confirmPassword, username } = req.body;
        if (password != confirmPassword) {
            return res.status(400).json({
                message: 'password Does not Match',
                data: {},
            });
        }
        //check if user exit or not by given email
        existDoctor = await Doctor.findOne({ email: email });
        //if user found it return user details or return null
        if (existDoctor) {
            return res.status(400).json({
                message: 'User already Exist This Email',
                data: {},
            });
        }
        // using bcrypt
        const hashPassword = bcrypt.hashSync(password, salt);
        const doctor = await Doctor.create({
            username: username,
            email: email,
            password: hashPassword,
        });

        return res.status(200).json({
            success: true,
            message:'Doctor Created Successfully',
            data:{doctor}
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            message:'Oops Something Went Wrong While Doctor Creadted',
            data:err
        });
    }
}

//Doctor Login
module.exports.login = async (req, res) => {
    try {

        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                msg: 'No email or password'
            });
        }

        let doctor = await Doctor.findOne({ email: email });
        if (!doctor) {
            return res.status(401).json({
                success: false,
                msg: "Invalid Username or Password!"
            });
        }

        //using bcrypt
        const isPassword = bcrypt.compareSync(password, doctor.password);
        //compare both credentials
        if (!isPassword) {
            return res.status(400).json({
                message: 'Invalaid Attemts || password Does not match',
                data: {},
            });
        }
        const token = jwt.sign({
            data: { email: doctor.email }
        }, 'secret', { expiresIn: '1h' })

        // Return response
        res.status(200).json({
            success: true,
            data:{token},
            msg: `Log In Sucessful! Keep the Token safely  ${doctor.username}!`
        });

    } catch (error) {
        console.log(error);
        res.status(400).json({
            success: false,
            msg: 'Error Occoured!',
            data:err
        });
    }
}