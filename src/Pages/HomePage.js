import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import CheckNotLogin from "../Shared/CheckNotLogin";
// import CheckNotLogin from "../Shared/CheckNotLogin.js";
import Header from "../Shared/Hader.js";
export default function HomePage() {
  // useEffect({

  // })
  // const [isLogin, setIsLogin] = useState(false);

  // const location = useLocation();
  const navigate = useNavigate();
  const password = localStorage.getItem("password");

  const email = localStorage.getItem("email");
  const token = localStorage.getItem("token");

  const handleSubmit2 = (e) => {
    navigate("/hello", {
      state: {
        email: localStorage.getItem("email"),
        token: localStorage.getItem("token"),
        password: localStorage.getItem("password"),
      },
    });
  };

  const handleLogOut = (e) => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("password");
    navigate("/");
  };

  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  // const toggleDropdown = () => setIsOpen(!isOpen);

  if (localStorage.getItem("token") == null) {
    return <CheckNotLogin></CheckNotLogin>;
  } else {
    return (
      <div>
        <Header
          toggleDropdown={toggleDropdown}
          handleLogOut={handleLogOut}
          handleSubmit2={handleSubmit2}
          email={email}
          isOpen={isOpen}
        ></Header>
        <h1>Welcome any time {email}</h1>
      </div>
    );
  }
}
