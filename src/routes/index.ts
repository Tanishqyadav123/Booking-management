import adminRouter from "./admin.router";
import authRouter from "./auth.router";
import comedianRouter from "./comedian.router";
import locationRouter from "./location.router";
import { Router } from "express";
import viewerRouter from "./viewer.router";
const router = Router();

router.use("/auth", authRouter);
router.use("/viewer", viewerRouter);
router.use("/comedian", comedianRouter);
router.use("/admin", adminRouter);
router.use("/location", locationRouter);

export default router;
