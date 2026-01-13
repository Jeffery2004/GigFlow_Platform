import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";
import "../styles/PlaceBid.css";

export default function PlaceBid() {
  const { gigId } = useParams();
  const navigate = useNavigate();

  const [message, setMessage] = useState("");
  const [price, setPrice] = useState("");

  const submitBid = async () => {
    try {
      await api.post("/bids", {
        gigId,
        message,
        price
      });
      alert("Bid placed successfully");
      navigate("/home");
    } catch (err) {
      alert("Failed to place bid");
    }
  };

  return (
    <div className="place-bid-container">
      <div className="place-bid-card">
        <h2 className="place-bid-title">Place Your Bid</h2>

        <textarea
          className="place-bid-textarea"
          placeholder="Describe your proposal..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <input
          type="number"
          className="place-bid-input"
          placeholder="Your price (₹)"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <button className="place-bid-button" onClick={submitBid}>
          Submit Bid
        </button>
      </div>
    </div>
  );
}
