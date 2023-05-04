import "./App.css";
import { Route, Routes } from "react-router-dom";
import { BaseRoutes } from "./BaseRoutes";
import { EntrepreneurshipRoutes } from "./EntrepreneurshipRoutes";
import { AccommodationRoutes } from "./AccommodationRoutes";
import { PlaceRoutes } from "./PlaceRoutes";


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/*" element={<BaseRoutes />} />
        <Route
          path="/entrepreneurship/*"
          element={<EntrepreneurshipRoutes />}
        />
        
        {/* Accommodation Routes */}
        <Route
          path="/Accommodations/*"
          element={<AccommodationRoutes />}
          
        <Route
          path="/placeRoutes/*"
          element={<PlaceRoutes />}
          
        />
      </Routes>
      
    </div>
  );
}

export default App;
