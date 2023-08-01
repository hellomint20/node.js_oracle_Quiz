const router = require("express").Router();
const ctrl = require("../../controller/member/member_ctrl")

router.get("/", (req, res) => {
    console.log("/member 연동")
})

router.get("/login", ctrl.login); 
router.post("/login_check", ctrl.loginCheck); 
router.get("/list", ctrl.list); 
router.get("/register_form", ctrl.registerForm);
router.post("/register", ctrl.register);
router.get("/member_view/:id", ctrl.memberView); 
router.get("/modify_form",ctrl.modifyForm )      //? 값을 넘겨줄 때
router.post("/modify", ctrl.modify);
router.get("/delete/:id", ctrl.deleteMember);

module.exports = router;