import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../Shared/Hader.js";

export default function Edituser() {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [ConfirmPassword, setConFirmPassword] = useState("");
  const [gender, setGender] = useState("");
  const [birthDate, setBirthDate] = useState("");

  const [SoicalNumber, setsocialNumber] = useState("");
  const [userId, SetUserId] = useState();
  const navigate = useNavigate();
  const [NewPassword, setNewPassword] = useState("");
  const [NewConfirmPassword, setNewConfirmPassword] = useState("");
  const [CurrentPassword, SetCurrentPassword] = useState("");
  const { id } = useParams();

  const [errors, setErrors] = useState({});
  const [groups, setGroups] = useState([]);
  const [GroupId, setSelectedGroup] = useState("");

  const [message, setMessage] = useState("");
  const validateForm = () => {
    const newErrors = {};

    if (!NewPassword) {
      newErrors.NewPassword = "Password is required";
    }

    if (!NewConfirmPassword) {
      newErrors.NewConfirmPassword = "Please confirm your password";
    } else if (NewPassword !== NewConfirmPassword) {
      newErrors.NewConfirmPassword = "Password does not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const UpdatePassword = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return; // If form is not valid, do not proceed
    }

    const response = await fetch(
      "https://localhost:7241/api/GetAllUsers/SendNewPassword",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          CurrentPassword: CurrentPassword,
          NewPassword: NewPassword,
          Email,
        }),
      }
    );
    debugger;
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
    debugger;
    const getUser = async () => {
      try {
        const reqData = await fetch(
          `https://localhost:7241/api/GetAllUsers/getDataUser/${id}`
        );

        if (reqData.ok) {
          const resData = await reqData.json();
          SetUserId(resData.userId || "");

          setEmail(resData.email || "");
          setsocialNumber(resData.soicalNumber || "");
          setBirthDate(resData.birthDate || "");
          setGender(resData.gender || "");
          setSelectedGroup(resData.groupId);
          // setConFirmPassword(resData.confirmPassword || "");
          // setPassword(resData.password || "");
        } else {
          console.error("Failed to fetch data: ", reqData.status);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    getUser();
  }, []); //

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

  const handleUpdate = async (e) => {
    //  e.preventDefault();
    debugger;
    const response = await fetch(
      `https://localhost:7241/api/GetAllUsers/UpdateUser/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Email,
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

  const SelectUserGroup = async (e) => {
    //e.preventDefault();
    debugger;
    const response = await fetch(
      `https://localhost:7241/api/GetAllUsers/UpdateUserGroup/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Email,
          GroupId,
        }),
      }
    );
    if (response.ok) {
      const data = await response.json();
      var m = data.message;
      alert(`Successsssssss: ${m}`);
    } else {
      console.error("Failed to data ");
      alert("Failed to data");
    }
  };

  return (
    <React.Fragment>
      <Header></Header>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h5 className="mt-2">Edit User {userId}</h5>
            <h5 className="mt-2">Edit User {Email}</h5>

            <p className="text-success"> {message} </p>
            <form
              onSubmit={() => {
                handleUpdate();
                navigate("/security/user");
              }}
            >
              <div className="row">
                {/* <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-lable">Email</label>
                    <input
                      type="text"
                      className="form-control"
                      value={Email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                    />
                  </div>
                </div> */}
                {/* <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-lable">Password</label>
                    <input
                      type="text"
                      className="form-control"
                      value={Password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                    />
                  </div>
                </div> */}
                {/* <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-lable">ConfirmPassword</label>
                    <input
                      type="text"
                      className="form-control"
                      value={ConfirmPassword}
                      onChange={(e) => {
                        setConFirmPassword(e.target.value);
                      }}
                    />
                  </div>
                </div> */}
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-lable">SoicalNumber</label>
                    <input
                      type="text"
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
                      value={GroupId}
                      onChange={(e) => {
                        setSelectedGroup(e.target.value);
                      }}
                      //  onChange={}
                    >
                      <option value="">--Please Select--</option>
                      {/* <option value="male">Male</option>
                      <option value="female">Female</option> */}
                {/*

                      {groups.map((groups, index) => (
                        <option value={groups.groupId}>
                          {groups.groupName}
                        </option>
                      ))}
                    </select>
                  </div>
                </div> */}
                {/* <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-lable">Gender</label>
                    <select
                      name="gender"
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
                    <button name="submit" className="btn btn-success btn-lg">
                      Update
                    </button>
                  </div>
                </div>{" "}
                <br></br>
                <br></br>
                <hr></hr>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-lable">Current Password</label>
                    <input
                      type="text"
                      name="phone"
                      className="form-control"
                      value={CurrentPassword}
                      onChange={(e) => {
                        SetCurrentPassword(e.target.value);
                      }}
                    />{" "}
                    {errors.NewPassword && (
                      <p style={{ color: "red" }}>{errors.NewPassword}</p>
                    )}{" "}
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-lable">New Password</label>
                    <input
                      type="text"
                      name="phone"
                      className="form-control"
                      value={NewPassword}
                      onChange={(e) => {
                        setNewPassword(e.target.value);
                      }}
                    />{" "}
                    {errors.NewPassword && (
                      <p style={{ color: "red" }}>{errors.NewPassword}</p>
                    )}{" "}
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-lable"> ConfirmPassword</label>
                    <input
                      type="text"
                      className="form-control"
                      value={NewConfirmPassword}
                      onChange={(e) => {
                        setNewConfirmPassword(e.target.value);
                      }}
                    />{" "}
                    {errors.NewConfirmPassword && (
                      <p style={{ color: "red" }}>
                        {errors.NewConfirmPassword}
                      </p>
                    )}{" "}
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="mb-3">
                    <label className="form-lable"></label>
                    <button
                      onClick={UpdatePassword}
                      name="submit"
                      className="btn btn-success btn-lg"
                    >
                      Update Password
                    </button>
                  </div>
                </div>{" "}
                <hr></hr>
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
                <div className="col-md-12">
                  <div className="mb-3">
                    <label className="form-lable"></label>
                    <button
                      onClick={() => {
                        SelectUserGroup();
                        navigate("/security/user");
                      }}
                      name="submit"
                      className="btn btn-success btn-lg"
                    >
                      Set user to group
                    </button>
                  </div>
                </div>{" "}
              </div>
            </form>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
