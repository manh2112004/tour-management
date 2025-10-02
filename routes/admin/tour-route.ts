import { Router } from "express";
import * as controller from "../../controllers/admin/tour.controllers";
const router = Router();
router.get("/", controller.index);
export const tourRoutes = router;
