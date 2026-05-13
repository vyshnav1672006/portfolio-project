const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)

.then(() => {
    console.log("MongoDB Connected");
})

.catch((err) => {
    console.log("MongoDB Error:", err);
});


// DATABASE SCHEMA

const ContactSchema = new mongoose.Schema({

    name: String,

    email: String,

    message: String
});


// MODEL

const Contact = mongoose.model(
    "Contact",
    ContactSchema
);


// ROUTE

app.post("/contact", async (req, res) => {

    try {

        const newContact = new Contact({

            name: req.body.name,

            email: req.body.email,

            message: req.body.message
        });

        await newContact.save();

        res.json({
            message: "Message Sent Successfully"
        });

    } catch (error) {

        res.status(500).json({
            message: "Error Saving Message"
        });
    }
});


app.get("/", (req, res) => {

    res.send("Backend Running Successfully");
});


app.listen(5000, () => {

    console.log("Server Running on Port 5000");
});