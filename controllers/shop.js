const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getProducts = (req, res, next) => {
  Product.findAll()
  .then((products)=>{
    res.render('shop/product-list', {
      prods: products,
      pageTitle: 'All Products',
      path: '/products'
    });
  })
  .catch(error => console.log(error))
};

exports.getIDProduct = (req,res,next) => {
  const prodID = req.params.productID;
  Product.findAll({where: {id:prodID}})
  .then((products)=>{
    res.render('shop/product-detail',{
      product: products[0],
      pageTitle: 'Product Details',
      path: '/product'
    });
  })
  .catch(error => console.log(error));
}

exports.getIndex = (req, res, next) => {
  Product.findAll()
  .then(products => {
      res.render('shop/index', {
        prods: products,
        pageTitle: 'Shop',
        path: '/'
      });
  })
  .catch(error=>console.log(error))
};

exports.getCart = (req, res, next) => {
  res.render('shop/cart', {
    path: '/cart',
    pageTitle: 'Your Cart'
  });
};

exports.postCart = (req,res,next) => {
  const prodId = req.body.productId;
  const prodSize = req.body.size;
  Product.findById(prodId,(product)=>{
    Cart.addProduct(prodId,prodSize,product.price);
  })
  res.redirect('/cart');
}

exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    path: '/orders',
    pageTitle: 'Your Orders'
  });
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  });
};
