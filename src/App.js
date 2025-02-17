import { DropDownButtonComponent } from "@syncfusion/ej2-react-splitbuttons";
import React, { useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { RxDropdownMenu } from "react-icons/rx"; // Importing the desired icon
import {
  Route,
  BrowserRouter as Router,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import "./App.css";
import AddNewGroup from "./Component/AddNewGroup";
import AddNewUser from "./Component/AddNewUser";
import EditeDataGroup from "./Component/EditDataGroup";
import EditeInfoUser from "./Component/EditeInfoUser";
import ShowUsersInGroup from "./Component/ShowUsersInGroup";
import A from "./Pages/A";
import ApprovalPresident from "./Pages/ApprovalPresident";
import D from "./Pages/D";
import DataGroupUser from "./Pages/DataGroupUser";
import DataInfoUser from "./Pages/DataInfoUser";
import E from "./Pages/E";
import F from "./Pages/F";
import GroupA from "./Pages/GroupA";
import GroupB from "./Pages/GroupB";
import HomePage from "./Pages/HomePage";
import LoginPage from "./Pages/LoginPage";
import ProfilePage from "./Pages/ProfilePage";
import RegistrationPage from "./Pages/RegistrationPage";
import SendOrder from "./Pages/SendOrder";
import ApprovalManager from "./Pages/ApprovalManager";
// let emaill = "";
// let pas = "x";
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/security/groups" element={<DataGroupUser />} />
          <Route
            path="/ShowUsersInGroup/:id/:groupName"
            element={<ShowUsersInGroup />}
          />

          <Route path="/AddNewgroup" element={<AddNewGroup />} />

          <Route path="/groupA" element={<GroupA />} />
          <Route path="/groupB" element={<GroupB />} />
          <Route path="/addNewUser" element={<AddNewUser />} />
          <Route path="/editeInfoUser/:id" element={<EditeInfoUser />} />
          <Route path="/EditeDataGroup/:id" element={<EditeDataGroup />} />

          <Route path="/" element={<LoginPage />} />
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="/homePage" element={<HomePage />} />
          <Route path="/hello" element={<ProfilePage />} />

          <Route path="/security/user" element={<DataInfoUser />} />

          <Route path="/admin/a" element={<A />} />
          <Route path="/admin/b" element={<SendOrder />} />
          <Route path="/admin/c" element={<ApprovalPresident />} />
          <Route path="/admin/ApprovalManager" element={<ApprovalManager />} />

          <Route path="/public/d" element={<D />} />
          <Route path="/public/e" element={<E />} />
          <Route path="/public/f" element={<F />} />
        </Routes>
      </Router>
    </div>
  );
}

// function ClickButton() {
//   return <button onClick={AnotherPage}> Login </button>;
// }

// function FormLogin() {
//   const [action, setAction] = useState(false);
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const navigetor = useNavigate();
//   const anotherPage = (e) => {
//     e.preventDefault();

//     // eslint-disable-next-line no-undef
//     navigetor("/AnotherPageSubmit");
//   };
//   <form onSubmit={anotherPage}>
//     <div>
//       <label>
//         Email :
//         <input
//           type="text"
//           name="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />
//       </label>
//     </div>
//     <div>
//       <label>
//         Password :
//         <input
//           type="text"
//           name="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />
//       </label>
//     </div>
//     <input type="submit" value="Login " />
//   </form>;
// }
// src/Login.js
var t = "";
function FormLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [getTokenCheck, setTokenCHECK] = useState(false);

  const handleSubmit = async (e) => {
    // emaill = email;
    // pas = password;
    debugger;

    e.preventDefault();

    if (localStorage.getItem("token") == null) {
      const responseStored = await fetch(
        "https://localhost:7241/api/auth/stored",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );
      if (responseStored.ok) {
        const data = await responseStored.json();

        if (data.result === 0) {
          alert(data.masseg);
          console.log(data.result);
        } else {
          alert(data.masseg);
          const response = await fetch(
            "https://localhost:7241/api/auth/token",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ email, password }),
            }
          );

          if (response.ok) {
            const data = await response.json();
            const token = data.token;
            t = data.token;
            console.log("Token received: ", token);
            console.log("data  ", data.email);

            localStorage.setItem("token", token);
            localStorage.setItem("email", data.email);
            localStorage.setItem("password", data.password);

            navigate("/homePage", {});
            // navigate("/hello", {
            //   state: {
            //     email: data.email,
            //     token: token,
            //     password: data.password,
            //   },
            // });
          } else {
            const errorText = await response.text();
            console.error("Error response:", errorText);

            alert("Login failed. Please check your credentials.");
          }

          const res = await fetch("https://localhost:7241/api/auth/cookies", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
            // body: JSON.stringify({
            //   email,
            //   password,
            //   token: localStorage.getItem("token"),
            // }),

            body: JSON.stringify({
              email,
              password,
              token: t,
            }),
          });

          if (res.ok) {
            alert("Token sent as a cookie successfully.");
          } else {
            console.error("Failed to set cookie.");
          }
        }
      }
    } else {
      navigate("/homePage", {});
    }
  };

  //   const response = await fetch("https://localhost:7241/api/auth/token", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({ email, password }),
  //   });

  //   if (response.ok) {
  //     const data = await response.json();
  //     const token = data.token;
  //     t = data.token;
  //     console.log("Token received: ", token);
  //     console.log("data  ", data.email);

  //     localStorage.setItem("token", token);
  //     localStorage.setItem("email", data.email);
  //     localStorage.setItem("password", data.password);

  //     navigate("/hello", {
  //       state: {
  //         email: data.email,
  //         token: token,
  //         password: data.password,
  //       },
  //     });
  //   } else {
  //     const errorText = await response.text();
  //     console.error("Error response:", errorText);

  //     alert("Login failed. Please check your credentials.");
  //   }

  //   const res = await fetch("https://localhost:7241/api/auth/cookies", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     credentials: "include", // Important: include cookies
  //     // body: JSON.stringify({
  //     //   email,
  //     //   password,
  //     //   token: localStorage.getItem("token"),
  //     // }),

  //     body: JSON.stringify({
  //       email,
  //       password,
  //       token: t,
  //     }),
  //   });

  //   if (res.ok) {
  //     console.log("Token sent as a cookie successfully.");
  //   } else {
  //     console.error("Failed to set cookie.");
  //   }

  // };
  const handleSubmit2 = (e) => {
    navigate("register");
  };
  return (
    <div style={{}}>
      <h2>Login Page</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="">
            Email:{" "}
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label htmlFor="">
            {" "}
            Password :{" "}
            <input
              type="text"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
        </div>
        <button type="submit">Submit</button>
      </form>

      <div>
        <label htmlFor="">
          {" "}
          <button onClick={handleSubmit2}>Rigstration </button>
        </label>
      </div>
    </div>
  );
}

function RegistrationPage1() {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [ConfirmPassword, setConFirmPassword] = useState("");
  const [gender, setGender] = useState("");
  const [birthDate, setBirthDate] = useState("");

  const [SoicalNumber, setsocialNumber] = useState("");
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const validateForm = () => {
    const newErrors = {};

    if (!Email) {
      newErrors.email = "Email is required";
    }

    // else if (!/\S+@\S+\.\S+/.test(Email)) {
    //   newErrors.email = "Email is invalid";
    // }

    if (!Password) {
      newErrors.password = "Password is required";
    }
    // else if (Password.length < 8) {
    //   newErrors.password = "Password must be at least 8 characters";
    // }

    if (!ConfirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (Password !== ConfirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    debugger;
    if (!validateForm()) {
      return; // If form is not valid, do not proceed
    }

    const response = await fetch(
      "https://localhost:7241/api/Registration/registr",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Email,
          Password,
          ConfirmPassword,
          SoicalNumber,
          gender,
          birthDate,
        }),
      }
    );

    if (response.ok) {
      const data = await response.json();
      var m = data.message;
      alert(`Success: ${m}`);
    } else {
      console.error("Failed to data ");
      alert("Failed to data");
    }
  };

  return (
    <div>
      <h3>Registr Page</h3>
      <form action="" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="">
            Email:{" "}
            <input
              type="text"
              value={Email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <p style={{ color: "red" }}>{errors.email}</p>} {}
          </label>
        </div>
        <div>
          <label htmlFor="">
            {" "}
            Password :{" "}
            <input
              type="text"
              value={Password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && (
              <p style={{ color: "red" }}>{errors.password}</p>
            )}{" "}
            {}
          </label>
        </div>

        <div>
          <label htmlFor="">
            {" "}
            Confirm Password :{" "}
            <input
              type="text"
              value={ConfirmPassword}
              onChange={(e) => setConFirmPassword(e.target.value)}
            />
            {errors.confirmPassword && (
              <p style={{ color: "red" }}>{errors.confirmPassword}</p>
            )}{" "}
            {/* Display confirm password error */}
          </label>
        </div>

        <div>
          <label htmlFor="">
            {" "}
            Soical Number :{" "}
            <input
              type="text"
              value={SoicalNumber}
              onChange={(e) => setsocialNumber(e.target.value)}
            />
          </label>
        </div>

        <div>
          <label htmlFor="">
            {" "}
            Gender :{" "}
            <label>
              <input
                type="radio"
                name="gender"
                value="male"
                checked={gender === "male"}
                onChange={(e) => {
                  setGender(e.target.value);
                }}
              ></input>
              Male
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="female"
                checked={gender === "female"}
                onChange={(e) => {
                  setGender(e.target.value);
                }}
              ></input>
              Female
            </label>
          </label>
        </div>

        <div>
          <label htmlFor="">
            {" "}
            Birh Date :{" "}
            <input
              type="date"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
            />
          </label>
        </div>
        <h1>{birthDate}</h1>
        <h1>{gender}</h1>

        <button type="submit">Submit</button>
      </form>

      <input
        value={" Login "}
        type="button"
        onClick={() => {
          navigate("/");
        }}
      ></input>
    </div>
  );
}

function AnotherPageSubmit() {
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
  return (
    <div>
      <header className="App-header">
        {/* <h1>My Header</h1> Header title or logo */}
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
      </header>
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
function dropDownMenu() {
  let items = [{ text: "Email" }, { text: "logout " }];
  return (
    <div>
      <DropDownButtonComponent items={items} iconCss="ddb-icons e-message">
        {" "}
        Message{" "}
      </DropDownButtonComponent>
    </div>
  );
}
function DropDown(props) {
  const handleLogOut = (e) => {};
  // return (
  //   <div>
  //     <select iconCss="RxDropdownMenu">
  //       <option value={localStorage.getItem("email")}>Email </option>
  //       <option onClick={handleLogOut} value="option2">
  //         LogOut
  //       </option>
  //       <option value="option3">Option 3</option>
  //     </select>
  //   </div>
  // );

  return (
    <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        Dropdown Button
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
        <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

// function HomePage() {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const password = localStorage.getItem("password");

//   const email = localStorage.getItem("email");
//   const token = localStorage.getItem("token");

//   const handleSubmit2 = (e) => {
//     navigate("/hello", {
//       state: {
//         email: localStorage.getItem("email"),
//         token: localStorage.getItem("token"),
//         password: localStorage.getItem("password"),
//       },
//     });
//   };

//   const handleLogOut = (e) => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("email");
//     localStorage.removeItem("password");
//     navigate("/");
//   };

//   let items = [{ text: "Email" }, { text: "logout " }];

//   const [isOpen, setIsOpen] = useState(false);

//   const toggleDropdown = () => setIsOpen(!isOpen);
//   return (
//     <div>
//       <header className="App-header">
//         {/* <h1>My Header</h1> Header title or logo */}
//         <div
//           style={{ position: "absolute", right: "25px" }}
//           className="dropdown"
//         >
//           <button className="dropdown-toggle" onClick={toggleDropdown}>
//             <RxDropdownMenu />
//           </button>

//           {isOpen && (
//             <div className="dropdown-menu">
//               <p style={{ color: "black" }}>{email}</p>

//               <button className="dropdown-item" onClick={handleSubmit2}>
//                 Profile Page
//               </button>
//               <button className="dropdown-item" onClick={handleLogOut}>
//                 Log Out
//               </button>
//               <button className="dropdown-item">Something else</button>
//             </div>
//           )}
//         </div>
//       </header>

//       <h1>Welcome any time </h1>
//     </div>
//   );
// }

export default App;
