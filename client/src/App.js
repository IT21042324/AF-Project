import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Login } from "./components/Login";
import { Register } from "./components/Register";
import { EntrepreneurPage } from "./pages/entrepreneur/Entrepreneur";
import { NavBar } from "./components/NavBar";
import { AddEvent } from "./pages/culturalEvents/addEvent";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/addEvent" element={<AddEvent />} />
      </Routes>
    </div>
  );
}

export default App;
