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
exports.sendAlertEmail = void 0;
const mail_1 = __importDefault(require("@sendgrid/mail"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
mail_1.default.setApiKey(process.env.SENDGRID_API_KEY);
const sendAlertEmail = (to, equipmentName) => __awaiter(void 0, void 0, void 0, function* () {
    const msg = {
        to,
        from: process.env.SENDGRID_FROM, // precisa ser verificado no SendGrid
        subject: `Alerta: Equipamento "${equipmentName}" foi removido do alcance`,
        text: `O equipamento "${equipmentName}" saiu da sala.`,
        html: `<strong>O equipamento "${equipmentName}" foi retirado da sala sem autorização ou supervisão.</strong>`,
    };
    yield mail_1.default.send(msg);
});
exports.sendAlertEmail = sendAlertEmail;
