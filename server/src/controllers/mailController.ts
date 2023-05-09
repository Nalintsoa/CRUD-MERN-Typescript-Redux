import { RequestHandler } from 'express';
import nodemailer from 'nodemailer';

export const sendMail: RequestHandler = async (req, res, next) => {
    try {
        const senderAdress = req.body.adresse_mail;
        const senderObject = req.body.objet_mail;
        const textMail = req.body.texte_mail;
        const testAccount = await nodemailer.createTestAccount();

        const transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            secure: false,
            auth: {
                user: testAccount.user,
                pass: testAccount.pass,
            },
        });

        const info = await transporter.sendMail({
            from: `<${senderAdress}>`,
            to: 'nalytovo@gmail.com',
            subject: senderObject,
            text: textMail,
            html: "<!DOCTYPE html>" +
                "<html>" +
                "<head>" +
                "<meta charset=\"UTF-8\">" +
                "<title>Titre de l'email</title>" +
                "</head>" +
                "<body>" +
                "<table>" +
                "<tr>" +
                "<td>" +
                "<h1>Bonjour</h1>" +
                "<p>Ravi de pouvoir vous contacter</p>" +
                "</td>" +
                "</tr>" +
                "</table>" +
                "<hr>" +
                `<h2>${senderObject}</h2>` +
                `<p>Message :</p>` +
                `<p>${textMail}</p>` +
                "<hr>" +
                "<table>" +
                "<tr>" +
                "<td>" +
                "<p>Coordonnées</p>" +
                "<p>Adresse de l'entreprise</p>" +
                "<p>Téléphone : +1 555-555-5555</p>" +
                "<p>Email : contact@example.com</p>" +
                "</td>" +
                "<td style=\"padding-left : 40px\">" +
                "<p>Suivez-nous sur les réseaux sociaux :</p>" +
                "<p><a href=\"https://twitter.com/example\">Twitter</a></p>" +
                "<p><a href=\"https://facebook.com/example\">Facebook</a></p>" +
                "<p><a href=\"https://linkedin.com/company/example\">LinkedIn</a></p>" +
                "</td>" +
                "</tr>" +
                "</table>" +
                "</body>" +
                "</html>",
            attachments: [
                {
                    filename: req.file?.originalname,
                    path: req.file?.path
                }
            ]
        })
        // res.status(200).json({ message: 'Mail envoyé' });

        console.log("Message sent: %s", info.messageId);

        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    } catch (e) {
        console.log(e);
        res.status(401).json({ message: 'Mail non envoyé' });
    }
}