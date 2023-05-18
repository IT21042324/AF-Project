import "./App.css";
import { Route, Routes } from "react-router-dom";
import { BaseRoutes } from "./BaseRoutes";
import { EntrepreneurshipRoutes } from "./EntrepreneurshipRoutes";
import { AccommodationRoutes } from "./AccommodationRoutes";
import { CulturalEventsRoutes } from "./CulturalEventRoutes";
import { AdminRoutes } from "./AdminRoutes";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/*" element={<BaseRoutes />} />
        <Route
          path="/entrepreneurship/*"
          element={<EntrepreneurshipRoutes />}
        />
        <Route path="/admin/*" element={<AdminRoutes />} />
        <Route path="/Accommodations/*" element={<AccommodationRoutes />} />

        <Route path="/cultural/*" element={<CulturalEventsRoutes />} />
      </Routes>
    </div>
  );
}
export default App;
