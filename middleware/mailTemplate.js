// emailTemplates.js

// This function generates the email template with a dynamic link
function mailTemplate(link) {
  return `
  <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8"> <!-- utf-8 works for most cases -->
    <meta name="viewport" content="width=device-width"> <!-- Forcing initial-scale shouldn't be necessary -->
    <meta http-equiv="X-UA-Compatible" content="IE=edge"> <!-- Use the latest (edge) version of IE rendering engine -->
    <meta name="x-apple-disable-message-reformatting">  <!-- Disable auto-scale in iOS 10 Mail entirely -->
    <title></title> <!-- The title tag shows in email notifications, like Android 4.4. -->
    <link href="https://fonts.googleapis.com/css?family=Lato:300,400,700" rel="stylesheet">
</head>
<body style="margin: 0; padding: 0 !important; mso-line-height-rule: exactly; background-color: #f1f1f1;">
	<center style="width: 100%; background-color: #f1f1f1;">
    <div style="display: none; font-size: 1px;max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden; mso-hide: all; font-family: sans-serif;">
        &zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;
    </div>
    <div style="max-width: 600px; margin: 0 auto;">
    	<!-- BEGIN BODY -->
      <table align="center" role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin: auto;">
      	<tr>
          <td valign="top" style="padding: 1em 2.5em 0 2.5em; background-color: #FFA500;">
          	<table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
          		<tr>
          			<td style="text-align: center;">
			            <h1 style="margin: 0;"><a href="#" style="color: #ffffff; font-size: 24px; font-weight: 700; font-family: 'Lato', sans-serif;">CHOWFINDER</a></h1>
			          </td>
          		</tr>
          	</table>
          </td>
	      </tr><!-- end tr -->
	      <tr>
          <td valign="middle" style="padding: 3em 0 2em 0;">
            <img src="images/email.png" alt="" style="width: 300px; max-width: 600px; height: auto; margin: auto; display: block;">
          </td>
	      </tr><!-- end tr -->
				<tr>
          <td valign="middle" style="padding: 2em 0 4em 0;">
            <table>
            	<tr>
            		<td>
            			<div style="padding: 0 2.5em; text-align: center;">
            				<h2 style="font-family: 'Lato', sans-serif; color: #000000; font-size: 40px; margin-bottom: 0; font-weight: 400;">Please click on the button below to verify your email.</h2>
            				<h3 style="font-family: 'Lato', sans-serif; font-size: 24px; font-weight: 300;">Welcome, dear esteemed customer<br/> Thank you for coming on board.</h3>
            				<p><a href=${link} class="btn btn-primary" style="padding: 10px 15px; display: inline-block; border-radius: 5px; background: #FFA500; color: #ffffff; text-decoration: none;">Verify</a></p>
            			</div>
            		</td>
            	</tr>
            </table>
          </td>
	      </tr><!-- end tr -->
      <!-- 1 Column Text + Button : END -->
      </table>
      <table align="center" role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin: auto;">
      	<tr>
          <td valign="middle" style="padding:2.5em; background-color: #000000;">
            <table>
            	<tr>
                <td valign="top" width="33.333%" style="padding-top: 20px;">
                  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                    <tr>
                      <td style="text-align: left; padding-right: 10px;">
                      	<h3 style="color: #ffffff; font-size: 20px; margin-top: 0; font-weight: 400;">About</h3>
                      	<p style="color: #ffffff;"> You Crave, We Deliver</p>
                      </td>
                    </tr>
                  </table>
                </td>
                <td valign="top" width="33.333%" style="padding-top: 20px;">
                  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                    <tr>
                      <td style="text-align: left; padding-left: 5px; padding-right: 5px;">
                      	<h3 style="color: #ffffff; font-size: 20px; margin-top: 0; font-weight: 400;">Contact Info</h3>
                      	<ul>
					                <li><span style="color: #ffffff;">161/163 Muyibi Street, Olodi-Apapa, Lagos</span></li>
					                <li><span style="color: #ffffff;">+23431055005</span></li>
					              </ul>
                      </td>
                    </tr>
                  </table>
                </td>
                <td valign="top" width="33.333%" style="padding-top: 20px;">
                  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                    <tr>
                      <td style="text-align: left; padding-left: 10px;">
                      	<h3 style="color: #ffffff; font-size: 20px; margin-top: 0; font-weight: 400;">Useful Links</h3>
                      	<ul>
					                <li><a href="#" style="color: #FFA500;">Home</a></li>
					                <li><a href="#" style="color: #FFA500;">About</a></li>
					                <li><a href="#" style="color: #FFA500;">Services</a></li>
					                <li><a href="#" style="color: #FFA500;">Work</a></li>
					              </ul>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr><!-- end: tr -->
        <tr>
          <td style="text-align: center; background-color: #ffffff; color: #000000; padding: 10px;">
          	© Copyright 2023. All rights reserved.
          </td>
        </tr>
      </table>

    </div>
  </center>
</body>
</html>


  `;
}

module.exports = {
  mailTemplate,
};