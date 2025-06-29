import {
  createNewVenue,
  getAllVenueByLocation,
  getVenueById,
  updateVenueDetails
} from "../controllers/venue.controller";
import { authenticationMiddlware } from "../middlewares/authentication.middleware";
import { roleGuard } from "../middlewares/roleGuard.middleware";
import { Router } from "express";
import { upload } from "../middlewares/multer";
import { userType } from "../entity/auth.entity";

const router = Router();

router.get("/location/:locationId", authenticationMiddlware, getAllVenueByLocation);
router.post("/", authenticationMiddlware, roleGuard([userType.ADMIN]), upload.single("venueImage"), createNewVenue);
router.get("/:venueId", authenticationMiddlware, getVenueById);
router.patch("/:venueId", authenticationMiddlware, upload.single("venueImage"), updateVenueDetails);

export default router;
