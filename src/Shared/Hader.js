// import React from "react";
// import { RxDropdownMenu } from "react-icons/rx"; // Importing the desired icon
// import { useNavigate } from "react-router-dom";
// import "../App.css";

// import Sidebar from "../Component/SideBar";

// export default function Header(props) {
//   const navigate = useNavigate();

//   return (
//   <div>  <header className="App-header">

//   {/* <h1>My Header</h1> Header title or logo */}
//   <div style={{ position: "absolute", right: "25px" }} className="dropdown">

//     <button className="dropdown-toggle" onClick={props.toggleDropdown}>
//       <RxDropdownMenu />
//     </button>

//     {props.isOpen && (
//       <div className="dropdown-menu">
//         <p style={{ color: "black" }}>{props.email}</p>

//         <button className="dropdown-item" onClick={props.handleSubmit2}>
//           Profile Page
//         </button>

//         <button
//           className="dropdown-item"
//           onClick={(e) => navigate("/homePage")}
//         >
//           Home Page
//         </button>

//         <button className="dropdown-item" onClick={props.handleLogOut}>
//           Log Out
//         </button>
//       </div>
//     )}

//   </div>
// </header>
// </div>
//   );
// }
import React, { useState } from "react";
import * as FaIcons from "react-icons/fa";
import { RxDropdownMenu } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import "../App.css";
import Sidebar from "../Component/SideBar";
// import React from "react";
// import { RxDropdownMenu } from "react-icons/rx"; // Importing the desired icon
// import { useNavigate } from "react-router-dom";
// import "../App.css";

// import Sidebar from "../Component/SideBar";

export default function Header(props) {
  const [sidebar, setSidebar] = useState(false);
  const navigate = useNavigate();
  const [IsOpen, setIsOpen] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);
  const handleLogOut = (e) => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("password");
    navigate("/");
  };

  return (
    <div>
      <header className="App-header">
        {/* Sidebar toggle button */}

        <div style={{ position: "absolute", left: "25px" }}>
          {" "}
          {/* <button onClick={showSidebar}>
            <FaIcons.FaBars /> 
          </button>
         */}
          <FaIcons.FaBars onClick={showSidebar} />
        </div>

        {/* <div>
          <button
            style={{ position: "absolute", right: "25px" }}
            onClick={() => setOpenProfile(!openProfile)}
          >
            <RxDropdownMenu />
          </button>
          {openProfile && (
            <div>
              <ul className="flex flex-col gap-4">
                <li>Profile </li>
                <li>Setting</li>
                <li>LogOut</li>
              </ul>
            </div>
          )}
        </div> */}

        <div>
          <button
            style={{ position: "absolute", right: "25px", top: "25px" }}
            onClick={() => setIsOpen(!IsOpen)}
          >
            <RxDropdownMenu />
          </button>
          {IsOpen && (
            <div className="flex flex-col dropDownProfile">
              <p style={{ color: "black", fontSize: ".7em" }}>{props.email}</p>

              <button className="dropdown-button" onClick={props.handleSubmit2}>
                Profile Page
              </button>

              <button
                className="dropdown-button"
                onClick={() => navigate("/homePage")}
              >
                Home Page
              </button>

              <button className="dropdown-button" onClick={handleLogOut}>
                Log Out
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Sidebar component */}
      <Sidebar sidebar={sidebar} showSidebar={showSidebar} />
    </div>
  );
}
