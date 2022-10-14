const key = require("../configs/mailjet.config");

const sendEmail = (body, token) => {
  try {
    const Mailjet = require("node-mailjet");
    const mailjet = new Mailjet({
      apiKey: key.publicKey,
      apiSecret: key.privateKey,
    });

    const request = mailjet.post("send", { version: "v3.1" }).request({
      Messages: [
        {
          From: {
            Email: "julien.chigot@ynov.com",
            Name: "Notee",
          },
          To: [
            {
              Email: body.email,
              Name: body.firstname,
            },
          ],
          TemplateID: 4276684,
          TemplateLanguage: true,
          Subject: "Re",
          Variables: {
            firstname: body.firstname,
            name: body.lastname,
            email: body.email,
            message: body.message,
            //add url to page redirection
            url: `http://localhost:3000/reset-password?token=${token}`,
          },
        },
      ],
    });
    return { message: "Email Send" };
  } catch (error) {
    return { message: "Error, Email Not Send" };
  }
};

module.exports = sendEmail;
