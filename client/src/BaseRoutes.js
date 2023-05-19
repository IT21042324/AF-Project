import { Login } from "./components/Login";
import { Register } from "./components/Register";
import { NavBar } from "./components/NavBar";
import { Navigate, Route, Routes } from "react-router-dom";
import { DisplayPlaces } from "./pages/place/DisplayPlaces";
import { UseUserContext } from "./hooks/useUserContext";

export const BaseRoutes = () => {
  const { getUser } = UseUserContext();
  const user = getUser();
  return (
    <div className="App">
      {user?.role === "Entrepreneur" ? (
        <Navigate to="/entrepreneurship" />
      ) : user?.role === "Admin" ? (
        <Navigate to="/admin" />
      ) : (
        <div>
          <NavBar />
          <Routes>
            <Route path="/" element={<DisplayPlaces />} />
            {!user?.role && (
              <>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
              </>
            )}
          </Routes>
        </div>
      )}
    </div>
  );
};
