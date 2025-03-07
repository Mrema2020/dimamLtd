const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post("/send-email", async (req, res) => {
    const { fullName, phone, email, message } = req.body;

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER, // Your Gmail address
            pass: process.env.EMAIL_PASS  // Your Gmail app password
        }
    });

    const mailOptions = {
        from: email,
        to: process.env.RECEIVER_EMAIL, // Your email to receive messages
        subject: `CONTACT FROM WEBSITE`,
        text: `Name: ${fullName}\nPhone: ${phone}\nEmail: ${email}\n\nMessage:\n${message}`
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).send({ message: "Email sent successfully!" });
    } catch (error) {
        res.status(500).send({ message: "Failed to send email", error });
    }
});

app.listen(5500, () => console.log("Server running on port 5500"));
