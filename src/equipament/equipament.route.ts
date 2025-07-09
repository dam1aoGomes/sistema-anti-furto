import { Router } from "express";
import { authenticateToken } from "../middlewares/auth";
import { validateBody } from "../middlewares/validate";
import { createEquipmentSchema, alertOutRangeSchema} from "../schema/equipament.schema";
import { equipamentController } from "./equipament.controller";

const equipamentRouter = Router()

// findAll
equipamentRouter.get('/',authenticateToken,equipamentController.findAll);

// create new equipament
equipamentRouter.post('/',authenticateToken,validateBody(createEquipmentSchema),equipamentController.create);

// alert-out-of-range
equipamentRouter.post('/alert-out-of-range',authenticateToken,validateBody(alertOutRangeSchema),equipamentController.alertOutRange)

export default equipamentRouter;