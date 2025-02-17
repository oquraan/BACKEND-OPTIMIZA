import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import Header from "../Shared/Hader.js";

export default function DataGroupUser() {
  // debugger;
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  // const navigate = useNavigate();
  const [groupsName, setGroupName] = useState("");
  const [groups, setGroups] = useState([]);

  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [ConfirmPassword, setConFirmPassword] = useState("");
  const [gender, setGender] = useState("");
  const [birthDate, setBirthDate] = useState("");

  const [SoicalNumber, setsocialNumber] = useState("");
  const [Id, SetId] = useState();
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

  const DeleteGroup = async (id) => {
    const response = await fetch(
      `https://localhost:7241/api/Group/deleteGroup/${id}`,
      {
        method: "DELETE",
      }
    );

    if (response.ok) {
      const data = await response.json();
      alert(data.resulte);
    } else {
      alert("delete falid");
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
        setError(error.message); // Set error state if needed
      }
    };

    fetchUsers();
  }, [groups]);

  const sendData = async (id) => {
    debugger;
    if (!validateForm()) {
      return;
    }
    const response = await fetch(
      `https://localhost:7241/api/GetAllUsers/UpdateUser/${id}`,
      {
        method: "PUT",
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
    <React.Fragment>
      <Header></Header>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h5 className="mt-2">Group Data</h5>
            {/* <div className="d-grid d-md-flex justify-content-md-end mb-3">
              <button
                className="btn btn-warning"
                onClick={() => {
                  navigate("/addNewUser");
                }}
              >
                {" "}
                Add New User
              </button>
            </div> */}
            <div className="d-grid d-md-flex justify-content-md-end mb-3">
              <button
                style={{ backgroundColor: "red" }}
                className="btn btn-warning"
                onClick={() => {
                  navigate("/AddNewgroup");
                }}
              >
                {" "}
                Add New Group
              </button>
            </div>
            <table className="table table-bordered table-striped">
              <thead>
                <tr>
                  <th>Id </th>
                  <th>Group Name</th>

                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {groups.map((groupData, index) => (
                  <tr key={index}>
                    <td>{groupData.groupId} </td>
                    <td>{groupData.groupName} </td>

                    <td>
                      <button
                        style={{ backgroundColor: "yellowgreen" }}
                        className="btn btn-success mx-2"
                        onClick={() => {
                          // navigate(`/editeInfoUser/${userData.userId}`);
                          navigate(
                            `/ShowUsersInGroup/${groupData.groupId}/${groupData.groupName}`
                          );
                        }}
                      >
                        {" "}
                        Show Users
                      </button>
                      <button
                        className="btn btn-success mx-2"
                        onClick={() => {
                          navigate(`/EditeDataGroup/${groupData.groupId}`);
                        }}
                      >
                        {" "}
                        Edite
                      </button>

                      <button
                        className="btn btn-danger"
                        onClick={() => {
                          DeleteGroup(groupData.groupId);
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
