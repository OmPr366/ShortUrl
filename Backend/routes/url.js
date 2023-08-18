import express from "express";
import {
  generateShortUrl,
  getRedirectUrl,
  getAnalytics,
} from "../controlles/url.js";

const router = express.Router();

router.post("/url", generateShortUrl);

router.get("/url/:shortId", getRedirectUrl);

router.get("/analytics/:shortId", getAnalytics);

export default router;
