import {Router} from 'express'
import * as AuthController from "./Auth.controller.js"
import {asynHandler} from "../../MidelWare/errorHandler.js"
import validation from "../../MidelWare/Validation.js"
import {SignInSchema} from  "./Auth.Vaildation.js"
import {SignUpSchema} from  "./Auth.Vaildation.js"
const router = Router()

router.post("/signup", validation(SignUpSchema), asynHandler(AuthController.SignUp));
router.post("/signin",validation(SignInSchema) ,asynHandler(AuthController.SignIn));
router.get("/confirmEmail/:token", asynHandler(AuthController.confirmEmail))
router.get("/NewconfirmEmail/:Refreshtoken", asynHandler(AuthController.NewconfirmEmail))

export default router;