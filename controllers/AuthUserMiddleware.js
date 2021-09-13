module.exports= async function AuthUserMiddleware(req, res, next) {
    
    if(!req.cookies.token) {
        res.redirect("/");
    }
}