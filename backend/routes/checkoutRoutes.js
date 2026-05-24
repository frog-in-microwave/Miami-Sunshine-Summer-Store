import express from "express";
import authenticateToken from "../middleware/authenticateToken.js";
import Stripe from "stripe";
import rateLimiter from "../middleware/rateLimiter.js";





// creating the stripe object that we can use to create a checkout session
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const router = express.Router();



// this endpoint recieves the products in the cart, creates a checkout session with stripe, formats these products to be passed to stripe, then returns the session url
// it has user authentication middleware via the jwt token and a rate limit of 5 requests per minute
router.post("/checkout", authenticateToken, rateLimiter, async (req, res) => {



    try {
        // the product list from the frontend
        const products = req.body.products;

        // validation, you never know
        if(!products){
            res.status(400).json({message: "the products list hasent been sent from the frontend"});
        }
        console.log("FRONTEND_URL:", process.env.FRONTEND_URL);
        // creating the session with the stripe object
        const session = await stripe.checkout.sessions.create({
          payment_method_types: ["card"], // this covers credit and debit cards
          mode: "payment", // one time payment, could also be subscribtion

          // the list of products that are being sold. here are the products sent from the frontend
          line_items: products.map((product) => {
            return {
              price_data: {
                currency: "usd",
                product_data: {
                  name: product.name,
                  description: product.description,
                },
                unit_amount: product.price * 100, // Stripe expects the amount in cents
              },
              quantity: product.qty,
            };
          }),
          success_url: `${process.env.FRONTEND_URL}/`, // the url that the user will be sent to in case nothing wrog happens
          cancel_url: `${process.env.FRONTEND_URL}/cart`, // the url that the user will be sent to in case the user clicks the cancle button
        });


        // success!!!
        res.status(200).json({ url: session.url });
    } catch (err) {


        // oh noo :(
        console.log("error in the checkout route :(", err.message);
        res
            .status(500)
            .json({
            message: "An error occurred while processing the checkout",
            error: err.message,
            });
    }

})






export default router;

