import express from "express";
import { generateShortUrl, getRedirectUrl } from "../controlles/url.js";

const router = express.Router();

router.post("/url", generateShortUrl);
router.get("/url/:shortId", getRedirectUrl);

export default router;
