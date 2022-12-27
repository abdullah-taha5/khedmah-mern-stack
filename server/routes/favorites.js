const express = require("express");
const router = express.Router();
const Fav = require("../models/fav.model");

/**
 * @desc new product favorite
 * @route /api/favorites
 * @method POST
 * @access public
 */
router.post("/", async (req, res) => {
  const { user_id, imageUrl, productUrl, title, price } = req.body;
  try {
    const productFav = await Fav.create({
      user_id,
      imageUrl,
      productUrl,
      title,
      price,
    });
    res.json(productFav);
  } catch (error) {
    res.json({ error });
  }
});
/**
 * @desc get all products favorite by user id
 * @route /api/favorites/:id
 * @method GET
 * @access public
 */
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const favorites = await Fav.find({ user_id: id });
  res.json(favorites);
});
/**
 * @desc delate a product favorite
 * @route /api/favorites/:id
 * @method DELETE
 * @access public
 */
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  await Fav.findByIdAndDelete(id);
  res.json({ message: "The product has been removed from the favorites" });
});

module.exports = router;
