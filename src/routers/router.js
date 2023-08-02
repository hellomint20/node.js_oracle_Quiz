module.exports = (app) =>{
    const memberRouter = require("./member/member_router");
    app.use("/member", memberRouter)

    const router = require("express").Router();

    router.get("/", (req, res) => {
        if(req.session.username){
            res.cookie("isLogin", true)
        }
        res.render("index", {username : req.session.username});
    });
    //사용자 웹브라우저를 통해 session 값이 있을 경우 쿠키 값 생성하여 각 url에 session 넣어주지 않아도 되도록

    return router;
};