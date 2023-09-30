import {Router} from 'express'
import * as UserController from "./User.controller.js"
import { auth } from '../../MidelWare/Auth.MidelWare.js';
//const app = express()
const router = Router() 


router.get("/",auth, UserController.profile);

export default router;