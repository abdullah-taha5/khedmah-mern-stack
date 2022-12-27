const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/user.model");

/**
 * @desc Create User
 * @route /api/register
 * @method POST
 * @access public
 */
router.post("/", async (req, res) => {
  const { name, email, password, adminRole } = req.body;
  const salt = await bcrypt.genSalt(10);

  const hashedPassword = await bcrypt.hash(password, salt);
  const user = await User.findOne({email});
  if (user) {
    return res.json({message: "this user already registered"})
  }
  try {
    await User.create({ name, email, password: hashedPassword, adminRole });
    res.json({ status: "success" });
  } catch (error) {
    res.json({ status: "error", error });
  }
});
/**
 * @desc Get users
 * @route /api/register
 * @method GET
 * @access private
 */
router.get("/", async (req, res) => {
 
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.json({ status: "error", error });
  }
});
/**
 * @desc Delete user by id
 * @route /api/register/:id
 * @method DELETE
 * @access private
 */
router.delete("/:id", async (req, res) => {
  const {id} = req.params;
  try {
    const users = await User.findByIdAndDelete(id);
    res.json({status: "Deleted user"});
  } catch (error) {
    res.json({ status: "error", error });
  }
});
/**
 * @desc Set admin user by id
 * @route /api/register/:id
 * @method PATCH
 * @access private
 */
router.patch("/:id", async (req, res) => {
  const {id} = req.params;
  const {adminRole} = req.body;
  const updateUser = {adminRole, _id: id};
  try {
    await User.findByIdAndUpdate(id, updateUser);
    res.json(updateUser);
  } catch (error) {
    res.json({ status: "error", error });
  }
});
module.exports = router;
