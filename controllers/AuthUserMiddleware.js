const {validateToken} = require('../modules/jwt')

module.exports= async function AuthUserMiddleware(req, res, next) {
	
	
	if (!req.Cookies) {
		next()
	}else{

	const isTrust = validateToken(req.Cookies);
		console.log(isTrust);
	if (!isTrust) {		
		next();
	} else {
		req.user = isTrust;
		next()
	}
}	
}