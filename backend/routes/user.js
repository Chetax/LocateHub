const express = require("express");
const router = express.Router();
const { createUser } = require("../controller/createUser");
const { getUser } = require("../controller/getUsers");
const {findUser} =require("../controller/FindUswer");
router.post("/createUser", createUser);
router.get("/getallUsers", getUser);
router.post('/findUser',findUser)

module.exports = router;
