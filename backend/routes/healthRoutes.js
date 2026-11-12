import express from "express";
import mongoose from "mongoose";

const router = express.Router();

// Mapping of Mongoose readyState codes to human-readable strings
const readyStates = {
    0: "disconnected",
    1: "connected",
    2: "connecting",
    3: "disconnecting",
};

// Health check endpoint that pings the MongoDB database
router.get("/health", async (req, res) => {
    try {
        const isConnected = mongoose.connection.readyState === 1 && Boolean(mongoose.connection.db);

        if (!isConnected) {
            return res.status(503).json({
                status: "error",
                message: "MongoDB is not connected",
                timestamp: new Date().toISOString(),
                database: {
                    status: readyStates[mongoose.connection.readyState] || "disconnected",
                    ping: "failed",
                },
            });
        }

        const startTime = Date.now();
        await mongoose.connection.db.admin().ping();
        const responseTimeMs = Date.now() - startTime;

        return res.status(200).json({
            status: "ok",
            message: "Server and MongoDB are healthy",
            timestamp: new Date().toISOString(),
            database: {
                status: "connected",
                ping: "ok",
                responseTimeMs,
            },
        });
    } catch (error) {
        return res.status(503).json({
            status: "error",
            message: "MongoDB ping failed",
            timestamp: new Date().toISOString(),
            database: {
                status: readyStates[mongoose.connection.readyState] || "error",
                ping: "failed",
            },
            error: error.message,
        });
    }
});

export default router;
