const key = require("../configs/mailjet.config");

const sendEmail = (body) => {
    console.log("Je suis body = ",body);
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
            url: "google.com",
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
