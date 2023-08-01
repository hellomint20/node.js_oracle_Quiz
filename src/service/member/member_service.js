const memberDAO = require("../../database/member/member_dao");

const loginCheck = async (body) => {
    const result = await memberDAO.loginCheck(body);
    console.log("service loginCheck : "+result)
    
    let msg ="", url = "";
    if(result == 0){    //성공
        msg = "로그인 성공";
        url = "/member/list";
    }else{  //실패
        msg = "로그인 실패";
        url = "/member/login";
    }
    const msgPack = getMessage(msg, url);
    return msgPack;
};

const loginCheck2 = async (body, session) => {
    const result = await memberDAO.getList();
    let msg ="", url = "";
    for(let i = 0; i <result.rows.length; i++){
        if(result.rows[i].ID == body.id){
            console.log("성공")
            if(result.rows[i].PWD == body.pwd){
                session.userId = body.id;
                console.log("session : ", session.userId );
                msg = body.id+"님 환영합니다~~";
                url = "/member/list";
                break;
            }else{
                msg = "비밀번호가 틀렸습니다";
                url = "/member/login";
                break;
            }
        }else{
            msg = "아이디가 일치하지 않습니다.";
            url = "/member/login";
        }
    }
    const msgPack = getMessage(msg, url);
    return msgPack;
};

const getMessage = (msg, url) => {
    return `<script>alert("${msg}");
                    location.href="${url}";</script>`;
};

const getList = async () => {
    const result = await memberDAO.getList();
    console.log("service getList : ", result);
    return result.rows;
};

const register = async (body) => {
    const result = await memberDAO.register(body);
    console.log("register : ", result);
    let msg ="", url = "";
    if(result == 1){    //성공
        msg = "회원가입 성공";
        url = "/member/list";
    }else{  //실패
        msg = "123";
        url = "/member/login";
    }
    const msgPack = getMessage(msg, url);
    return msgPack;    
};

const getMember = (mId) => {    
    console.log("service => ", memberDAO.getMember(mId));
    return memberDAO.getMember(mId);
};

const modify = async (body) =>{
    const result = await memberDAO.modify(body);
    let msg ="", url = "";
    if(result == 0){    //실패
        msg = "문제 발생";
        url = "/member/modify_form?id="+body.id;
    }else{  //성공
        msg = "수정 성공";
        url = "/member/member_view/"+body.id;
    }
    return getMessage(msg, url);
};

const deleteMember = async (body) =>{
    const result = await memberDAO.deleteMember(body);
    let msg ="", url = "";
    if(result == 0){    //실패
        msg = "문제 발생";
        url = "/member/member_view/"+body.id;
    }else{  //성공
        msg = "삭제 성공";
        url = "/member/list";
    }
    return getMessage(msg, url);
};

module.exports = {loginCheck, getList, register, loginCheck2, getMember, modify, deleteMember};