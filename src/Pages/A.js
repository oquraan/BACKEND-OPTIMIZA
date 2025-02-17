import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import Header from "../Shared/Hader.js";

export default function A() {
  // debugger;
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  // const navigate = useNavigate();
  const [groupsName, setGroupName] = useState("");
  const [groups, setGroups] = useState([]);
  const [menuPage, setMenuPage] = useState([]);

  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [ConfirmPassword, setConFirmPassword] = useState("");
  const [gender, setGender] = useState("");
  const [birthDate, setBirthDate] = useState("");

  const [SoicalNumber, setsocialNumber] = useState("");
  const [Id, SetId] = useState();
  const navigate = useNavigate();

  const [mainMenu, setMainMenu] = useState();
  const [ListSubMenu, setlistSubMenu] = useState([]);
  const [array, setArray] = useState([[]]);

  const [errors, setErrors] = useState({});
  const [groupId, setGroupId] = useState();
  const [pageMenuId, setPageMenuId] = useState();
  const [selectedPages, setSelectedPages] = useState([]);

  const [listOfObject, setListOfObject] = useState([]);
  const [checkedd, setChecked] = useState(false);

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

  const handleCheckboxChange = (pageId, checked) => {
    // debugger;
    // if (pageId === selectedPages.includes()) return true;
    // else {
    //   selectedPages.includes(pageId);

    //   return true;
    // }
    // if (pageId === selectedPages.includes()) {
    //   setChecked(true);
    // } else {
    //   setSelectedPages((prev) => [...prev, pageId]);
    // }

    // if (checked) {
    //   //  setSelectedPages(pageId);
    //   setSelectedPages((prev) => [...prev, pageId]);
    // } else {
    //   // Remove pageId from the list
    //   setSelectedPages((prev) => prev.filter((id) => id !== pageId));
    // }

    if (checked) {
      setSelectedPages((prev) => [...prev, pageId]);

      // Add pageId to the list
    } else {
      setSelectedPages((prev) => prev.filter((id) => id !== pageId));

      // Remove pageId from the list
    }

    // if (checked) {
    //   // Add pageId to the list
    //   setSelectedPages((prev) => [...prev, pageId]);
    // } else {
    //   // Remove pageId from the list
    //   setSelectedPages((prev) => prev.filter((id) => id !== pageId));
    // }
  };

  const handleChecked = (id) => {
    if (selectedPages.includes(id)) {
      return true;
    } else {
      return false;
    }
  };
  const [permision, setPermision] = useState([]);
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

  useEffect(() => {
    const fetchMainMenu = async () => {
      try {
        const response = await fetch(
          "https://localhost:7241/api/GetMainMenu/getAllMenuPages"
        );

        if (response.ok) {
          const a = await response.json();
          setMenuPage(a);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error.message); // Set error state if needed
      }
    };

    fetchMainMenu();
  }, [menuPage]);

  const sendData = async (id) => {
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
  const handleOption = async (e, id) => {
    setMainMenu(e.target.value);
    //  setGroupId(id);

    setlistSubMenu([]);

    try {
      const response = await fetch(
        `https://localhost:7241/api/GetMainMenu/getAllSubMenuPage/${mainMenu}/${groupId}`
      );

      if (response.ok) {
        const a = await response.json();
        setSelectedPages([]);

        setlistSubMenu(a);
        //  setSelectedPages(a.objectId);
        //  const objectIds = a.map(item => item.objectId);
        // a.map((item) => selectedPages.includes(item.objectId));

        // selectedPages.includes(a.map((item) => item.objectId));

        //    a.map((item) => console.log(item.objectId));
        //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        for (let index = 0; index < a.length; index++) {
          const element = array[index];

          if (a[index].checkedPage === 2) {
            // selectedPages.includes(a[index].objectId);
            setSelectedPages((prev) => [...prev, a[index].objectId]);
            console.log(a[index].objectId);
          }
        }

        //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setError(error.message); // Set error state if needed
    }
  };
  const AddPage = async () => {
    // const pageId = e;
    // debugger;
    const response = await fetch(
      "https://localhost:7241/api/GetMainMenu/AddPermision",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          pageId: selectedPages,
          groupId,
          parentId: mainMenu,
        }),
      }
    );

    if (response.ok) {
      const data = await response.json();
      var m = data.meesage;
      alert(`Successds ${m}`);
    } else {
      console.error("Failed to data ");
      alert("Failed to data");
    }
  };
  const handleValue = (e) => {
    setGroupId(e.target.value);
    setSelectedPages([]); 
       setMainMenu("");

    setlistSubMenu([]);
    setMainMenu("");
  };

  return (
    <React.Fragment>
      <Header></Header>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h5 className="mt-2">Group Data</h5>

            <div className="col-md-6">
              <div className="mb-3">
                <label className="form-lable">Group </label>
                <select
                  name="Group"
                  className="form-control"
                  value={groupId}
                  onChange={handleValue}
                  // setSelectedGroup(e.target.value);
                  onClick={handleValue}
                  //  onChange={}      <select value={selectedGroup} onChange={handleSelectChange}>
                >
                  <option value="">--Please Select--</option>

                  {groups.map((groups, index) => (
                    <option value={groups.groupId}>{groups.groupName}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="col-md-6">
              <div className="mb-3">
                <label className="form-lable">Main menu </label>
                <select
                  name=""
                  //  disabled={!groupId}
                  className="form-control"
                  onChange={(e) => {
                    // setSelectedGroup(e.target.value);
                    if (mainMenu !== null && groupId !== null)
                      handleOption(e, groupId);
                  }}
                  //  onChange={}      <select value={selectedGroup} onChange={handleSelectChange}>

                  value={pageMenuId}
                  onClick={(e) => {
                    // setSelectedGroup(e.target.value);
                    //  setSelectedPages([]);
                    handleOption(e, groupId);
                  }}
                  //  onSelect={{}}
                >
                  <option value={""}>--Please Select--</option>

                  {menuPage.map((pages, index) => (
                    <option value={pages.objectId}>
                      {pages.objectNameEnglish}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <table className="table table-bordered table-striped">
              <thead>
                <tr>
                  <th> Page Id </th>
                  <th>Page Name</th>

                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {ListSubMenu.map((subPage, index) => (
                  <tr key={index}>
                    <td>{subPage.objectId} </td>
                    <td>{subPage.objectNameEnglish} </td>

                    <td>
                      <input
                        type="checkbox"
                        value={checkedd}
                        checked={
                          handleChecked(subPage.objectId)
                          //handleChecked(subPage.objectId)
                        }
                        onChange={(e) =>
                          handleCheckboxChange(
                            subPage.objectId,
                            e.target.checked
                          )
                        }
                      />{" "}
                      <button
                        className="btn btn-success mx-2"
                        onClick={() => {
                          AddPage(subPage.objectId);
                        }}
                      >
                        {" "}
                        Add
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => {
                          //      DeleteGroup(groupData.groupId);
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
                <button
                  className="btn btn-success mx-2"
                  style={{ margin: "10px" }}
                  onClick={() => {
                    AddPage();
                  }}
                >
                  {" "}
                  Add
                </button>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
