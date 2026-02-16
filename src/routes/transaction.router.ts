import { Router } from "express";
import { authenticate } from "../midllewares/auth.midllewares";
import {upload } from "../midllewares/upload.midlleware"
import { createTransaction,getTransactionById,updateTransaction,getTransactions } from "../controlers/transaction.controller";


const router = Router();
router.post ("/checkout",upload.single("image"),createTransaction);
router.get("/",authenticate,getTransactions);
router.get ("/:id",getTransactionById);
router.patch("/:id",authenticate,updateTransaction);

export default router;