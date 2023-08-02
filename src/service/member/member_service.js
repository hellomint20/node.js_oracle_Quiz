const memberDAO = require("../../database/member/member_dao");

const loginCheck = async (body) => {
    const result = await memberDAO.getList();
    let msg ="", url = "", msgPack={};
    for(let i = 0; i <result.rows.length; i++){
        if(result.rows[i].ID == body.id){
            console.log("성공")
            if(result.rows[i].PWD == body.pwd){
                msgPack.result = 0;
                msg = result.rows[i].NAME+"님 환영합니다~~";
                url = "/";
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
    msgPack.msg = getMessage(msg, url);
    return msgPack;
};

const loginCheck2 = async (body) =>{
    let member = await memberDAO.getMember2(body.id);
    console.log(member);
    let msg ="", url = "", msgPack={};
    if(member.rows.length == 1){
        member = member.rows[0];
        if(body.pwd === member.PWD){
                msg = member.NAME+"님 환영합니다~~";
                url = "/";
                msgPack.result = 0;
        }else{  //비밀번호 일치X
            msg = "비밀번호가 틀렸습니다";
                url = "/member/login";
        }
    }else{  //해당하는 id가 존재하지 않는 경우
        msg = "아이디가 일치하지 않습니다.";
        url = "/member/login";
    }
    msgPack.msg = getMessage(msg, url);
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
    let msg ="", url = "", msgPack={};
    if(result == 1){    //성공
        msg = "회원가입 성공";
        url = "/";
    }else{  //실패
        msg = "회원가입 실패";
        url = "/member/login";
    }
    msgPack.msg = getMessage(msg, url);
    return msgPack;    
};

const getMember = async (mId) => {    
    console.log("service => ", memberDAO.getMember(mId));
    return await memberDAO.getMember(mId);
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

module.exports = {loginCheck, getList, register, loginCheck, getMember, modify, deleteMember, loginCheck2};