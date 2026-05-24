import express from 'express';

const router = express.Router();



router.post("/stripe/webhook-reciever", (req, res) => {
    console.log("webhook reciever hit with this data : " , req.body);
    res.status(200).json({message : "webhook reciever hit successfully"});
} )









export default router;