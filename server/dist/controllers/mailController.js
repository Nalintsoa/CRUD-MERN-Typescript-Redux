"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const sendMail = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const senderAdress = req.body.adresse_mail;
        const senderObject = req.body.objet_mail;
        const textMail = req.body.texte_mail;
        const testAccount = yield nodemailer_1.default.createTestAccount();
        const transporter = nodemailer_1.default.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            secure: false,
            auth: {
                user: testAccount.user,
                pass: testAccount.pass,
            },
        });
        const info = yield transporter.sendMail({
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
                    filename: (_a = req.file) === null || _a === void 0 ? void 0 : _a.originalname,
                    path: (_b = req.file) === null || _b === void 0 ? void 0 : _b.path
                }
            ]
        });
        // res.status(200).json({ message: 'Mail envoyé' });
        console.log("Message sent: %s", info.messageId);
        console.log("Preview URL: %s", nodemailer_1.default.getTestMessageUrl(info));
    }
    catch (e) {
        console.log(e);
        res.status(401).json({ message: 'Mail non envoyé' });
    }
});
exports.sendMail = sendMail;
