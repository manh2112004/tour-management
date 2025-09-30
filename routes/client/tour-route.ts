import { Router } from "express";
import * as controller from "../../controllers/client/tour.controllers";
const router = Router();
router.get("/", controller.index);
export const tourRoutes = router;
