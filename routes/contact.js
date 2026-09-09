import { Router } from "express";
import nodemailer from "nodemailer";

const router = Router();

const transporter = nodemailer.createTransport({
  host: "smtp.hostinger.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

router.post("/", async (req, res) => {
  console.log("=================================");
  console.log("CONTACT REQUEST RECEIVED");
  console.log(req.body);
  console.log("=================================");

  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        error: "Please fill in all fields.",
      });
    }

    console.log("Attempting to send email...");

    const info = await transporter.sendMail({
      from: `"NAMY Website" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      replyTo: email,
      subject: `New Contact Message from ${name}`,

      text: `
Name: ${name}
Email: ${email}

Message:
${message}
      `,

      html: `
        <h2>New Contact Message</h2>

        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>

        <hr>

        <h3>Message</h3>
        <p>${message.replace(/\n/g, "<br>")}</p>
      `,
    });

    console.log("EMAIL SENT:");
    console.log(info.messageId);

    return res.status(200).json({
      success: true,
      message: "Message sent successfully.",
    });

  } catch (error) {
    console.error("=================================");
    console.error("EMAIL ERROR:");
    console.error(error);
    console.error("=================================");

    return res.status(500).json({
      error: "Failed to send message.",
      details: error.message,
    });
  }
});

export default router;