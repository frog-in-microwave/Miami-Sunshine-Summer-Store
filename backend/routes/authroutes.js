import express from "express";
import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt  from "jsonwebtoken";
import dotenv from "dotenv";
import authenticateToken from "../middleware/authenticateToken.js";
import rateLimiter from "../middleware/rateLimiter.js";


dotenv.config();

// creating the router object, the router is used to define the routes for the authentication, 
// we will use it in the index.js file to handle the routes that start with /api/auth . this is specified in index.js
const router = express.Router();






// this endpoint is for registering a new user.
router.post("/register", rateLimiter, async (req, res) => {
    try {

        // these are sent via the request body, they are the data that the user entered in the registration form, 
        // we will use them to create a new user in the database
        const { userName, email, password, phoneNumber, location, label, profilePicLink} = req.body;
        // checking if there exists a user with that email as its unique. 
        // if there is, we return a conflict status code (409) and a message that the user already exists
        const userExists = await User.findOne({email : email});
        if(userExists){
            console.log("user exists with the email of : " , email );
            res.status(409).json({message : "User already exists with this email"});
            return;
        }

        // hashing the password before saving to the database. we are specificaly hashing it 2^10 times over and over
        const HashedPassword = await bcrypt.hash(password, 10);

        // creating a new user via the model imported from models/userModel.js, the model is the interface that we will use to interact with the database
        const newUser = new User({
            userName,
            email,
            password: HashedPassword,
            phoneNumber,
            location,
            label,
            profilePicLink,
            memberSince: new Date(),
            orderList: [],
        })

        // awaiting to save the user in the database
        await newUser.save();
        // creating the jwt token from the user id. we can decode the token back to get the id of the user.
        const token = jwt.sign(
          { userId: newUser._id }, // any info that is the user's . here we are passing only the id, but we can pass more info if we want
          process.env.JWT_TOKEN_SECRET, // the secret that is hidden in the .env file, it is used to sign the token and verify it later
          { expiresIn: "7d" }, // the expiration of the token, here set to 7 days
        );

        // success!
        res.status(201).json({message : "User registered successfully", token});
    }catch(error){
        // oh noooo
        console.error("Error during registration:", error);
        res.status(500).json({message : "Internal server error"});
    }
})




// this endpoint is used to log in an existing user. it checks if the email exists in the database, then it checks if the password is correct by comparing it with the hashed password in the database
router.post("/login", rateLimiter, async(req, res) => 
{
    try{

        // sent via request body
        const {email, password} = req.body;

        // checking if there exists a user with that email as its unique.
        const user = await User.findOne({email : email});

        // if the user doesnt exist, we return a not found status code (404) and a message that no user found with this email
        if(!user){
            console.log("No user found with the email of : " , email );
            res.status(404).json({message : "No user found with this email"});
            return;
        }

        // checking the password with bcrypt 
        const isMatch = await bcrypt.compare(password, user.password);

        // if the password sent and the saved one in the database are not the same, we return an unauthorized status code (401) and a message that the password is incorrect
        if(!isMatch){
            console.log("Incorrect password for email : " , email );

            
            res.status(401).json({message : "Incorrect password"});
            return;

        }

        // creating a jwt token from the user id. we can decode the token back to get the id of the user.
        const token = jwt.sign({userId: user._id}, process.env.JWT_TOKEN_SECRET, {expiresIn : "7d"});

        // success !!
        res.status(200).json({message : "Login successful", user, token});
    }catch(error){

        // ops!
        console.error("Error during login:", error);
        res.status(500).json({message : "Internal server error"});
    }
})



// this endpoint is used to update the user so we can allow the user to change things like the name or location
// it recieves the token in the request header and uses middleware to authenticate it
// if the user is authenticated, the new user is taken from the request body and we update the user in the database with the new data
router.put("/update-user", rateLimiter, authenticateToken, async (req, res) => {
    try{

        // the changed user would be sent in the request body. it will not be the full user
        const changedUser = req.body.changedUser;

        // here we are finding the user and changing the values with the new ones sent in the request body
        await User.findByIdAndUpdate(req.user._id, {
            $set: changedUser // this changes only the values that are sent in the changedUser object, for example if we sent only the name, it will change only the name and keep the rest of the values as they are
        });

        // success!!
        res.status(200).json({message: "user updated successfully!"});
    }catch(err){

        // tuff luck!
        console.error("Error during updating user:", err);
        res.status(500).json({message: "error : ", err});
    }
    

})



// is is a simple endpoint that just gets the user.
// it utilizes the authenticateToken middleware to check if the user is authenticated, if so, it returns the user data in the response. 
router.get("/me", authenticateToken, rateLimiter, (req, res) => {
    try{

        // the authenticateToken middleware function sends the user in the request object, so we just send it back in the response
        const user = req.user;
        res.status(200).json(user);
    }catch(err){

        // oops!
        console.error("Error during getting user data:", err);
        res.status(500).json({message: "error : ", err});
    }
})





//exporting the router object
export default router;
