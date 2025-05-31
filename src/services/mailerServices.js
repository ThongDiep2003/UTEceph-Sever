"use strict";
import nodeMailer from "nodemailer";
import mailConfig from "../config/mail.config";

const mailerServices = {
  sendMail: (receivedMail, htmlContent, linkVerify) => {
    return new Promise(async (resolve, reject) => {
      try {
        const transport = nodeMailer.createTransport({
          host: mailConfig.optionMail.HOST,
          port: mailConfig.optionMail.PORT,
          secure: false,
          auth: {
            user: mailConfig.optionMail.USERNAME,
            pass: mailConfig.optionMail.PASSWORD,
          },
        });

        const options = {
          from: mailConfig.optionMail.FROM_ADDRESS,
          to: receivedMail,
          subject: mailConfig.optionMail.SUBJECT,
          html: htmlContent(linkVerify),
        };

        const sendMail = await transport.sendMail(options);
        if (sendMail) {
          resolve(sendMail);
        }
      } catch (error) {
        reject(error);
      }
    });
  },
};

export default mailerServices;
