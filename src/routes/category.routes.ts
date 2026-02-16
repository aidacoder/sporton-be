import { Router } from "express";
import { createCategory,getCategoryById ,getCategories,updateCategory,deleteCategory} from "../controlers/category.controller";
import { authenticate } from "../midllewares/auth.midllewares";
import { upload } from "../midllewares/upload.midlleware";


const router =Router();

router.post("/",authenticate,upload.single("image"),createCategory);
router.get("/",getCategories);
router.get("/:id",getCategoryById);
router.put("/:id",authenticate,upload.single("image"),updateCategory);
router.delete("/:id",authenticate,deleteCategory);

export default router