require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log(err));

// Contact Schema
const ContactSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String
});

const Contact = mongoose.model("Contact", ContactSchema);

// Add a contact
app.post("/api/contacts", async (req, res) => {
    const contact = new Contact(req.body);
    await contact.save();
    res.json(contact);
});

// Get all contacts
app.get("/api/contacts", async (req, res) => {
    const contacts = await Contact.find();
    res.json(contacts);
});

// Start the server
app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));
