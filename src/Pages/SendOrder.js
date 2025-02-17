import React, { useState } from "react";
import Header from "../Shared/Hader.js";

export default function SendOrder() {
  const [SocialNumber, setSocialNumber] = useState("");
  const [cardNumber, setCardNumber] = useState("");

  const [firstName, setFirstName] = useState("");
  const [secondName, setSecondName] = useState("");
  const [thirdName, setThirdName] = useState("");
  const [lastName, setLastName] = useState("");
  const [errors, setErrors] = useState({});
  var [RequstNotification, setRequstNotification] = useState();
  var x;
  const validateForm = () => {
    const newErrors = {};

    if (!SocialNumber || !cardNumber) {
      newErrors.SocialNumber = "SocialNumber and cardNumber are  required";
    } else if (SocialNumber.length !== 10) {
      newErrors.SocialNumber = "SocialNumber must be 8 characters";
    } else if (cardNumber.length !== 8) {
      newErrors.cardNumber = "cardNumber must be 8 characters";
    }
    if (!firstName || !secondName || !thirdName || !lastName) {
      newErrors.firstName = "All data  are  required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const checked = async (e) => {};

  const handleSubmit = async (e) => {
    debugger;
    e.preventDefault();
    if (!validateForm()) {
      return; // If form is not valid, do not proceed
    }
    debugger;

    try {
      const response = await fetch(
        `https://localhost:7241/api/order/CheckedTheUserOrder/${localStorage.getItem(
          "UseId"
        )}`
      );
      if (response.ok) {
        const data = await response.json();
        setRequstNotification(data.message);
        x = data.message;
        if (x === 1) {
          alert(`You have already request `);
          return;
        } else {
          const response = await fetch(
            "https://localhost:7241/api/order/AddOrder",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                SocialNumber: SocialNumber,
                CardNumber: cardNumber,
                FirstName: firstName,
                SecondName: secondName,
                ThirdName: thirdName,
                LastName: lastName,
                UserId: localStorage.getItem("UseId"),
                //  MessagePresident: "",
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
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      //  setError(error.message); // Set error state if needed
    }

    setCardNumber("");
    setFirstName("");
    setSecondName("");
    setThirdName("");
    setLastName("");
    setSocialNumber("");
  };
  return (
    <div>
      <div>
        <React.Fragment>
          <Header></Header>
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                {/* <h5 className="mt-2">Edit User {userId}</h5>
            <h5 className="mt-2">Edit User {Email}</h5> */}

                <p className="text-success"> {} </p>
                <form>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-lable">Social Number</label>
                        <input
                          type="text"
                          name="socialNumber"
                          className="form-control"
                          value={SocialNumber}
                          onChange={(e) => {
                            setSocialNumber(e.target.value);
                          }}
                        />
                        {errors.SocialNumber && (
                          <p style={{ color: "red" }}>{errors.SocialNumber}</p>
                        )}{" "}
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-lable">Card Number </label>
                        <input
                          type="text"
                          name="email"
                          className="form-control"
                          value={cardNumber}
                          onChange={(e) => {
                            setCardNumber(e.target.value);
                          }}
                        />{" "}
                        {errors.cardNumber && (
                          <p style={{ color: "red" }}>{errors.cardNumber}</p>
                        )}{" "}
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-lable"></label>First Name
                        <input
                          type="text"
                          name="phone"
                          className="form-control"
                          value={firstName}
                          onChange={(e) => {
                            setFirstName(e.target.value);
                          }}
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-lable">Second Name</label>
                        <input
                          type="text"
                          name="address"
                          className="form-control"
                          value={secondName}
                          onChange={(e) => {
                            setSecondName(e.target.value);
                          }}
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-lable">Third Name</label>
                        <input
                          type="text"
                          name="address"
                          className="form-control"
                          value={thirdName}
                          onChange={(e) => {
                            setThirdName(e.target.value);
                          }}
                        />
                      </div>
                    </div>{" "}
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-lable">Last Name</label>
                        <input
                          type="text"
                          name="address"
                          className="form-control"
                          value={lastName}
                          onChange={(e) => {
                            setLastName(e.target.value);
                          }}
                        />
                      </div>
                      {errors.firstName && (
                        <p style={{ color: "red" }}>{errors.firstName}</p>
                      )}{" "}
                    </div>
                    <div className="col-md-12">
                      <div className="mb-3">
                        <label className="form-lable"></label>
                        <button
                          name="submit"
                          className="btn btn-success btn-lg"
                          onClick={handleSubmit}
                        >
                          Add
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </React.Fragment>
      </div>
    </div>
  );
}
