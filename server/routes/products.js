var express = require("express");
var router = express.Router();
const { mockProducts } = require("../DB/main");
const { checkProductDuplicated } = require("../middleware/products.middleware");

/* GET products listing. */
router.get("/", function (req, res) {
  const products = mockProducts;
  res.status(200).json(products);
});

/* POST new product. */
router.post("/", [checkProductDuplicated], function (req, res) {
  const body = req.body;

  const product = {
    id: mockProducts.length + 1,
    name: body.name,
    price: body.price,
  };
  mockProducts.push(product);

  res.status(200).json(product);
});

module.exports = router;
