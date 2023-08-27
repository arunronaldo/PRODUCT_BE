const express = require("express");
const Router = express.Router();
const RegisterController = require("../Controllers/registerController");
const ProductController = require('../Controllers/productController')
const Auth = require("../Middlewares/auth");
const { ImagesUpload } = require('../Controllers/imagesUpload')

//register routes
Router.route("/register").post(RegisterController.registerUser);

//login routes
Router.route("/login").post(RegisterController.login);

// Backend image-upload purpose only
Router.route('/image-upload').post(ImagesUpload.uploadAsBase64)

//product routes
Router.route('/create-product').post(ProductController.createProduct)
Router.route('/get-product').get(Auth, ProductController.getProduct)
Router.route('/get-product-with-images').post(Auth, ProductController.getProductAgg)

module.exports = Router;
