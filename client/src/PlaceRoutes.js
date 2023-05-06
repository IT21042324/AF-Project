import { NavBar } from "./components/NavBar";
import { Route, Routes } from "react-router-dom";
import { DisplayPlaces } from "./pages/place/DisplayPlaces"

export function PlaceRoutes() {
    return (
        <div className="App">
            <NavBar/>
            <Routes>
                <Route path="/displayPlaces" element={<DisplayPlaces />} />
            </Routes>
        </div>
    );
}