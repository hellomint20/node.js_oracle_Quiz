const ser = require("../../service/member/member_service")

const login = (req, res) => {
    //res.send("/login 페이지 연동")
    res.render("member/login")
}

const loginCheck = async (req, res) => {
    console.log("ctrl loginCheck : ", req.body)
    const msg = await ser.loginCheck2(req.body, req.session);
    console.log("loginCheck session ->", req.session)
    res.send(msg);
};

const list = async (req, res) => {
    const list = await ser.getList();
    res.render("member/list", {list});
};

const registerForm = async (req, res) =>{
    res.render("member/register_form");
}

const register = async (req, res) => {
    const msg = await ser.register(req.body);
    res.send(msg);
};

const memberView = async (req, res) => {
    console.log("memberView ctrl : ", req.params);
    const member = await ser.getMember( req.params) ;
    console.log("controller memberView : ", member);
    res.render("member/member_view", { member});
};

const modifyForm = async (req, res) =>{
    console.log("ctrl modify(query) : ", req.query);    // { id: 'aaa' } 출력
    const member = await ser.getMember( req.query) ;
    console.log("ctrl modifyForm :", member);

    //res.send("modify");
    res.render("member/modify_form", {member});
};

const modify = async (req, res) => {
    console.log("ctrl modify : ", req.body);
    const msg = await ser.modify(req.body);
    res.send(msg);
};

const deleteMember = async (req, res) => {
    const msg = await ser.deleteMember(req.params);
    res.send(msg);
};

module.exports = {login, loginCheck, list, registerForm, register, memberView, modifyForm, modify, deleteMember};