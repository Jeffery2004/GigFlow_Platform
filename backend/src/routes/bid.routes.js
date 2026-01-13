import express from "express";
import mongoose from "mongoose";
import Bid from "../models/Bid.js";
import Gig from "../models/Gig.js";
import auth from "../middleware/auth.js";
import { io } from "../socket.js";

const router = express.Router();

router.post("/", auth, async (req, res) => {
  await Bid.create({
    ...req.body,
    freelancerId: req.user.id
  });
  res.json({ msg: "Bid placed" });
});

router.get("/:gigId", auth, async (req, res) => {
  const bids = await Bid.find({ gigId: req.params.gigId });
  res.json(bids);
});

router.patch("/:bidId/hire", auth, async (req, res) => {
  try {
    const bid = await Bid.findById(req.params.bidId);
    if (!bid) {
      return res.status(404).json({ msg: "Bid not found" });
    }

    const gig = await Gig.findById(bid.gigId);
    if (!gig) {
      return res.status(404).json({ msg: "Gig not found" });
    }

    if (gig.ownerId.toString() !== req.user.id) {
      return res.status(403).json({ msg: "Only gig owner can hire" });
    }

    if (gig.status === "assigned") {
      return res.status(400).json({ msg: "Gig already assigned" });
    }

    gig.status = "assigned";
    await gig.save();

    bid.status = "hired";
    await bid.save();

    await Bid.updateMany(
      { gigId: gig._id, _id: { $ne: bid._id } },
      { status: "rejected" }
    );

    io.to(bid.freelancerId.toString()).emit("hired", {
      message: "🎉 You have been hired!"
    });

    res.json({ msg: "Freelancer hired successfully" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

export default router;
