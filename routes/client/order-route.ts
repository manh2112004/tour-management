import { Router } from "express";
import * as controller from "../../controllers/client/order.controllers";
const router = Router();
router.post("/", controller.order);
export const orderRoutes = router;
