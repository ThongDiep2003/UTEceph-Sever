'use-strict'
import passport from 'passport';
import localStrategy from 'passport-local';
import doctorServices from '../../services/doctorServices';
import googleStrategy from 'passport-google-oauth2';
const GoogleStrategy = googleStrategy.Strategy;
const LocalStrategy = localStrategy.Strategy;

const { default: logger } = require("../../config/winston");
const { default: authServices } = require("../../services/authServices");

const passportJsVerify = {
  verifyAccount: async (email, password, done) => {
    try {
      const { data, message } = await authServices.login(email,password);
      logger.passport.info(data);
      return done(null, data, message);
    } catch (error) { 
      logger.passport.error(error);
      return done(error)
    }
  },
  authenticate: (req,res,next) => {
    passport.authenticate('local', (error, data, message) => {
      if(error){
        return res.status(500).json({
          message: 'Oops somethings wrong is happen. Please check your account!'
        })
      }
      if(!data){
        return res.status(401).json({
          message: message
        });
      }
      req.data = data;
      req.message = message;
      next();
    })(req, res, next);
  },
  authenticateByGoogle: (req, res, next) => {
    passport.authenticate('google',  {
      scope: ['email', 'profile']
    })(req, res, next);
  },
  authenticateCallback: (req, res, next) => {
    passport.authenticate('google', {
      failureRedirect: `${process.env.BASE_URL_CLIENT}/login?status=error&message=login_with_google_failed`
    },async () => {
      const email = req.userProfile.email;
      const name = req.userProfile.name;
      const { tempPassword } = await doctorServices.findDoctorOrCreateDoctorFromEmailGoogle({
        email: email,
        fullName: name
      })
      res.redirect(`${process.env.BASE_URL_CLIENT}/login?status=ok&email=${email}&accessToken=${tempPassword}`);
    })(req, res, next);
  }
}

export default passportJsVerify;

passport.use(new LocalStrategy({
  usernameField : 'email',
  passwordField : 'password'
}, passportJsVerify.verifyAccount));

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: `${process.env.BASE_URL_SERVER}/v1/auth/google/callback`,
  passReqToCallback: true
},(req,accessToken,refreshToken,profile,done) => {
  const email = profile.email;
  const name = profile.displayName;
  req.userProfile = { email, name, profile };
  return done(null, profile);
}))
