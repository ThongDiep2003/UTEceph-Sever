'use-strict'
import logger from "../../config/winston";
import db from "../../models";
import useragent from 'useragent';
import path from 'path';
import fs from 'fs';
import NodeRSA from 'node-rsa';

const { default: authServices } = require("../../services/authServices");
const { default: tokenController } = require("../token/tokenController");

const parentDir = path.join(__dirname, '..');

const publicKey = fs.readFileSync(path.join(parentDir, './token/rsaPublicToken.pem'));
const keyPublicToken = new NodeRSA(publicKey);

const authControllers = {
  login: async (req, res) => {
    try {
      const data = req.data;
      const message = req.message;
      await db.RefreshToken.destroy({
        where: {
          idDoctor: data.id
        },
        force: true
      })
      const accessToken = tokenController.generateAccessToken(data);
      const refreshToken = tokenController.generateRefreshToken(data);
      const userAgentString = req.headers['user-agent'];
      const user = useragent.parse(userAgentString);
      await db.RefreshToken.create({
        token: refreshToken,
        idDoctor: data.id,
        nameDevice: user.toString(),
        ipOfDevice: req.ip,
        isActive: true
      });
      // mã hóa token bằng ASE 256 - chưa xong do không thể lưu dữ liệu quá dài vào cookie
      const encryptedAccessToken = keyPublicToken.encrypt(accessToken, 'base64');
      const encryptedRefreshToken = keyPublicToken.encrypt(refreshToken, 'base64');
      res.status(200).json({
        message: message,
        data: {...data,accessToken: accessToken, refreshToken: refreshToken},
      });
    } catch (error) {
      logger.doctor.error(error);
      res.status(500).json({message:'server error'});
    }
  },
  logout: async (req,res) => {
    try {
      const { status, message } = await authServices.logout(req.body.idDoctor,req.body.refreshToken);
      res.status(status).json({
        message: message
      })
    } catch (error) {
      res.status(400).json({
        message: 'server error'
      })
    }
  }
}

export default authControllers;