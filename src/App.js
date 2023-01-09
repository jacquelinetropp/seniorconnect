import React, { useContext } from "react";
import Home from "./pages/Home";
import Register from "./pages/Register";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import "./style.scss";
import Login from "./pages/Login";
import { AuthContext } from "./context/AuthContext";
import Doctors from "./pages/Doctors";
import Residents from "./pages/Residents";

function App() {
  const { currentUser } = useContext(AuthContext);

  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/login" />;
    }
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={currentUser ? <Home /> : <Login />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="doctors" element={<Doctors />} />
          <Route path="residents" element={<Residents />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
