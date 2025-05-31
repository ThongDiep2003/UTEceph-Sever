import jwt from 'jsonwebtoken';
import path from 'path';
import fs from 'fs';

const parentDir = path.join(__dirname, '..');

const publicKey = fs.readFileSync(path.join(parentDir, './controllers/token/public.pem'));

const middlewareController = {
	verifyToken: (req, res, next) => {
		const token = req.headers.token;
		if (token!==undefined) {
			const accessToken = token.split(' ')[1];
			jwt.verify(accessToken, publicKey, (err, doctor) => {
				if (err) {
					return res.status(403).json({ 
						refreshToken: true,
						message: 'Token is error. Reload window...' 
					});
				}
				req.doctor = doctor;
				next();
			});
		} else {
			return res.status(401).json({ status: "You're not authenticated" });
		}
	}
};

export default middlewareController;
