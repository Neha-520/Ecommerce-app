const express = require("express");
const { getAllProducts, createProduct, updateProduct, deleteProduct, getProductDetails, createProductReview, getProductReviews, deleteReview, getAdminProducts } = require("../controllers/productController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const Router = express.Router();

Router.route("/products").get(getAllProducts);

Router.route("/admin/products")
    .get(isAuthenticatedUser, authorizeRoles("admin"), getAdminProducts)

Router.route("/admin/product/new")
    .post(isAuthenticatedUser, authorizeRoles("admin"), createProduct);

Router.route("/admin/product/:id")
    .put(isAuthenticatedUser, authorizeRoles("admin"), updateProduct)
    .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteProduct)

Router.route("/product/:id").get(getProductDetails);

Router.route("/review").put(isAuthenticatedUser, createProductReview);

Router.route("/reviews")
    .get(getProductReviews)
    .delete(isAuthenticatedUser, deleteReview);


module.exports = Router;