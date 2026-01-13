import express from "express";
import auth from "../middleware/auth.js";
import Gig from "../models/Gig.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const gigs = await Gig.find().sort({ createdAt: -1 });
  res.json(gigs);
});


router.get("/:id", async (req, res) => {
  const gig = await Gig.findById(req.params.id);
  res.json(gig);
});


router.post("/", auth, async (req, res) => {
  const { title, description, budget } = req.body;

  const gig = await Gig.create({
    title,
    description,
    budget,
    ownerId: req.user.id,
    status: "open"
  });

  res.json(gig);
});

export default router;
