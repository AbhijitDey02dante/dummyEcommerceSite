const fs = require('fs');
const path = require('path');

const p = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'cart.json'
);

module.exports = class Cart{
    static addProduct(id, size, productPrice){
        //Fetch previous cart
        fs.readFile(p,(err, fileContent) => {
            let cart = {products:[], totalPrice: 0}
            if(!err){
                cart=JSON.parse(fileContent);
            }
            //Analyze cart => find existing cart
            const existingProductIndex = cart.products.findIndex(prod => prod.id===id);
            const existingProduct = cart.products[existingProductIndex];
            let updatedProduct;
            if(existingProduct && existingProduct.size===size)
            {
                updatedProduct={...existingProduct};
                updatedProduct.qty = existingProduct.qty + 1;
                cart.products=[...cart.products];
                cart.products[existingProductIndex]=updatedProduct;
            }
            else{
                updatedProduct={id:id ,size:size , qty:1}
                cart.products=[...cart.products, updatedProduct];
            }
            cart.totalPrice = cart.totalPrice + +productPrice;
            // console.log(cart);
            fs.writeFile(p, JSON.stringify(cart), err =>{
                console.log(err);
            })
        })
        //add new product
    }
}