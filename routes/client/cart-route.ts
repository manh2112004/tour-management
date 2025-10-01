import { Router } from "express";
import * as controller from "../../controllers/client/cart.controllers";
const router = Router();
router.get("/", controller.index);
router.post("/list-json", controller.listJson);
export const cartRoutes = router;
