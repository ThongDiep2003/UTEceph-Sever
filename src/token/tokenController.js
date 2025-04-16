"use-strict";
import jwt from "jsonwebtoken";
import path from "path";
import fs from "fs";

const privateKey = fs.readFileSync(path.join(__dirname, "private.pem"));
const privateKeyRefreshToken = fs.readFileSync(
  path.join(__dirname, "privateRefreshToken.pem")
);

const tokenController = {
  generateAccessToken: (doctor) => {
    return jwt.sign(
      {
        id: doctor.id,
        email: doctor.email,
      },
      privateKey,
      {
        expiresIn: `${process.env.NODE_ENV === "development" ? "15m" : "10m"}`,
        algorithm: "RS512",
      }
    );
  },
  generateRefreshToken: (doctor) => {
    return jwt.sign(
      {
        id: doctor.id,
        email: doctor.email,
      },
      privateKeyRefreshToken,
      {
        expiresIn: "1d",
        algorithm: "RS512",
      }
    );
  },
};

export default tokenController;
