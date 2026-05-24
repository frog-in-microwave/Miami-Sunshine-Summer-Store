import express from "express";
import Product from "../models/productModel.js";



const router = express.Router();




// an endpoint that intakes the values of how much products, the page number, the category and serch term to send the specific products.
router.get("/get-products", async (req, res) => {
    try{

        // query is an object that contains the parameters sent in the api call after the "?" and separated with "&"
        // here it contains the page number and the limmit which is the number of products that must be sent back
        const page = parseInt(req.query.page || 1); 
        const limit = parseInt(req.query.limit || 1);

        // skip is the number of products that need to be skipped to get new products and no duplicates,
        // it is calculated by (page number - 1) * how many products we want to show per page
        const skip = (page - 1) * limit;

        // the search term and category are also sent in the query, we will use them to filter the products in the database
        const {search, category} = req.query;



        // creating an object that will have conditions for the database to filter the products, 
        // if there is a search term, we will use a regular expression to match the name of the product with the search term
        const query = {};
        if(search){
            query.name = { $regex: search, $options: "i" }; // "i" for case insensitive, it will match the search term with the name of the product regardless of the case (uppercase, lowercase, in a word, ...)
        }
        if(category && category != "All"){
            query.category = category;
        }

        // totalProducts is the number of products in the database that match the conditions of the new query object that was created
        const totalProducts = await Product.countDocuments(query);        

        // if there are more products that arent loaded yet (if the skip is less than the total matching products)
        if(!(skip >= totalProducts)){
        const products = await Product.find(query).skip(skip).limit(limit); // passing our values to mongoDB
        


        // success!!
        res.status(200).json({
            message: "successfully fetched " + products.length + " products",
            products,
        });
        }
        else{


            // also success !! (but no more products to load)
            res.status(200).json({
                message: "products are fully loaded, no more to load",
                products : false,
            })
        }
    }catch(err){


        // oops!
        res.status(500).json({
            message: "error with getting the products : ",
            err
        });
    }
})












export default router;
