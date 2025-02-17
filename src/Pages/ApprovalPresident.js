import React, { useEffect, useState } from "react";
import Header from "../Shared/Hader.js";

export default function ApprovalPresident() {
  const [orders, setOrders] = useState([]);
  const [getMessage, setMessage] = useState(" ");
  const DeleteItem = async (id) => {
    const response = await fetch(
      `https://localhost:7241/api/order/DeleteOrder/${id}`,
      {
        method: "DELETE",
      }
    );

    if (response.ok) {
      const data = await response.json();
      alert(data.message);
    }
  };

  const ApprovalPresident = async (orderId) => {
    debugger;
    const response = await fetch(
      `https://localhost:7241/api/order/ApprovalPresident`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          OrderId: orderId,
          UserId: localStorage.getItem("UseId"),
          MessagePresident: getMessage,
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
          `https://localhost:7241/api/order/getAllOrders/${1}`
        );
        if (response.ok) {
          const data = await response.json();
          setOrders(data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        //  setError(error.message); // Set error state if needed
      }
    };

    fetchUsers();
  }, [orders]);

  return (
    <React.Fragment>
      <Header></Header>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h5 className="mt-2">Orders Requst </h5>
            <div className="d-grid d-md-flex justify-content-md-end mb-3">
              {/* <button
                className="btn btn-warning"
                onClick={() => {
                  // navigate("/addNewUser");
                }}
              >
                {" "}
                Add New User
              </button> */}
            </div>
            {/* <div className="d-grid d-md-flex justify-content-md-end mb-3">
              <button
                style={{ backgroundColor: "red" }}
                className="btn btn-warning"
                onClick={() => {
                  // navigate("/AddNewgroup");
                }}
              >
                {" "}
                Add New Group
              </button>
            </div> */}
            <table className="table table-bordered table-striped">
              <thead>
                <tr>
                  <th> Order Id </th>

                  <th> User Id </th>
                  <th>Social Number</th>
                  {/* <th>Password</th>
            <th>Confirm Password </th> */}
                  <th>CardNumber</th>

                  <th>First Name</th>
                  <th>Second Name</th>
                  <th>Third Name</th>
                  <th>last Name</th>
                  <th>Masseag :</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((orderData, index) => (
                  <tr key={index}>
                    <td>{orderData.orderId} </td>
                    <td>{orderData.userId} </td>

                    <td>{orderData.socialNumber} </td>
                    <td>{orderData.cardNumber} </td>
                    <td>{orderData.firstName} </td>
                    <td>{orderData.secondName} </td>
                    <td>{orderData.thirdName} </td>
                    <td>{orderData.lastName} </td>
                    <td>
                      {" "}
                      <div
                        className="col-md-6"
                        style={{ justifyContent: "center" }}
                      >
                        <div className="mb-3">
                          <label className="form-lable"></label>
                          <input
                            type="text"
                            name="socialNumber"
                            className="form-control"
                            value={getMessage}
                            onChange={(e) => {
                              setMessage(e.target.value);
                            }}
                          />
                        </div>
                      </div>
                    </td>
                    <td>
                      <button
                        className="btn btn-success mx-2"
                        onClick={() => {
                          // navigate(`/editeInfoUser/${userData.userId}`);
                        }}
                      >
                        {" "}
                        Edite
                      </button>
                      <button
                        className="btn btn-success mx-2"
                        style={{ backgroundColor: "blueviolet" }}
                        onClick={() => {
                          ApprovalPresident(orderData.orderId);
                        }}
                      >
                        {" "}
                        Approval
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => {
                          DeleteItem(orderData.orderId);
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
