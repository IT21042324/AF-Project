import "./App.css";
import { Route, Routes } from "react-router-dom";
import { BaseRoutes } from "./BaseRoutes";
import { EntrepreneurshipRoutes } from "./EntrepreneurshipRoutes";
import { AdminRoutes } from "./AdminRoutes";
import { AccommodationRoutes } from "./AccommodationRoutes";
import { PlaceRoutes } from "./PlaceRoutes";
import { PlaceRoutesAdmin } from "./PlaceRoutesAdmin";


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

        {/* Accommodation Routes */}
        <Route
          path="/Accommodations/*"
          element={<AccommodationRoutes />}
        />

        <Route
          path="/placeRoutes/*"
          element={<PlaceRoutes />}
        />

        <Route
          path="/placeRoutesAdmin/*"
          element={<PlaceRoutesAdmin />}
        />
      </Routes>


    </div >
  );
}

export default App;
