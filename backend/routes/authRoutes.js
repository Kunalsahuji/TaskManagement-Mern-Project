const express = require("express");
const router = express.Router();
const { registerUser, loginUser, userLogout } = require("../controllers/authController");
const protect = require("../middleware/authMiddleware");

router.post("/register", registerUser);



router.get('/', (req, res, next) => {

    res.json({ message: "mast h..." })
})



router.post("/login", loginUser);
router.get("/logout",protect, userLogout);


module.exports = router;
