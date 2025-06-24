import {
  addNewLocation,
  deleteLocationDetails,
  getAllLocation,
  getSingleLocation,
  updateLocationDetails
} from "../controllers/location.controller";
import { authenticationMiddlware } from "../middlewares/authentication.middleware";
import { roleGuard } from "../middlewares/roleGuard.middleware";
import { Router } from "express";
import { upload } from "../middlewares/multer";
import { userType } from "../entity/auth.entity";

const router = Router();

router.post("/", authenticationMiddlware, roleGuard([userType.ADMIN]), upload.single("locationImage"), addNewLocation);
router.get(
  "/",
  authenticationMiddlware,
  roleGuard([userType.ADMIN, userType.COMEDIAN, userType.VIEWER]),
  getAllLocation
);
router.get("/:locationId", authenticationMiddlware, roleGuard([userType.ADMIN]), getSingleLocation);
router.patch(
  "/:locationId",
  authenticationMiddlware,
  roleGuard([userType.ADMIN]),
  upload.single("locationImage"),
  updateLocationDetails
);
router.delete("/:locationId", authenticationMiddlware, roleGuard([userType.ADMIN]), deleteLocationDetails);

export default router;
