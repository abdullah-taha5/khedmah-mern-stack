const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const Electronics = require("../models/electronics.model");

/**
 * @desc Create Product
 * @route /api/electronics
 * @method POST
 * @access public
 */
router.post("/", upload.single("image"), async (req, res) => {
  const { title, desc, price, location, phone, showData, createdBy, user_id } = req.body;
  const imgUrl = req.file.path;
  try {
    await Electronics.create({
      title,
      desc,
      imgUrl,
      price,
      location,
      phone,
      showData,
      createdBy,
      user_id
    });
    res.json({ status: "success" });
  } catch (error) {
    res.json({ status: error });
  }
});
/**
 * @desc Get all products
 * @route /api/electronics
 * @method GET
 * @access public
 */
router.get("/", async (req, res) => {
  try {
    const products = await Electronics.find();
    res.json(products);
  } catch (error) {
    res.json({ status: error });
  }
});
/**
 * @desc Get product by id
 * @route /api/electronics/:id
 * @method GET
 * @access public
 */
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Electronics.findById(id);
    res.json(product);
  } catch (error) {
    res.json({ status: error });
  }
});
/**
 * @desc Get all products by user id
 * @route /api/electronics/myAds/:id
 * @method GET
 * @access public
 */
router.get("/myAds/:id", async (req, res) => {
  const {id} = req.params;
  try {
    const myAds = await Electronics.find({ user_id: id});
    res.json(myAds);
  } catch (error) {
    res.json({ status: error });
  }
});
/**
 * @desc delete product by id
 * @route /api/electronics/:id
 * @method DELETE
 * @access public
 */
router.delete("/:id", async (req, res) => {
  const {id} = req.params;
  try {
    await Electronics.findByIdAndDelete(id);
    res.json({ message: "Deleted"})

  } catch (error) {
    res.json({ status: error})
  }
});
/**
 * @desc approve product by id
 * @route /api/electronics/:id
 * @method PATCH
 * @access private
 */
router.patch("/:id", async (req, res) => {
  const {id} = req.params;
  const {status} = req.body;
  const approveProduct = {status, _id: id};
  try {
    await Electronics.findByIdAndUpdate(id, approveProduct);
    res.json(approveProduct);
  } catch (error) {
    res.json({ status: "error", error });
  }
});
module.exports = router;
