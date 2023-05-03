import { Routes, Route } from "react-router-dom";
import { ProductPage } from "./pages/entrepreneur/ProductPage";
import { UseUserContext } from "./context/useUserContext";
import { EntrepreneurLandingPage } from "./pages/entrepreneur/EntrepreneurLandingPage";
import { NavBar } from "./components/NavBar";
import { SideMenu } from "./components/SideMenu";

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
            <Route path="/frontPage" />
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
