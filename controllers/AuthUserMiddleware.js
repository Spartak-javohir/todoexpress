module.exports= async function AuthUserMiddleware(req, res, next) {
    
    if(!req.cookies.token) {
        res.redirect("/");
    }
    if (!user) throw new Error("User not found");

    const isTrust = await compareHash(data.password, user.password);


    if (!isTrust) throw new Error("Password is incorrect");

    const token = await createToken({
        id: user._id,
    });
    if(!req.cookies.token) {
        res.redirect("/");
    }
    let profile = await req.db.usersinfo.insertOne({
        email: data.email,
    });

    res.cookie("token", token).redirect("/profile");
}