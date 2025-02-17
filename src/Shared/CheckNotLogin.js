import { useNavigate } from "react-router-dom";
import "../App.css";
import HomePage from "../Pages/HomePage";
export default function CheckNotLogin() {
  debugger;

  const navigate = useNavigate();
  return (
    <div>
      <h1>Please go to Login </h1>
      <button
        onClick={() => {
          navigate("/");
        }}
      >
        {" "}
        Login{" "}
      </button>
    </div>
  );
};
