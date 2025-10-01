import { Router } from "express";
import * as controller from "../../controllers/client/order.controllers";
const router = Router();
router.post("/", controller.order);
router.get("/success", controller.success);
export const orderRoutes = router;
