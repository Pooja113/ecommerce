const Product = require("../models/productModel");
const ErrorHander = require("../utils/ErrorHandler");
const catchAsyncErrors = require("../middleware/catchAsynchErrors");
const Features = require("../utils/features");


//Created Product here :Admin
exports.createProduct = catchAsyncErrors(async (req, res, next) => {
  req.body.user = req.user.id

  const product = await Product.create(req.body);
  res.status(201).json({
    success: true,
    product
  });
})


//Get Products
exports.getAllProducts = catchAsyncErrors(async (req, res) =>{
  const resultPerPage = 4;
  const productsCount = await Product.countDocuments();

  const Feature = new Features(Product.find(), req.query)
  .search()
  .filter()
  .pagination(resultPerPage);
  const products = await Feature.query;
  res.status(200).json({
    success: true,
    products,
  });
})
//Get Sigle Product
exports.getSingleProduct = catchAsyncErrors(async (req, res,next) =>{

  let product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHander("Product not found", 404));
  }

  res.status(200).json({
    success: true,
    product,
    productsCount
  });
})



//update Product
exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
  let product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHander("Product not found", 404));
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    product,
  });
})


//Delete Product

exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
  let product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHander("Product not found", 404));
  }
  
 await product.remove();

  res.status(200).json({
    success: true,
    message: "Product Deleted"
  });
})