import { Routes, Route, Navigate } from "react-router-dom";
import { Home } from "./pages/Home/Home.jsx";
import { UnsupportedDevice } from "./pages/UnsupportedDevice/UnsupportedDevice.jsx";
import './App.css'

function userIsMobile() {
  return /Mobi|Android|iPhone|iPad|iPod/i.test(window.navigator.userAgent);
}

export default function App() {
  const isMobile = userIsMobile();
  return (
    <>
      <Routes>
      <Route path="/" element={isMobile ? <Home /> : <Navigate to="/UnsupportedDevice" />} />
      <Route path="/UnsupportedDevice" element={isMobile ? <Navigate to="/" /> : <UnsupportedDevice />} />
      </Routes>
    </>
  );
};
