const express = require("express");
const app = express();

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended : true})); 
//app 전달 하기 전에 사용해야 함/ app 전달 후 사용하면 값을 못 받아옴


const session = require('express-session'); //npm 가져옴
const sessionConfig = require("./config/cookie_session/cookie_session_config");    //config 가져옴
app.use(session(sessionConfig.sessionConfig )); //sessionCofing 로 session 사용 선언

const cookieParser = require("cookie-parser");
app.use( cookieParser() )

const router = require("./src/routers/router")(app);

app.set("views", "./src/views");
app.set('view engine', 'ejs');

app.use("/", router);

app.listen(3000, (()=>{console.log("quiz_dbconnect server success~~"); }));