import { Router } from "express";
import multer from "multer";
import * as controller from "../../controllers/admin/tour.controllers";
import * as uploadCloud from "../../middlewares/admin/uploadCloud.middleware";
const upload = multer();
const router = Router();
router.get("/", controller.index);
router.get("/create", controller.create);
router.post(
  "/create",
  upload.fields([
    {
      name: "images",
      maxCount: 6,
    },
  ]),
  uploadCloud.uploadFields,
  controller.createPost
);
export const tourRoutes = router;
