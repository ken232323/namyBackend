import { Router } from "express";
import { Resend } from "resend";

const router = Router();

const resend = new Resend(process.env.RESEND_API_KEY);

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

    console.log("Attempting to send email with Resend...");

    const { data, error } = await resend.emails.send({
      from: `NAMY Website <info@namyzambia.org>`,
      to: ["info@namyzambia.org"],
      replyTo: email,
      subject: `New Contact Message from ${name}`,

      text: `
Name: ${name}
Email: ${email}

Message:
${message}
      `,

      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
          <h2>New Contact Message</h2>

          <p>
            <strong>Name:</strong> ${name}
          </p>

          <p>
            <strong>Email:</strong> ${email}
          </p>

          <hr />

          <h3>Message</h3>

          <p>
            ${message.replace(/\n/g, "<br>")}
          </p>
        </div>
      `,
    });

    if (error) {
      console.error("RESEND ERROR:");
      console.error(error);

      return res.status(500).json({
        error: "Failed to send message.",
        details: error.message,
      });
    }

    console.log("EMAIL SENT SUCCESSFULLY:");
    console.log(data);

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