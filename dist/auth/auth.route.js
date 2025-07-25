"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("./auth.controller");
const validate_1 = require("../middlewares/validate");
const auth_schema_1 = require("../schema/auth.schema");
const authRouter = (0, express_1.Router)();
authRouter.post('/auth', (0, validate_1.validateBody)(auth_schema_1.authSchema), auth_controller_1.authController.auth);
authRouter.post('/auth/register', (0, validate_1.validateBody)(auth_schema_1.authRegisterSchema), auth_controller_1.authController.authRegister);
exports.default = authRouter;
