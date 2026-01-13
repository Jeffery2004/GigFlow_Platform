import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
import "../styles/Bids.css";

export default function Bids() {
  const { gigId } = useParams();
  const { user } = useAuth();

  const [bids, setBids] = useState([]);
  const [gig, setGig] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, [gigId]);

  const loadData = async () => {
    const [bidsRes, gigRes] = await Promise.all([
      api.get(`/bids/${gigId}`),
      api.get(`/gigs/${gigId}`)
    ]);

    setBids(bidsRes.data);
    setGig(gigRes.data);
    setLoading(false);
  };

  const hireBid = async (bidId) => {
    try {
      await api.patch(`/bids/${bidId}/hire`);
      alert("Freelancer hired successfully");
      loadData();
    } catch (err) {
      alert(err.response?.data?.msg || "Cannot hire");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!gig) return <p>Gig not found</p>;

  const isOwner =
    String(gig.ownerId?._id || gig.ownerId) === String(user);

  return (
    <div className="bids-container">
      <h2 className="bids-title">Bids</h2>

      {bids.length === 0 && <p>No bids yet</p>}

      {bids.map((bid) => (
        <div key={bid._id} className="bid-card">
          <p className="bid-text"><b>Message:</b> {bid.message}</p>
          <p className="bid-text"><b>Price:</b> ₹{bid.price}</p>
          <p className="bid-status">
            Status:{" "}
            <span
              className={
                bid.status === "hired"
                  ? "status-hired"
                  : bid.status === "rejected"
                  ? "status-rejected"
                  : ""
              }
            >
              {bid.status}
            </span>
          </p>

          {isOwner && gig.status === "open" && bid.status === "pending" && (
            <div className="bid-actions">
              <button
                className="hire-button"
                onClick={() => hireBid(bid._id)}
              >
                Hire
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
