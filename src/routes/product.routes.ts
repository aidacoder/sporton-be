import { Router } from "express";

import {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from "../controlers/product.conroler";

import { upload } from "../midllewares/upload.midlleware";
import { authenticate } from "../midllewares/auth.midllewares";
const router = Router();
router.post("/",authenticate,upload.single("image"),createProduct)
router.get("/",getProducts)
router.get("/:id",getProductById);
router.put("/:id",authenticate,upload.single("image"),updateProduct);
router.delete("/:id",authenticate,deleteProduct)


export default  router;