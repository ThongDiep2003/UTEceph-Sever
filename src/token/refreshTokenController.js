'use-strict'
const db = require("../../models");
const { default: tokenController } = require("./tokenController");
import jwt from 'jsonwebtoken';
import logger from '../../config/winston';
import path from 'path';
import fs from 'fs';

const publicKeyRefreshToken = fs.readFileSync(path.join(__dirname, 'publicRefreshToken.pem'));

const refreshTokenController = async (req,res) => {
  try {
    const refreshToken = req.body.refreshToken;
    if (!refreshToken) {
      return res.status(401).json("You're not authenticated");
    }
    const refreshTokenExist = await db.RefreshToken.findOne({
      where: { token: refreshToken, isActive: true },
      raw: true,
    });
    if (refreshTokenExist === null) {
      logger.token.error(refreshTokenExist);
      return res.status(403).json('Refresh token is not valid');
    }
    jwt.verify(refreshToken, publicKeyRefreshToken, async (err, doctor) => {
      try {
        if (err) {
          await db.RefreshToken.destroy({ where: { token: refreshToken } });
          return res.status(403).json('Refresh token is not valid');
        }else{
          // create new access token và refresh token
          const newAccessToken = tokenController.generateAccessToken(doctor);
          const newRefreshToken = tokenController.generateRefreshToken(doctor);

          await db.RefreshToken.update({
            token: newRefreshToken,
            timeRefresh: refreshTokenExist.timeRefresh+1
          },{
            where: {
              idDoctor: doctor.id,
              token: refreshToken,
              isActive: true
            }
          });

          res.status(200).json({
            newAccessToken: newAccessToken,
            newRefreshToken: newRefreshToken,
            message: 'refresh token successfully'
          });
        }
      } catch (error) {
        logger.token.error(error);
        res.status(500).json({
          message: 'server error'
        });
      }
    });
  } catch (error) {
    logger.token.error(error);
    res.status(500).json({
      message: 'server error'
    });
  }
}

export default refreshTokenController;