import { Router } from "express";
import * as controller from "../../controllers/admin/category.controllers";
const router = Router();
router.get("/", controller.index);
export const categoryRoutes = router;
