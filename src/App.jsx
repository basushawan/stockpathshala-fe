import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Verification from "./pages/Verification";
import Classes from "./pages/Classes";
import Privacy from "./pages/Privacy";
import Navbar from "./components/Navbar";
import Profile from "./pages/Profile";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="pt-0 md:pt-[64px] pb-[64px] md:pb-0 min-h-screen bg-slate-100">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/verify" element={<Verification />} />
          <Route path="/classes" element={<Classes />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
