import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";
import "../styles/Home.css";
import socket from "../socket";
import { useAuth } from "../context/AuthContext";

export default function Home() {
  const [gigs, setGigs] = useState([]);
  const [search, setSearch] = useState("");

  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  useEffect(() => {
    fetchGigs();
  }, []);

  useEffect(() => {
    socket.on("hired", (data) => {
      alert(data.message);
    });

    return () => socket.off("hired");
  }, []);

  const fetchGigs = async () => {
    const res = await api.get("/gigs");
    setGigs(res.data);
  };

  const filteredGigs = gigs.filter((gig) =>
    gig.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="home-container">
      <div className="home-header">
        <div className="brand-header">
          <div className="brand-title">GigFlow</div>
          <div className="brand-tagline">
            Find work. Hire talent. Instantly.
          </div>
        </div>

        <div>
          <Link to="/create">
            <button className="btn btn-primary">Post a Gig</button>
          </Link>

          <button className="btn btn-logout" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>

      <input
        type="text"
        className="home-search"
        placeholder="Search jobs by title..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <br />
      <br />

      {filteredGigs.length === 0 && <p className="empty-text">No jobs found</p>}

      {filteredGigs.map((gig) => (
        <div key={gig._id} className="gig-card">
          <h3 className="gig-title">{gig.title}</h3>
          <p className="gig-desc">{gig.description}</p>
          <p className="gig-status">Status: {gig.status}</p>

          <div className="gig-actions">
            <Link to={`/bids/${gig._id}`}>
              <button className="btn btn-secondary">View Bids</button>
            </Link>

            <Link to={`/bid/${gig._id}`}>
              <button className="btn btn-primary">Place Bid</button>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
