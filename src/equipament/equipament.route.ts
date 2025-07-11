import { Router } from "express";
import { authenticateToken } from "../middlewares/auth";
import { validateBody, validateParams, validateQuery } from "../middlewares/validate";
import { createEquipmentSchema, alertOutRangeSchema, findByIdSchema, querySchema} from "../schema/equipament.schema";
import { equipamentController } from "./equipament.controller";

const equipamentRouter = Router()

// findAll
equipamentRouter.get('/',authenticateToken,validateQuery(querySchema),equipamentController.findAll);

// findById
equipamentRouter.get('/:id',authenticateToken,validateParams(findByIdSchema),equipamentController.findById)

// create new equipament
equipamentRouter.post('/',authenticateToken,validateBody(createEquipmentSchema),equipamentController.create);

// alert-out-of-range
equipamentRouter.post('/alert-out-of-range',authenticateToken,validateBody(alertOutRangeSchema),equipamentController.alertOutRange);


export default equipamentRouter;