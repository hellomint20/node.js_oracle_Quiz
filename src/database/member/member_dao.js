const oracledb = require('oracledb');
const dbConfig = require("../../../config/database/db_config")
oracledb.autoCommit = true;
/* 설정하지 않으면 2차원 배열로 들어오기 때문에 KEY, VALUE 를 사용할 수 없다.
[[값, 값, 값], [값, 값, 값] ]
설정하면 1차원 배열에 [ {}, {} ..]형식으로 들어온다
즉, KEY, VALUE를 사용해 정보를 가져올 수 있다.*/
oracledb.outFormat = oracledb.OBJECT;

const loginCheck = async (body) => {
    let con = await oracledb.getConnection(dbConfig);   //DB연동 코드
    const sql = "select * from members02 where id =:id and pwd =:pwd";
    let check = 1;
    try{
       let member = await con.execute(sql, body);
       console.log("dao getmember : ", member);     //배열의 0번째에 원하는 값이 들어있음
       if(member.rows[0] != null){  check = 0;}
    }catch(err){
        console.log(err);
    }
    return check; 
};

const getList = async () => {
    oracledb.outFormat = oracledb.OBJECT;
    let con = await oracledb.getConnection(dbConfig);
    return await con.execute("select * from members02");
};

const register = async (body) => {
    let con = await oracledb.getConnection(dbConfig);   //DB연동 코드
    const sql = `insert into members02 values(:id, :pwd, :name, :addr)`;
    let result =0;
    try{
        let member = await con.execute(sql, body);
        result =1;  
    }catch(err){
        console.log(err);
    }
    return result;  
};

const getMember = async (id) => {
    let con = await oracledb.getConnection(dbConfig);   //DB연동 코드
    const sql = "select * from members02 where id =:id";
    let member;
    try{
       member = await con.execute(sql, id);
       console.log("dao getmember : ", member);     //배열의 0번째에 원하는 값이 들어있음
    }catch(err){
        console.log(err);
    }
    //return member; 
    return member.rows[0]; 
};

const getMember2 = async (id) => {
    let con = await oracledb.getConnection(dbConfig);   //DB연동 코드
    const sql = `select * from members02 where id ='${id}'`;
    let member;
    try{
       member = await con.execute(sql);
       console.log("dao getmember : ", member);     //배열의 0번째에 원하는 값이 들어있음
    }catch(err){
        console.log(err);
    }
    return member; 
};

const modify = async (body) => {
    let con = await oracledb.getConnection(dbConfig);   //DB연동 코드
    const sql = `update members02 set pwd='${body.pwd}',
                name='${body.name}', addr='${body.addr}' where id='${body.id}'`;
    let result = 0;
    try{
        result = await con.execute(sql);
    }catch(err){
        console.log(err);
    }
    return result;
};

const deleteMember = async (body) =>{
    let con = await oracledb.getConnection(dbConfig);   //DB연동 코드
    const sql = "delete from members02 where id=:id";
    let result = 0;
    try{
        result = await con.execute(sql, body);
    }catch(err){
        console.log(err);
    }
    return result;
};

module.exports = {loginCheck, getList, register, getMember, modify, deleteMember, getMember2};