const passport = require('passport');
const passportJwt = require('passport-jwt');
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const Doctor = require('../models/doctor');

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: "secret",
};

passport.use(
    new JwtStrategy(opts, async function (jwt_payload, done) {
        try {
            const user = await Doctor.findOne({ id: jwt_payload.sub }).exec();
            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        } catch (err) {
            console.log("error", err, false);
        }
    })
)