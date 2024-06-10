import { BrowserRouter } from "react-router-dom";
import All_routes from "./All_routes";
import Navbar from "./components/Navbar/Navbar";
import "./App.css";
import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";

function App() {
  const token = localStorage.getItem("Profile");

  const handleLogOut = () => {
    localStorage.clear();
  };

  useEffect(() => {
    if (token) {
      const decodedToken = jwtDecode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) {
        console.log("log out");
        handleLogOut();
      }
    }
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <All_routes />
      </BrowserRouter>
    </div>
  );
}

export default App;
