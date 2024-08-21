const nodemailer = require("nodemailer");

function createMailTransport() {
  return nodemailer.createTransport({
    host: process.env.HOST,
    port: process.env.MAIL_PORT,
    auth: {
      user: process.env.MAIL_USERNAME,
      pass: process.env.PASSWORD,
    },
  });
}

function createEmailTemplate(title, content, buttonText, buttonUrl) {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <style>
    body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; background-color: #f4f4f4; margin: 0; padding: 0; }
    .container { max-width: 600px; margin: 20px auto; background-color: #fff; border-radius: 8px; overflow: hidden; box-shadow: 0 0 20px rgba(0, 0, 0, 0.1); }
    .header { background-color: #4b2e05; padding: 20px; text-align: center; }
    .header h1 { color: #fff; margin: 0; font-size: 24px; }
    .content { padding: 30px; }
    .button { display: inline-block; background-color: #8b5e34; color: #fff; text-decoration: none; padding: 12px 24px; border-radius: 4px; font-weight: bold; margin-top: 20px; transition: background-color 0.3s; }
    .button:hover { background-color: #6d4b29; }
    .footer { background-color: #f0f0f0; padding: 20px; text-align: center; font-size: 12px; color: #666; }
    .subcopy { border-top: 1px solid #e8e5ef; margin-top: 25px; padding-top: 25px; }
    .subcopy p { line-height: 1.5em; margin-top: 0; color: #4b2e05; font-size: 12px; }
    .subcopy a { color: #8b5e34; text-decoration: none; }
    @media only screen and (max-width: 600px) {
      .container { width: 100%; margin: 0; border-radius: 0; }
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Taraba Promotion Platform</h1>
    </div>
    <div class="content">
      ${content}
      <a href="${buttonUrl}" class="button">${buttonText}</a>
      <div class="subcopy">
        <p>If you're having trouble clicking the "${buttonText}" button, copy and paste the URL below into your web browser: <a href="${buttonUrl}">${buttonUrl}</a></p>
      </div>
    </div>
    <div class="footer">
      &copy; ${new Date().getFullYear()} Taraba Promotion Platform. All rights reserved.
    </div>
  </div>
</body>
</html>
  `;
}

exports.sendConfirmation = async (username, email, url) => {
  const content = `
    <h2>Welcome, ${username}!</h2>
    <p>Thank you for joining the Taraba Promotion Platform. We're excited to have you on board!</p>
    <p>To complete your registration and verify your email address, please click the button below:</p>
  `;

  const mailOptions = {
    from: {
      name: "Taraba Promotion Platform",
      address: process.env.GMAIL_USER,
    },
    to: email,
    subject: "Welcome to Taraba Promotion Platform - Verify Your Email",
    html: createEmailTemplate(
      "Email Verification",
      content,
      "Verify Email Address",
      url
    ),
  };

  const transporter = createMailTransport();
  transporter.sendMail(mailOptions);
};

exports.sendForgotPassword = async (username, email, url) => {
  const content = `
    <h2>Hello, ${username}</h2>
    <p>We received a request to reset the password for your Taraba Promotion Platform account.</p>
    <p>If you didn't make this request, you can safely ignore this email. Otherwise, please click the button below to reset your password:</p>
    <p><strong>Note:</strong> This link will expire in 30 minutes for security reasons.</p>
  `;

  const mailOptions = {
    from: {
      name: "Taraba Promotion Platform",
      address: process.env.GMAIL_USER,
    },
    to: email,
    subject: "Password Reset Request - Taraba Promotion Platform",
    html: createEmailTemplate("Password Reset", content, "Reset Password", url),
  };

  const transporter = createMailTransport();
  transporter.sendMail(mailOptions);
};
