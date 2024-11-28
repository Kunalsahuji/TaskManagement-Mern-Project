const express = require("express");
const router = express.Router();
const { registerUser, loginUser, userLogout } = require("../controllers/authController");

router.post("/register", registerUser);



router.get('/', (req, res, next) => {

    res.json({ message: "mast h..." })
})



router.post("/login", loginUser);
router.get("/logout", userLogout);


module.exports = router;
