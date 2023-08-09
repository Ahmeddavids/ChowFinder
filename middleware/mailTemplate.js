// emailTemplates.js

// This function generates the email template with a dynamic link
function mailTemplate(link, fullname) {
  return `
  <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Email Verification - CHOWFINDER</title>
  <style>
    body {
      background: linear-gradient(90deg, #00ccff, #ffffff);
      font-family: Arial, sans-serif;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      margin: 0;
    }

    .container {
      max-width: 400px;
      padding: 40px;
      background-color: white;
      border-radius: 8px;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
    }

    .header {
      text-align: center;
      margin-bottom: 20px;
    }

    .header h1 {
      font-size: 36px;
      color: #FC8019;
      margin: 0;
    }

    .slogan {
      font-size: 18px;
      text-align: center;
      margin-top: 0;
      color: #FC8019;
    }

    .verification-message {
      font-size: 16px;
      color: #333;
      margin-bottom: 20px;
    }

    .verification-button {
      display: block;
      width: 100%;
      max-width: 200px;
      background-color: #FC8019;
      color: white;
      border: none;
      border-radius: 4px;
      padding: 12px;
      font-size: 16px;
      text-align: center;
      cursor: pointer;
      transition: background-color 0.3s ease;
      margin: 0 auto;
    }

    .verification-button:hover {
      background-color: #FFA75F;
    }

    .footer {
      text-align: center;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>CHOWFINDER</h1>
      <p class="slogan">You Crave, We Deliver</p>
    </div>
    <div class="verification-message">Dear ${fullname},</div>
    <div class="verification-message">Thank you for signing up with CHOWFINDER. To complete your registration, please click the button below to verify your email address:</div>
    <a href=${link} class="verification-button">Verify Email</a>
  </div>
  <div class="footer">
    CHOWFINDER | Address: 161 Muyibi Street, Olodi-Apapa, Ajegunle | Phone: (234) 456-7890 | Email: chowfinder1@gmail.com
  </div>
</body>
</html>


  `;
}



function forgotMailTemplate(link, fullname) {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Password Reset - CHOWFINDER</title>
  <style>
    body {
      background: linear-gradient(90deg, orange, white);
      font-family: Arial, sans-serif;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      margin: 0;
    }

    .container {
      max-width: 400px;
      padding: 40px;
      background-color: white;
      border-radius: 8px;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
    }

    .header {
      text-align: center;
      margin-bottom: 20px;
    }

    .header h1 {
      font-size: 36px;
      color: orange;
      margin: 0;
    }

    .slogan {
      font-size: 18px;
      text-align: center;
      margin-top: 0;
    }

    .reset-button {
      display: block;
      width: 100%;
      max-width: 200px; /* Reduced button width */
      background-color: orange;
      color: white;
      border: none;
      border-radius: 4px;
      padding: 10px; /* Reduced button padding */
      font-size: 16px;
      text-align: center;
      cursor: pointer;
      transition: background-color 0.3s ease;
      margin: 0 auto; /* Center the button */
    }

    .reset-button:hover {
      background-color: #444;
    }

    .key-symbol {
      display: block;
      text-align: center;
      font-size: 48px;
      margin-bottom: 20px;
      color: orange;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="key-symbol">
      &#128272; <!-- Unicode for the key symbol -->
    </div>
    <div class="header">
      <h1>CHOWFINDER</h1>
      <p class="slogan">You Crave, We Deliver</p>
    </div>
    <p>Hello ${fullname},</p>
    <p>It seems you have requested to reset your password. Click the button below to proceed:</p>
    <a class="reset-button" href=${link}>Reset Password</a>
    <p>If you did not request a password reset, please ignore this email.</p>
    <p>Best regards,<br>CHOWFINDER Team</p>
  </div>
</body>
</html>



  `;
}




module.exports = {
  mailTemplate,
  forgotMailTemplate
};



