import { Router } from 'express'
import * as messageController from "./Message.controller.js"
import { asynHandler } from '../../MidelWare/errorHandler.js';
import {auth} from "../../MidelWare/Auth.MidelWare.js"
const router = Router()

router.post("/:reciverId", asynHandler(messageController.sendMessage));
router.get("/", auth, messageController.getMessage);

export default router;