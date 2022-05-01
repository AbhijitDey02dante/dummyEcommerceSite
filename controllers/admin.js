const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    formsCSS: true,
    productCSS: true,
    activeAddProduct: true,
    editing:false
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const product = new Product(title, imageUrl, description, price);
  product.save()
  .then(()=>res.redirect('/'))
  .catch(error => console.log(error));
};

exports.getProducts = (req, res, next) => {
  Product.fetchAll()
  .then(([rows,fieldData]) => {
    res.render('admin/products', {
      prods: rows,
      pageTitle: 'Admin Products',
      path: '/admin/products'
    });
  })
  .catch(error => console.log(error));
};


exports.getEditProduct = (req, res, next) => {
  console.log(req.body);
  const editMode = req.query.edit;
  if(!editMode){
    return res.redirect('/');
  }
  const prodId = req.params.productId;
  Product.findById(prodId, product =>{
      if(!product){
        return res.redirect('/');
      }
      res.render('admin/edit-product', {
        pageTitle: 'Edit Product',
        path: '/admin/edit-product',
        editing:editMode,
        product: product
      });
  });
};

exports.postEditProduct = (req,res,next) => {
  const prodID = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedUrl = req.body.imageUrl;
  const updatedDescription = req.body.description;
  const updatedProduct = new Product(prodID, updatedTitle, updatedUrl, updatedDescription, updatedPrice);

  updatedProduct.save();
  res.redirect('/admin/products');
}

exports.getDeleteProduct = (req,res,next) => {
  const prodID=req.params.productId;
    Product.deleteproductbyID(prodID)
    .then(() => res.redirect('/admin/products'))
    .catch(error => console.log(error));
}