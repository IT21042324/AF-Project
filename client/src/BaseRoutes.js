import { Login } from "./components/Login";
import { Register } from "./components/Register";
import { NavBar } from "./components/NavBar";
import { Route, Routes } from "react-router-dom";
import { DisplayPlaces } from "./pages/place/DisplayPlaces";

export const BaseRoutes = () => {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<DisplayPlaces />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
};
