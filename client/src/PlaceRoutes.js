import { NavBar } from "./components/NavBar";
import { Route, Routes } from "react-router-dom";
import { AddPlace } from './pages/place/AddPlace'
import { AllPlaces } from "./pages/place/AllPlaces";
import { DisplayPlaces } from "./pages/place/DisplayPlaces"

export function PlaceRoutes() {
    return (
        <div className="App">
            <NavBar/>
            <Routes>
                <Route path="/addPlace" element={<AddPlace />} />
                <Route path="/allPlaces" element={<AllPlaces />} />
                <Route path="/displayPlaces" element={<DisplayPlaces />} />
            </Routes>
        </div>
    );
}