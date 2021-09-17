

module.exports = async function LogOutController (req, res){
    try {
        console.log(req.claerCookie);


        res.redirect("/")

    } catch (error) {
        console.log(error);
    }
}