import { Routes, Route } from "react-router-dom";
import { ProductPage } from "./pages/entrepreneur/ProductPage";
import { UseUserContext } from "./hooks/useUserContext";
import { EntrepreneurLandingPage } from "./pages/entrepreneur/EntrepreneurLandingPage";
import { NavBar } from "./components/NavBar";
import { SideMenu } from "./pages/entrepreneur/SideMenu";
import { AddProductRequest } from "./pages/entrepreneur/AddProductRequest";
import { Profile } from "./pages/entrepreneur/Profile";
import { ChangeProfile } from "./pages/entrepreneur/ChangeProfile";
import { Notification } from "./pages/entrepreneur/Notification";
import { DiscussionRequest } from "./pages/entrepreneur/DiscussionRequest";

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
            {user.role === "Entrepreneur" && (
              <>
                <Route path="/add-product" element={<AddProductRequest />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/edit-profile" element={<ChangeProfile />} />
                <Route path="/notifications" element={<Notification />} />
                <Route path="/messages" element={<DiscussionRequest />} />
              </>
            )}
          </Routes>
        </>
      ) : (
        <>
          <NavBar />
          <Routes>
            <Route path="/" element={<ProductPage />} />
          </Routes>
        </>
      )}
    </div>
  );
}
