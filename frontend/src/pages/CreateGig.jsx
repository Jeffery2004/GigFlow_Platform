import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import "../styles/CreateGig.css";

export default function CreateGig() {
  const navigate = useNavigate();

  const [gig, setGig] = useState({
    title: "",
    description: "",
    budget: ""
  });

  const submit = async () => {
    try {
      await api.post("/gigs", gig);
      alert("Gig created successfully");
      navigate("/home");
    } catch (err) {
      alert("Failed to create gig");
    }
  };

  return (
    <div className="create-gig-container">
      <div className="create-gig-card">
        <h2 className="create-gig-title">Post a New Gig</h2>

        <input
          type="text"
          placeholder="Gig Title"
          className="create-gig-input"
          value={gig.title}
          onChange={(e) =>
            setGig({ ...gig, title: e.target.value })
          }
        />

        <textarea
          placeholder="Gig Description"
          className="create-gig-textarea"
          value={gig.description}
          onChange={(e) =>
            setGig({ ...gig, description: e.target.value })
          }
        />

        <input
          type="number"
          placeholder="Budget (₹)"
          className="create-gig-input"
          value={gig.budget}
          onChange={(e) =>
            setGig({ ...gig, budget: e.target.value })
          }
        />

        <button className="create-gig-button" onClick={submit}>
          Create Gig
        </button>
      </div>
    </div>
  );
}
