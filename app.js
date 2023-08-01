const express = require("express");

const session = require('express-session'); //npm 가져옴
const sessionConfig = require("./config/cookie_session/cookie_session_config");    //config 가져옴
const bodyParser = require("body-parser");

const app = express();

app.use(session(sessionConfig.sessionConfig )); //sessionCofing 로 session 사용 선언
app.use(bodyParser.urlencoded({ extended : true}));

const router = require("./src/routers/router")(app);

app.set("views", "./src/views");
app.set('view engine', 'ejs');



app.use("/", router);

app.listen(3000, (()=>{console.log("quiz_dbconnect server success~~"); }));