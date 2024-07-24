const contentEmailSignIn = (email, userName) => {
  return {
    to: email,
    subject: 'Signup succeeded!',
    html: `<!DOCTYPE html>
  <html lang="fr">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
          body {
              font-family: Arial, sans-serif;
              background-color: #f4f4f4;
              margin: 0;
              padding: 0;
          }
          .container {
              max-width: 600px;
              margin: 20px auto;
              background-color: #ffffff;
              box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
              border-radius: 10px;
              overflow: hidden;
          }
          .header {
              background-color: #007bff;
              color: #ffffff;
              padding: 20px;
              text-align: center;
          }
          .header h1 {
              margin: 0;
              font-size: 24px;
          }
          .content {
              padding: 20px;
          }
          .content h2 {
              color: #333333;
              font-size: 20px;
              margin-bottom: 10px;
          }
          .content p {
              color: #555555;
              font-size: 16px;
              line-height: 1.6;
          }
          .footer {
              background-color: #007bff;
              color: #ffffff;
              text-align: center;
              padding: 10px;
              font-size: 14px;
          }
          .button {
              display: inline-block;
              background-color: #007bff;
              color: #ffffff;
              padding: 10px 20px;
              text-decoration: none;
              border-radius: 5px;
              margin-top: 20px;
          }
      </style>
  </head>
  <body>
      <div class="container">
          <div class="header">
              <h1>Bienvenue dans notre communauté!</h1>
          </div>
          <div class="content">
              <h2>Bonjour ${userName},</h2>
              <p>
                  Nous sommes ravis de vous compter parmi nous. Merci de vous être inscrit(e) à notre service. Nous sommes convaincus que vous trouverez une valeur inestimable dans ce que nous offrons.
              </p>
              <p>
                  Si vous avez des questions ou avez besoin d'aide, n'hésitez pas à nous contacter à tout moment. Nous sommes ici pour vous aider et nous assurer que vous avez la meilleure expérience possible.
              </p>
              <p>
                  En attendant, n'oubliez pas de vérifier votre boîte de réception pour des mises à jour importantes et des nouvelles passionnantes. Nous avons hâte de vous voir profiter pleinement de nos services.
              </p>
              <a href="#" class="button">Commencez dès maintenant</a>
          </div>
          <div class="footer">
              &copy; 2024 Votre équipe pixels. Tous droits réservés.
          </div>
      </div>
  </body>
  </html>
  `,
  };
};

module.exports = { contentEmailSignIn };
