import { Routes, Route } from "react-router-dom";
import { ProductPage } from "./pages/entrepreneur/ProductPage";
import { UseUserContext } from "./context/useUserContext";
import { EntrepreneurLandingPage } from "./pages/entrepreneur/EntrepreneurLandingPage";
import { NavBar } from "./components/NavBar";
import { SideMenu } from "./components/SideMenu";
import { AddProductRequest } from "./pages/entrepreneur/AddProductRequest";
import { Profile } from "./pages/entrepreneur/Profile";
import { ChangeProfile } from "./pages/entrepreneur/ChangeProfile";
import { Notification } from "./pages/entrepreneur/Notification";

export function EntrepreneurshipRoutes() {
  const { getUser } = UseUserContext();
  const user = getUser();

  return (
    <div className="App">
      {user?.role === "Entrepreneur" ? (
        <>
          <SideMenu />
          <Routes>
            <Route path="/" element={<EntrepreneurLandingPage />} />
            <Route path="/add-product" element={<AddProductRequest />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/edit-profile" element={<ChangeProfile />} />
            <Route path="/notifications" element={<Notification />} />
          </Routes>
        </>
      ) : (
        <>
          <NavBar entrepreneurPageIsClicked={true} />
          <Routes>
            <Route path="/" element={<ProductPage />} />
          </Routes>
        </>
      )}
    </div>
  );
}
