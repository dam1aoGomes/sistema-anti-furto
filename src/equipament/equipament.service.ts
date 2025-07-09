import prisma from "../prisma-client/prisma"
import { sendAlertEmail } from "../utils/sendEmail";


async function findAll() {
    const equipaments = await prisma.equipment.findMany()
    return equipaments;
}

async function findById(id: number) {
    const equipament = await prisma.equipment.findUnique({
        where : {
            id: id
        }
    });
    return equipament;
}

async function create(name:string,type:string,location:string,rfid:string,responsible:string) {
    const equipament = await prisma.equipment.create({
        data : {
            name : name,
            type : type,
            location : location,
            rfid : rfid,
            responsible : responsible
        }
    });
    return equipament;
}

async function alertOutRange(rfid: string) {
    const equipment = await prisma.equipment.findUnique({ where: { rfid } });
    if(!equipment) {
        return equipment;
    }
    // Marcar como fora do alcance
    await prisma.equipment.update({
        where: { rfid },
        data: { isInRange: false },
    });
    // send email
    await sendAlertEmail("damiao28.contato@gmail.com", equipment.name);
}

export const equipamentService = {
    findAll,
    findById,
    create,
    alertOutRange
}