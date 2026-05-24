import mongoose from "mongoose";




// this is the schema of a product
// id: unique identifier for the product
// name: name of the product
// description: description of the product that will be displayed in the ProductDetail Page
// price: price of the product
// category: category of the product (surf gear, Aparel, Accessories, ...)
// salePercentage: the percentage of the sale if the product is on sale, otherwise it will be 0
// status: the status of the product (new, sale, ...)
// image: the main image of the product that will be displayed in the ProductCard component
// galleryImages: an array of images that will be displayed in the ProductDetail Page as a gallery
const productSchema = mongoose.Schema({
  id: { type: Number, unique: true, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  salePercentage: { type: Number, required: true },
  status: { type: String },
  image: { type: String, required: true },
  galleryImages: [{type: String}]
});


// creating the model based on the schema, the model is the interface that we will use to interact with the database, 
// it provides us with methods to create, read, update and delete documents in the collection
const productModel = mongoose.model("Product", productSchema);


export default productModel;