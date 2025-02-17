import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import { SideBarData,getDataPermission } from "../Component/SideBarData";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

// export  const [sideBarData,setSideBarData]=([])





// const  getDataPermission=async (e)=>
// {
//   try {
//     debugger;
//     const response = await fetch(
//       `https://localhost:7241/api/GetMainMenu/getMenuInUser/${localStorage.getItem("UseId")}`,

//     );
//     if (response.ok) {
//       const data = await response.json();
//       setSideBarData(data);

//     }
//   } catch (error) {
//     console.error("Error fetching data:", error);
//   }


// }

  useEffect(() => {
    if (localStorage.getItem("token") != null) {
      debugger;
      navigate("/homePage");







      // eslint-disable-next-line react/jsx-no-undef
    }
  }, []);
  const handleSubmit = async (e) => {
    // emaill = email;
    // pas = password;
    debugger;
    var t = "";
    e.preventDefault();

    if (localStorage.getItem("token") == null) {
      debugger;
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

          //getDataPermission();
          getDataPermission();
          localStorage.setItem("UseId", data.result);
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
      navigate("/homePage");
    }
  };

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
