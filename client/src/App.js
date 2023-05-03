import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Login } from "./components/Login";
import { Register } from "./components/Register";
import { NavBar } from "./components/NavBar";
import { AddPlace } from "./pages/place/AddPlace";
import { AllPlaces } from "./pages/place/AllPlaces";
import { DisplayPlaces } from "./pages/place/DisplayPlaces";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/addPlace" element={<AddPlace />} />
        <Route path="/allPlaces" element={<AllPlaces />} />
        <Route path="/displayPlaces" element={<DisplayPlaces/>} />
      </Routes>
    </div>
  );
}

export default App;
