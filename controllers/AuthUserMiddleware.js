module.exports= async function AuthUserMiddleware(req, res, next) {
	if (!req.cookies.token) {
		res.redirect("/");
	}

	const isTrust = checkToken(req.cookies.token);

	if (isTrust) {
		req.user = isTrust;
		next();
	} else {
		res.redirect("/");
	}
}