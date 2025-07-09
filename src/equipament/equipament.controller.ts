import { Request, Response } from "express";
import { equipamentService } from "./equipament.service";

async function findAll(req : Request, res : Response) {
    const equipaments = await equipamentService.findAll();
    res.json(equipaments);
}

async function create(req: Request, res: Response) {
    const {name,type,location,rfid,responsible} = req.body;
    const equipament = await equipamentService.create(name,type,location,rfid,responsible);
    res.status(201).json(equipament);
}

async function alertOutRange(req: Request, res: Response) {
    const {rfid} = req.body;
    await equipamentService.alertOutRange(rfid);
    res.json({ message: 'Equipamento marcado como fora do alcance e notificação enviada (se aplicável).' });
}

export const equipamentController = {
    findAll,
    create,
    alertOutRange
}