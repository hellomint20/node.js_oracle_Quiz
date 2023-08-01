const cookieConfig = {
    httpOnly : true,    //cookie 허용 여부
    maxAge : 50000,      //cokkie 허용 시간 (5초)
    signed : true       //암호화 시킴 
}

const sessionConfig = {
    secret : "암호화 키",   //암호화 진행
    resave : false,
    saveUninitialized : true,
    //cookie : { maxAge : 5000} //쿠기 시간 설정
}

module.exports = { cookieConfig, sessionConfig };