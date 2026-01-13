import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import CreateGig from "./pages/CreateGig";
import PlaceBid from "./pages/PlaceBid";
import Bids from "./pages/Bids";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />

      <Route
        path="/create"
        element={
          <ProtectedRoute>
            <CreateGig />
          </ProtectedRoute>
        }
      />

      <Route
        path="/bid/:gigId"
        element={
          <ProtectedRoute>
            <PlaceBid />
          </ProtectedRoute>
        }
      />

      <Route
        path="/bids/:gigId"
        element={
          <ProtectedRoute>
            <Bids />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
