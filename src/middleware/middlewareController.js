import jwt from 'jsonwebtoken';
const middlewareController = {
	verifyToken: (req, res, next) => {
		const token = req.headers.token;
		if (token) {
			const accessToken = token.split(' ')[1];
			jwt.verify(accessToken, process.env.JWT_ACCESS_KEY, (err, doctor) => {
				if (err) {
					return res.status(403).json({ 
						isLogin: false,
						message: 'Invalid access token' 
					});
				}
				req.doctor = doctor;
				next();
			});
		} else {
			return res.status(401).json({ status: "You're not authenticated" });
		}
	},
	verifyTokenAndAdminAuth: (req, res, next) => {
		middlewareController.verifyToken(req, res, () => {
			if (req.user.roleId == 1) {
				next();
			} else {
				res.status(403).json({ status: "You're not allowed!" });
			}
		});
	},
};
export default middlewareController;
