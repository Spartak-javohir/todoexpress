const {validateToken} = require('../modules/jwt')

module.exports= async function AuthUserMiddleware(req, res, next) {
	if (!req.cookies.token) {
		next()
	}else{

	const isTrust = validateToken(req.cookies.token);

	if (!isTrust) {		
		next();
	} else {
		req.user = isTrust;
		next()
	}
}	
}