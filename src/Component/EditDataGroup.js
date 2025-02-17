import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../Shared/Hader.js";

export default function EditeDataGroup() {
  const navigate = useNavigate();
  const [groupName, setGroupName] = useState("");
  const { id } = useParams();

  const handleSubmit = async (e) => {
    debugger;
    // if (!validateForm()) {
    //   return; // If form is not valid, do not proceed
    // }

    const response = await fetch(
      "https://localhost:7241/api/Group/UpdateGroupName",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          GroupName: groupName,
          GroupId: id,
        }),
      }
    );

    if (response.ok) {
      const data = await response.json();
      var m = data.meesage;
      alert(`Success: ${m}`);
    } else {
      console.error("Failed to data ");
      alert("Failed to data");
    }
  };

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
                      <label className="form-lable">Group Name</label>
                      <input
                        type="text"
                        className="form-control"
                        value={groupName}
                        onChange={(e) => {
                          setGroupName(e.target.value);
                        }}
                      />
                    </div>
                  </div>

                  <div className="col-md-12">
                    <div className="mb-3">
                      <label className="form-lable"></label>
                      <button
                        className="btn btn-success btn-lg"
                        onClick={() => {
                          handleSubmit();
                          navigate("/security/groups");
                        }}
                      >
                        Add New Group
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
