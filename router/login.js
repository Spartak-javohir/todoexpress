const router = require("express").Router();

router.post('/', async (req, res)=>{
    req.body.users.findOne({
        email: email.toLowerCase()
    })
})

module.exports = {
    path: "/login",
    router
}