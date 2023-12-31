/*
const cookieConfig = {
    httpOnly : true,    //cookie 허용 여부
    maxAge : 50000,      //cokkie 허용 시간 (5초)
    signed : true       //암호화 시킴 
}*/

const sessionConfig = {
    secret : "암호화 키",   //암호화 진행
    resave : false,
    saveUninitialized : true,
}

module.exports = { sessionConfig };

/* resave
    - true : 세션이 저장되어 있는 경우라도 새롭게 세션을 만듦
    - false : 세션이 저장되어 있고, 동일한 세션이라면 새롭게 만들지 않음
   saveUninitialized
    - true : 세션의 정보가 수정되던 아니던 무조건 다시 저장
    - false : 세션이 수정되면 저장, 그렇지 않으면 안함
 */