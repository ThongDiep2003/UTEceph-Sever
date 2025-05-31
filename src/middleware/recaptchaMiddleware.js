const { default: axios } = require("axios");

const recaptchaMiddleware = {
  verifyRecaptcha: async (req,res,next) => {
    try {
      // với development thì không kiểm tra reCAPTCHA
      if(process.env.NODE_ENV === 'development') {
        next();
      }else{
        const recaptchaToken = req.body.tokenRecaptcha;
        const secretKey = process.env.SECRET_KEY_RECAPTCHA;
        axios({
          method: 'POST',
          url: `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${recaptchaToken}`,
          headers:{"Content-Type": "application/x-www-form-urlencoded; charset=utf-8"}
        }).then(captchaResponse => {
          if(captchaResponse.data.success) {
            next();
          }
          else res.status(500).send(`Error captcha: ${captchaResponse.data['error-codes'][0]}`);
        }).catch(error => {
          if(error.response){
            res.status(500).send(`response is received but error`)
          }else if(error.request){
            res.status(500).send(`no response received from ReCaptcha server`);
          }else{
            res.status(500).send(`Error checking ReCaptcha`);
          }
        })
      }
    } catch (error) {
      res.status(400).json({
        message: error
      })
    }
  }
}

export default recaptchaMiddleware;