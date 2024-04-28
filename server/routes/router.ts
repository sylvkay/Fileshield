import express from "express" 
import {authRouter} from "./auth.router";
import {fileRouter} from "./file.router";


const apiPath="/api/v1";

const router = express.Router();

router.use(`${apiPath}/file`, fileRouter);
router.use(`${apiPath}/auth`, authRouter);

export { router };