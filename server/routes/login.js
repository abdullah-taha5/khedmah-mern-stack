const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/user.model");

/**
 * @desc Login User
 * @route /api/login
 * @method POST
 * @access public
 */
router.post("/", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (isPasswordValid) {
    const token = jwt.sign(
      {
        id: user._id,
        name: user.name,
        email: user.email,
        adminRole: user.adminRole,
      },
      process.env.JWT_SECRET_KEY
    );
    res.json({ status: "success", token });
  } else {
    res.json({ status: "error", token: false });
  }
});

module.exports = router;
