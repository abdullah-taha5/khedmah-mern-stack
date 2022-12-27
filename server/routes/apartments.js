const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const Apartments = require("../models/apartments.model");

/**
 * @desc Create Product
 * @route /api/apartments
 * @method POST
 * @access public
 */
router.post("/", upload.single("image"), async (req, res) => {
  const { title, desc, price, location, phone, showData, createdBy, user_id } = req.body;
  const imgUrl = req.file.path;
  try {
    await Apartments.create({
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
 * @route /api/apartments
 * @method GET
 * @access public
 */
router.get("/", async (req, res) => {
  try {
    const products = await Apartments.find();
    res.json(products);
  } catch (error) {
    res.json({ status: error });
  }
});
/**
 * @desc Get product by id
 * @route /api/apartments/:id
 * @method GET
 * @access public
 */
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Apartments.findById(id);
    res.json(product);
  } catch (error) {
    res.json({ status: error });
  }
});
/**
 * @desc Get all products by user id
 * @route /api/apartments/myAds/:id
 * @method GET
 * @access public
 */
router.get("/myAds/:id", async (req, res) => {
  const {id} = req.params;
  try {
    const myAds = await Apartments.find({ user_id: id});
    res.json(myAds);
  } catch (error) {
    res.json({ status: error });
  }
});
/**
 * @desc delete product by id
 * @route /api/apartments/:id
 * @method DELETE
 * @access public
 */
router.delete("/:id", async (req, res) => {
  const {id} = req.params;
  try {
    await Apartments.findByIdAndDelete(id);
    res.json({ message: "Deleted"})

  } catch (error) {
    res.json({ status: error})
  }
});
/**
 * @desc approve product by id
 * @route /api/apartments/:id
 * @method PATCH
 * @access private
 */
router.patch("/:id", async (req, res) => {
  const {id} = req.params;
  const {status} = req.body;
  const approveProduct = {status, _id: id};
  try {
    await Apartments.findByIdAndUpdate(id, approveProduct);
    res.json(approveProduct);
  } catch (error) {
    res.json({ status: "error", error });
  }
});
module.exports = router;
