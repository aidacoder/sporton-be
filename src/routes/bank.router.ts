import { Router } from "express";
import { authenticate } from "../midllewares/auth.midllewares";
import {
  createBank,
  deleteBank,
  updateBank,
  getBanks,
} from "../controlers/bank.controller";

const router = Router();

router.post("/",authenticate,createBank);
router.get("/",getBanks);
router.put("/:id",authenticate, updateBank);
router.delete("/:id",authenticate,deleteBank);


export default router
