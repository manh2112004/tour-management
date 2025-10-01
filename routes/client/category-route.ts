import { Router } from "express";
import * as controller from "../../controllers/client/category.controllers";
const router = Router();
router.get("/", controller.index);
export const categoryRoutes = router;
