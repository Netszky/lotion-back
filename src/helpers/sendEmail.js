const key = require("../configs/mailjet.config");

const sendEmail = (body, token, templateID, subject) => {
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
          TemplateID: templateID,
          TemplateLanguage: true,
          Subject: subject,
          Variables: {
            firstname: body.firstname,
            name: body.lastname,
            email: body.email,
            message: body.message,
            //add url to page redirection
            url: `${process.env.APP_URL}reset-password?token=${token}`,
          },
        },
      ],
    });
    return { message: "Email Send" };
  } catch (error) {
    return { message: error };
  }
};

module.exports = sendEmail;
