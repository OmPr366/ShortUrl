import { nanoid } from "nanoid";
import { Url } from "../models/url.js";

// Function to generate short url
export async function generateShortUrl(req, res) {
  const { url } = req.body;
  if (!url) {
    return res.status(400).json({ error: "Url is required" });
  }
  const shortId = nanoid(5);
  const newUrl = new Url({ shortId, redirectUrl: url });
  try {
    await newUrl.save();
    return res.status(201).json(newUrl);
  } catch (err) {
    return res.status(500).json({ error: err });
  }
}

// Function to Redirect to original url
export async function getRedirectUrl(req, res) {
  const { shortId } = req.params;
  if (!shortId) {
    return res.status(400).json({ error: "ShortId is required" });
  }
  console.log(shortId, " shortId ");
  try {
    const resp = await Url.findOneAndUpdate(
      { shortId },
      { $push: { visitHistory: { timestamp: Date.now() } } }
    );

    if (!resp) {
      return res.status(404).json({ error: "Url not found" });
    }
    res.redirect(resp.redirectUrl);
    // return res.status(200).json(resp.redirectUrl);
  } catch (error) {
    console.log("Error while fetching url ", error);
    return res.status(500).json({ error: error });
  }
}

// Function to get analytics
export async function getAnalytics(req, res) {
  const { shortId } = req.params;
  if (!shortId) {
    return res.status(400).json({ error: "ShortId is required" });
  }
  try {
    const result = await Url.findOne({ shortId });
    if (!result) {
      return res.status(404).json({ error: "Url not found" });
    }
    return res.status(200).json({
      totalVisits: result.visitHistory.length,
      visitHistory: result.visitHistory,
    });
  } catch (error) {
    return res.status(500).json({ error: error });
  }
}
