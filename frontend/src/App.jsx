import { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register";
import Page404 from "./pages/Page404";
import AuthRequiringRoutes from "./components/Authrequired";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "./constants";
import { useContext } from "react";
import { MyContext } from "./MyContext";
import api from "./api";

const RegisterAndLogout = () => {
  localStorage.clear();
  return <Register />;
};

function App() {
  const { me, setMe } = useContext(MyContext);
  const [error, setError] = useState(null);
  const [myinfo, setMyInfo] = useState(null);

  useEffect(() => {
    const fetchMyData = async () => {
      try {
        const response = await api.get(`/api/showme`);
        setMe(response.data);
        console.log(response.data);
        setMyInfo(response.data);
      } catch (error) {
        if (error.response) {
          setError(
            `Error: ${error.response.status} - ${error.response.statusText}`
          );
        } else if (error.request) {
          setError("Error: No response received from server");
        } else {
          setError(`Error: ${error.message}`);
        }
      } finally {
        console.log(myinfo);
      }
    };
    fetchMyData();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <AuthRequiringRoutes>
              <Home />
            </AuthRequiringRoutes>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegisterAndLogout />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
