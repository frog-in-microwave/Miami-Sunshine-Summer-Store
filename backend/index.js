import mongoose from "mongoose";
import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/authroutes.js";
import productRoutes from "./routes/productRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import checkoutRoutes from "./routes/checkoutRoutes.js";
import healthRoutes from "./routes/healthRoutes.js";
import cors from "cors"


// using dotenv to load the environment variables from the .env file
dotenv.config();

// creating the express app and using the necessary middleware
const app = express();



// using cors to allow cross-origin requests from the frontend
const allowedOrigins = [
    process.env.FRONTEND_URL ? process.env.FRONTEND_URL.replace(/\/$/, "") : null,
    "https://miami-sunshine-summer-store.netlify.app",
    "http://localhost:5173",
].filter(Boolean);

app.use(cors({
    origin: (origin, callback) => {
        // allow server-to-server or tools with no origin
        if (!origin) return callback(null, true);
        const normalizedOrigin = origin.replace(/\/$/, "");
        if (allowedOrigins.includes(normalizedOrigin)) {
            return callback(null, true);
        }
        return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
}));




//using express.json() to parse the request body as json
app.use(express.json());

// using the routes in the routes folder. the auth routes have the prefix /api/auth, so all the routes in authRoutes will start with /api/auth
app.use("/api/auth", authRoutes);
app.use("/api", productRoutes);
app.use("/api", contactRoutes);
app.use("/api", checkoutRoutes);
app.use("/api", healthRoutes);
app.use("/", healthRoutes);


// backend port that will be used to listen to the requests from the frontend, it is specified in the .env file, if not specified, it will default to 5000  
const PORT = process.env.PORT;

// the mongoDB connection string, it is specified in the .env file for security reasons, it should not be hardcoded in the code
const MONGO_URI = process.env.MONGO_URI;


// connecting to the mongoDB database and starting the server
mongoose.connect(MONGO_URI).then(() => {
    console.log("Connected to MongoDB!!!!!");

    // starting to listen on port 5000 after connecting to mongoDB
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch((error) => {
    console.error("Error connecting to MongoDB:", error);
});


