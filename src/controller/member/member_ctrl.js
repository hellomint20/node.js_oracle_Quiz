const ser = require("../../service/member/member_service")
//1) 모든 경로 session 넘겨주는 방법

const login = (req, res) => {
    //res.send("/login 페이지 연동")
    res.render("member/login", {username : req.session.username})
}

const loginCheck = async (req, res) => {
    //console.log("ctrl loginCheck : ", req.body)
    const msgPack = await ser.loginCheck(req.body);
    console.log("msgPack : ", msgPack)
    if(msgPack.result == 0 ){
        req.session.username = req.body.id;
    }
    res.send(msgPack.msg);
};

const loginCheck2 = async (req, res) => {
    console.log("logincheck2 : ", req.body);
    const msgPack = await ser.loginCheck2(req.body);
    console.log("msgPack : ", msgPack);
    console.log("msgPack.result : ", msgPack.result);
    if(msgPack.result == 0 ){
        req.session.username = req.body.id;
    }
    res.send(msgPack.msg);
};

const list = async (req, res) => {
    const mList = await ser.getList();
    res.render("member/list", {username : req.session.username, list : mList});
   
};

const registerForm = async (req, res) =>{
    res.render("member/register_form", {username : req.session.username} );
}

const register = async (req, res) => {
    const msgPack = await ser.register(req.body);
    res.send(msgPack.msg);
};

const memberView = async (req, res) => {
    console.log("memberView ctrl : ", req.params);
    const member = await ser.getMember( req.params) ;
    console.log("controller memberView : ", member);
    res.render("member/member_view", { username : req.session.username, member});
};

const modifyForm = async (req, res) =>{
    console.log("ctrl modify(query) : ", req.query);    // { id: 'aaa' } 출력
    const member = await ser.getMember( req.query) ;
    console.log("ctrl modifyForm :", member);

    //res.send("modify");
    res.render("member/modify_form", {username : req.session.username, member});
};

const modify = async (req, res) => {
    console.log("ctrl modify : ", req.body);
    const msg = await ser.modify(req.body);
    res.send(msg);
};

const deleteMember = async (req, res) => {
    const msg = await ser.deleteMember(req.params);
    //req.session.destroy();
    res.send(msg);
    //session은 삭제 되는데, cookie가 남아있어서 list 페이지로 넘어감
};

const logout = async (req, res) => {
    console.log("logout : ", req.session.username)
    req.session.destroy();
    res.clearCookie("isLogin");
    res.redirect("/")
};

module.exports = {login, loginCheck, list, registerForm, register, memberView, modifyForm, modify, deleteMember, loginCheck2, logout};