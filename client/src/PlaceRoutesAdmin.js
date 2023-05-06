import { Route, Routes } from "react-router-dom";
import { AdminMainPage } from "./pages/place/AdminMainPage";
import { AdminSideMenu} from "./components/AdminSideMenu";
import { AddPlace } from './pages/place/AddPlace'
import { AllPlaces } from "./pages/place/AllPlaces";

export function PlaceRoutesAdmin() {
    return (
        <div className="App">  
            <AdminSideMenu/>
            <Routes>
                <Route path="/adminPlace" element={<AdminMainPage/>}/>
                <Route path="/addPlace" element={<AddPlace />} />
                <Route path="/allPlaces" element={<AllPlaces />} />
            </Routes>
        </div>
    );
}