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
  Product.create({
    title:title,
    imageUrl:imageUrl,
    description:description,
    price:price
  })
  .then((result)=>{
    console.log("Added Product");
    res.redirect('/admin/add-product');
  })
  .catch(error => console.log(error));
};

exports.getProducts = (req, res, next) => {
  Product.findAll()
  .then(products => {
    res.render('admin/products', {
      prods: products,
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
  Product.findByPk(prodId)
  .then(product =>{
    if(!product){
      return res.redirect('/');
    }
    res.render('admin/edit-product', {
      pageTitle: 'Edit Product',
      path: '/admin/edit-product',
      editing:editMode,
      product: product
    })
   })
    .catch(error=>console.log(error));
};

exports.postEditProduct = (req,res,next) => {
  const prodID = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedUrl = req.body.imageUrl;
  const updatedDescription = req.body.description;
  Product.findByPk(prodID)
  .then(product => {
    product.title=updatedTitle;
    product.price=updatedPrice;
    product.description=updatedDescription;
    product.imageUrl=updatedUrl;
    return product.save();
  })
  .then(()=>res.redirect('/'))
  .catch(error=>console.log(error));
}

exports.getDeleteProduct = (req,res,next) => {
  const prodID=req.params.productId;
    // Product.destroy({where: {id:prodID}})
    Product.findByPk(prodID)
    .then(product => product.destroy())
    .then(() => res.redirect('/admin/products'))
    .catch(error => console.log(error));
}