import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../App.css";
import CheckNotLogin from "../Shared/CheckNotLogin";
import Header from "../Shared/Hader";
export default function ProfilePage() {
  const location = useLocation();
  const navigate = useNavigate();
  const password = localStorage.getItem("password");

  const email = localStorage.getItem("email");
  const token = localStorage.getItem("token");

  const handleSubmit22 = (e) => {
    navigate("/");
  };
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

  let items = [{ text: "Email" }, { text: "logout " }];

  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

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
        >
          {" "}
        </Header>

        {/* <header className="App-header">
    <h1>My Header</h1> Header title or logo 
        <div
          style={{ position: "absolute", right: "25px" }}
          className="dropdown"
        >
          <button className="dropdown-toggle" onClick={toggleDropdown}>
            <RxDropdownMenu />
          </button>

          {isOpen && (
            <div className="dropdown-menu">
              <p style={{ color: "black" }}>{email}</p>

              <button className="dropdown-item" onClick={handleSubmit2}>
                Profile Page
              </button>
              <button className="dropdown-item" onClick={handleLogOut}>
                Log Out
              </button>
              <button className="dropdown-item">Something else</button>
            </div>
          )}
        </div>
      </header> */}
        <h1> Helloooooooo </h1>
        {/* <h3>Email:{emaill} </h3>
      <h3>Password: {pas} </h3> */}
        <h3>Email:{email} </h3>
        <h3 style={{ backgroundColor: "yellow" }}>token: {token} </h3>
        <h3>Email :{email}</h3>
        {/* <h3>Password :{location?.state?.password}</h3> */}
        <h3>Password :{password}</h3>
        {/* <button onClick={handleSubmit22}>go back</button> */}
      </div>
    );
  }
}
