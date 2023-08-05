// emailTemplates.js

// This function generates the email template with a dynamic link
function mailTemplate(link) {
  return `
  <!DOCTYPE html>
  <html>
  <head>
    <title>Email Verification - CHOWFINDER</title>
    <style>
      /* Styles for the header and slogan */
      .header {
        text-align: center;
        padding: 20px 0;
        background-color: orange;
        color: white;
        font-size: 24px;
      }
      .slogan {
        text-align: center;
        font-size: 18px;
        color: black;
        margin-bottom: 20px;
      }
  
      /* Styles for the verification container */
      .verification-container {
        text-align: center;
        padding: 40px;
        background-color: white;
      }
  
      /* Styles for the verification message */
      .verification-message {
        font-size: 16px;
        color: black;
        margin-bottom: 20px;
      }
  
      /* Styles for the verification button */
      .verification-button {
        display: inline-block;
        background-color: orange;
        color: white;
        text-decoration: none;
        padding: 10px 20px;
        font-size: 18px;
        border-radius: 5px;
      }
  
      /* Styles for the footer */
      .footer {
        text-align: center;
        padding: 20px 0;
        background-color: black;
        color: white;
        font-size: 14px;
      }
    </style>
  </head>
  <body>
    <div class="header">
      CHOWFINDER
    </div>
    <div class="slogan">
      You Crave, We Deliver
    </div>
    <div class="verification-container">
      <p class="verification-message">Dear User,</p>
      <p class="verification-message">Thank you for signing up with CHOWFINDER. To complete your registration, please click the button below to verify your email address:</p>
      <a href=${link} class="verification-button">Verify Email</a>
    </div>
    <div class="footer">
      CHOWFINDER | Address: 161 Muyibi Street, Olodi-Apapa, Ajegunle | Phone: (234) 456-7890 | Email: chowfinder1@gmail.com
    </div>
  </body>
  </html>


  `;
}

module.exports = {
  mailTemplate,
};



