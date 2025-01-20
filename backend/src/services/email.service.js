import nodemailer from "nodemailer";

// Configure the transporter with SMTP details

export const sendWelcomeEmail = async (to, name) => {
  const smtpConfig = {
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: true,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  };

  const transporter = nodemailer.createTransport(smtpConfig);

  const portfoliioLink = `https://vivekanandareddy.onrender.com/Resumeportfolio.html`;
  const htmlTemplate = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Welcome Email</title>
      </head>
      <body>
        <h1>Welcome to My World!</h1>
        <p>Hi ${name},</p>
        <p>I am Vivekananda Reddy, a software developer at CaratRED Technologies LLP. I specialize in MEAN Stack Development, working with MongoDB, Express.js, Angular, and Node.js to build scalable and efficient web applications.</p>
        <p>I am passionate about software development and continuously work on improving my skills in the latest technologies. I am excited to connect with you and collaborate on future projects!</p>
        <p>Best Regards,</p>
        <p>Vivekananda Reddy</p>
        <p>MEAN Stack Developer at CaratRED Technologies LLP</p>

        <a href="${portfoliioLink}">VISIT MY PORTFOLIO ✋</a>
      </body>
      </html>
    `;

  const mailOptions = {
    from: `"Our Service" <${process.env.SMTP_USER}>`, // Sender address
    to: to, // Recipient address
    subject: "Welcome to Our Service!", // Subject line
    html: htmlTemplate, // HTML content
  };

  try {
    // Send the email
    await transporter.sendMail(mailOptions);
    console.log("Welcome email sent successfully");
  } catch (error) {
    console.error("Error sending welcome email:", error);
  }
};
