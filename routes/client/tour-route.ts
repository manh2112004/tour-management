import { Router } from "express";
import * as controller from "../../controllers/client/tour.controllers";
const router = Router();
router.get("/:slugCategory", controller.index);
router.get("/detail/:slugTour", controller.detail);
export const tourRoutes = router;
