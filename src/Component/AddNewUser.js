import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Shared/Hader.js";

export default function AddNewUser() {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [ConfirmPassword, setConFirmPassword] = useState("");
  const [gender, setGender] = useState("");
  const [birthDate, setBirthDate] = useState("");

  const [SoicalNumber, setsocialNumber] = useState("");
  const [userId, SetUserId] = useState();
  const navigate = useNavigate();
  const [groups, setGroups] = useState([]);
  const [GroupId, setSelectedGroup] = useState();
  const groupIdToSend = GroupId ? GroupId : null;

  const handleSubmit = async (e) => {
    debugger;
    // if (!validateForm()) {
    //   return; // If form is not valid, do not proceed
    // }

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
          GroupId: groupIdToSend,
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
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          "https://localhost:7241/api/Group/getAllGroups"
        );
        if (response.ok) {
          const data = await response.json();
          setGroups(data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchUsers();
  }, [groups]);
  return (
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
                      <label className="form-lable">Email</label>
                      <input
                        type="text"
                        name="username"
                        className="form-control"
                        value={Email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-lable">ConfirmPassword</label>
                      <input
                        type="text"
                        name="email"
                        className="form-control"
                        value={ConfirmPassword}
                        onChange={(e) => {
                          setConFirmPassword(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-lable">Password</label>
                      <input
                        type="text"
                        name="phone"
                        className="form-control"
                        value={Password}
                        onChange={(e) => {
                          setPassword(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-lable">SoicalNumber</label>
                      <input
                        type="text"
                        name="address"
                        className="form-control"
                        value={SoicalNumber}
                        onChange={(e) => {
                          setsocialNumber(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                  {/* <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-lable">Group </label>
                      <select
                        name="Group"
                        className="form-control"
                        value={gender}
                        //  onChange={}
                      >
                        <option value="">--Please Select--</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                      </select>
                    </div>
                  </div> */}
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-lable">Group </label>
                      <select
                        name="Group"
                        className="form-control"
                        value={GroupId}
                        onChange={(e) => {
                          setSelectedGroup(e.target.value);
                        }}
                        //  onChange={}      <select value={selectedGroup} onChange={handleSelectChange}>
                      >
                        <option value="">--Please Select--</option>
                        {/* <option value="male">Male</option>
                      <option value="female">Female</option> */}

                        {groups.map((groups, index) => (
                          <option value={groups.groupId}>
                            {groups.groupName}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
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
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
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
                  </div>
                  <div className="col-md-12">
                    <div className="mb-3">
                      <label className="form-lable"></label>
                      <button
                        name="submit"
                        className="btn btn-success btn-lg"
                        onClick={() => {
                          handleSubmit();
                        }}
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
  );
}
