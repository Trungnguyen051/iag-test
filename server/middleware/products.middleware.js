const { mockProducts } = require("../DB/main");

const checkProductDuplicated = async (req, res, next) => {
  const existed = mockProducts.find(
    (product) =>
      product.name === req.body.name && product.price === req.body.price
  );

  if (existed) {
    res.status(400).json({ error: "Product duplicated!" });
  }

  next();
};

module.exports = { checkProductDuplicated };
