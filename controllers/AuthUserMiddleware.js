
const {validateToken} = require('../modules/jwt')

module.exports= async function AuthUserMiddleware(req, res, next) {
	
	if (res.Cookies) {
		next()
	}else{

	const isTrust = validateToken(req.cookies);
		
	if (!isTrust) {		
		next();
	} else {
		req.user = isTrust;
		next()
	}
	

}	
}