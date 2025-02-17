import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

export default function RegistrationPage() {
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
