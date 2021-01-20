const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
  service: process.env.SUPPORT_SERVICE,
  auth: {
    user: process.env.SUPPORT_EMAIL,
    pass: process.env.SUPPORT_PWD,
  },
});

exports.sendMail = function (dest, obj, msg) {
  const name = process.env.NAME ? process.env.NAME.charAt(0).toUpperCase() + process.env.NAME.slice(1).toLowerCase() : 'Soluzione Digitale';
  const mailOptions = {
    from: name.charAt(0).toUpperCase() + name.slice(1) + ' <studio@soluzione-digitale.com>',
    to: dest,
    subject: obj,
    html: msg,
  };
  if (process.env.NAME !== 'stag') {
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
  }
};

exports.sendVerifyEmail = function (user) {
  this.sendMail(
    user.email,
    'Email di verifica account',
    '<html>' +
      '    <head>' +
      '        <meta name="viewport" content="width=device-width, initial-scale=1.0">' +
      '    </head>' +
      '    <body style="background: #dedede; height:auto; padding: 30px 0;">' +
      '        <div style="width: 80%; margin: 0px auto; background: #fff; border-radius: 8px; padding: 25px; text-align: center;">' +
      '            <img style="display: block; width: 15em; margin: auto;" src="' +
      process.env.LOGO_MAIL_URL +
      '" />' +
      '            <br>' +
      '            <h3>Benvenuto in ' +
      process.env.NAME.charAt(0).toUpperCase() +
      process.env.NAME.slice(1).toLowerCase() +
      '!<br>🎉</h3>' +
      '            <p>Ora che sei dei nostri, verifica la tua email per accedere a tutte le funzionalità:</p>' +
      '            <br>' +
      '            <form action="https://' +
      process.env.VIRTUAL_HOST +
      '/api/user/validate/' +
      user._id +
      '">' +
      '               <input style="margin: auto; border:0; height: 3.4rem; font-size: 1.4rem; padding: 0 2.6rem; border-radius: 64px; line-height:1; color: #fff; background-color:' +
      process.env.PRIMARY +
      '; color:' +
      process.env.BUTTON_TEXT +
      '" type="submit" value="Verifica email" />' +
      '            </form>' +
      '            <br>' +
      '            <br>' +
      '            <p style="font-size: 9pt;">Copyright ® 2019 Soluzione Digitale<br>Tutti i diritti riservati</p>' +
      '            <p>Se non visualizzi correttamente questa mail, ' +
      '               <a href="https://' +
      process.env.VIRTUAL_HOST +
      '/api/user/validate/' +
      user._id +
      '">clicca qui</a>' +
      '            </p>' +
      '        </div>' +
      '    </body>' +
      '</html>'
  );
};

exports.sendRecoverPwdMail = function (user, password) {
  this.sendMail(
    user.email,
    'Email di recupero account',
    '<html>' +
      '    <head>' +
      '        <meta name="viewport" content="width=device-width, initial-scale=1.0">' +
      '    </head>' +
      '    <body style="background: #dedede; height:auto; padding: 30px 0;">' +
      '        <div style="width: 80%; margin: 0px auto; background: #fff; border-radius: 8px; padding: 25px; text-align: center;">' +
      '            <img style="display: block; max-width: 15em; margin: auto;" src="' +
      process.env.LOGO_MAIL_URL +
      '" />' +
      '            <br>' +
      '            <h3>Hey ciao!</h3>' +
      '            <p>Ecco le nuove credenziali temporanee per poter accedere al tuo account</p>' +
      '            <div style="max-width: 80%; background-color: #fff; border:1px solid #d7d9da; border-radius: 8px; box-shadow: 2px 3px 10px 0px rgba(0,0,0,0.3) !important; padding: 16px; margin: 16px auto;">' +
      '              <div style="width: 100%; margin: auto;">' +
      '                  <h3 style="font-weight: bold">Email</h3><p style="color: #000">' +
      user.email +
      '</p>' +
      '              </div>' +
      '              <hr style="width: 80%; margin: auto;" />' +
      '              <div style="width: 100%; margin: auto;">' +
      '                  <h3 style="font-weight: bold">Password</h3><p style="color: #000">' +
      password +
      '</p>' +
      '              </div>' +
      '            </div>' +
      '            <p style="font-size: 9pt;">Copyright ® 2019 Soluzione Digitale<br>Tutti i diritti riservati</p>' +
      '        </div>' +
      '    </body>' +
      '</html>'
  );
};
