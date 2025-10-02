import express, { Router } from "express";
import * as controller from "../../controllers/admin/upload.controllers";
import multer from "multer";
import {
  uploadFields,
  uploadSingle,
} from "../../middlewares/admin/uploadCloud.middleware";
const router: Router = express.Router();
const upload = multer();
router.post("/", upload.single("file"), uploadSingle, controller.index);
export const uploadRoutes: Router = router;
