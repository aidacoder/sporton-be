import { Router } from "express";
import {signin, initateAdmin} from "../controlers/auth-controler";


const router =Router();

router.post("/signin",signin);
router.post("/initateAdmin-admin-user", initateAdmin);

export  default router