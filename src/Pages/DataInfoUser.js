import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import Header from "../Shared/Hader.js";

export default function DataInfoUser() {
  // debugger;
  const [count, setCount] = useState(0);
  const [users, setUsers] = useState([]);
  const [click, setClick] = useState(false);
  const [error, setError] = useState(null);
  // const navigate = useNavigate();

  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [ConfirmPassword, setConFirmPassword] = useState("");
  const [gender, setGender] = useState("");
  const [birthDate, setBirthDate] = useState("");

  const [SoicalNumber, setsocialNumber] = useState("");
  const [Id, SetId] = useState();
  const navigate = useNavigate();

  const [errors, setErrors] = useState({});




  
  const DeleteItem = async (id) => {
    const response = await fetch(
      `https://localhost:7241/api/GetAllUsers/DeleteUser/${id}`,
      {
        method: "DELETE",
      }
    );

    if (response.ok) {
      const data = await response.json();
      alert(data.message);
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          "https://localhost:7241/api/GetAllUsers/getDataAllUsers"
        );
        if (response.ok) {
          const data = await response.json();
          setUsers(data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error.message); // Set error state if needed
      }
    };

    fetchUsers();
  }, [users]);

  const sendData = async (id) => {
  
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
            <h5 className="mt-2">User Data</h5>
            <div className="d-grid d-md-flex justify-content-md-end mb-3">
              <button
                className="btn btn-warning"
                onClick={() => {
                  navigate("/addNewUser");
                }}
              >
                {" "}
                Add New User
              </button>
            </div>
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
                  <th>Email</th>
                  {/* <th>Password</th>
                  <th>Confirm Password </th> */}
                  <th>Social Number</th>

                  <th>BirthDate</th>
                  <th>gender</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {users.map((userData, index) => (
                  <tr key={index}>
                    <td>{userData.userId} </td>
                    <td>{userData.email} </td>
                    {/* <td>{userData.password} </td>
                    <td>{userData.confirmPassword} </td> */}
                    <td>{userData.soicalNumber} </td>
                    <td>{userData.birthDate} </td>
                    <td>{userData.gender} </td>
                    <td>
                      <button
                        className="btn btn-success mx-2"
                        onClick={() => {
                          navigate(`/editeInfoUser/${userData.userId}`);
                        }}
                      >
                        {" "}
                        Edite
                      </button>

                      <button
                        className="btn btn-danger"
                        onClick={() => {
                          DeleteItem(userData.userId);
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

  //////////////*********************************** */

  // return (
  //   <div className="App">
  //     <table >
  //       <thead>
  //         <tr>
  //           <th>Id </th>
  //           <th>Email </th>
  //           <th>Password </th>
  //           <th> Confirm Password </th>

  //           <th>SoicalNumber </th>
  //           <th>BirthDate </th>
  //           <th>gender </th>
  //           <th>Action </th>
  //         </tr>
  //       </thead>
  //       <tbody>
  //         {users.map((user, index) => (
  //           <tr key={user.userId}>
  //             <td>{user.userId}</td>
  //             <td>{user.email}</td>
  //             <td>{user.password}</td>
  //             <td>{user.confirmPassword}</td>
  //             <td>{user.soicalNumber}</td>
  //             <td>{user.birthDate}</td>
  //             <td>{user.gender}</td>
  //             {/*
  //             <td>
  //               <editableText value={user.email} />
  //             </td>
  //             <td>
  //               <editableText value={user.password} />
  //             </td> */}
  //             <td>
  //               <button
  //                 onClick={() => {
  //                   setClick(!click);
  //                   setEmail(user.email);
  //                   setPassword(user.password);
  //                   setGender(user.gender);
  //                   setsocialNumber(user.soicalNumber);
  //                   setBirthDate(user.birthDate);
  //                   setConFirmPassword(user.confirmPassword);
  //                   SetId(user.userId);
  //                 }}
  //                 intent="primary"
  //               >
  //                 Update
  //               </button>
  //               &nbsp;
  //               <button
  //                 onClick={() => {
  //                   DeleteItem(user.userId);
  //                 }}
  //                 intent="danger"
  //               >
  //                 Delete
  //               </button>
  //             </td>
  //           </tr>
  //         ))}
  //         {click && (
  //           <div>
  //             <div>
  //               <h3>Edite Information </h3>
  //               <form
  //                 action=""
  //                 onSubmit={() => {
  //                   sendData(Id);
  //                 }}
  //               >
  //                 <div>
  //                   <label htmlFor="">
  //                     Email:{" "}
  //                     <input
  //                       type="text"
  //                       value={Email}
  //                       onChange={(e) => setEmail(e.target.value)}
  //                     />
  //                   </label>
  //                 </div>
  //                 <div>
  //                   <label htmlFor="">
  //                     {" "}
  //                     Password :{" "}
  //                     <input
  //                       type="text"
  //                       value={Password}
  //                       onChange={(e) => setPassword(e.target.value)}
  //                     />
  //                   </label>
  //                 </div>
  //                 <div>
  //                   <label htmlFor="">
  //                     {" "}
  //                     Confirm Password :{" "}
  //                     <input
  //                       type="text"
  //                       value={ConfirmPassword}
  //                       onChange={(e) => setConFirmPassword(e.target.value)}
  //                     />
  //                   </label>
  //                 </div>
  //                 {errors.confirmPassword && (
  //                   <p style={{ color: "red" }}>{errors.confirmPassword}</p>
  //                 )}{" "}
  //                 <div>
  //                   <label htmlFor="">
  //                     {" "}
  //                     Soical Number :{" "}
  //                     <input
  //                       type="text"
  //                       value={SoicalNumber}
  //                       onChange={(e) => setsocialNumber(e.target.value)}
  //                     />
  //                   </label>
  //                 </div>
  //                 <div>
  //                   <label htmlFor="">
  //                     {" "}
  //                     Gender :{" "}
  //                     <label>
  //                       <input
  //                         type="radio"
  //                         name="gender"
  //                         value="male"
  //                         checked={gender === "male"}
  //                         onChange={(e) => {
  //                           setGender(e.target.value);
  //                         }}
  //                       ></input>
  //                       Male
  //                     </label>
  //                     <label>
  //                       <input
  //                         type="radio"
  //                         name="gender"
  //                         value="female"
  //                         checked={gender === "female"}
  //                         onChange={(e) => {
  //                           setGender(e.target.value);
  //                         }}
  //                       ></input>
  //                       Female
  //                     </label>
  //                   </label>
  //                 </div>
  //                 <div>
  //                   <label htmlFor="">
  //                     {" "}
  //                     Birh Date :{" "}
  //                     <input
  //                       type="date"
  //                       value={birthDate}
  //                       onChange={(e) => setBirthDate(e.target.value)}
  //                     />
  //                   </label>
  //                 </div>
  //                 <h1>{birthDate}</h1>
  //                 <h1>{gender}</h1>
  //                 <button type="submit">Submit</button>
  //               </form>
  //             </div>
  //           </div>
  //         )}
  //       </tbody>
  //     </table>
  //   </div>
  // );

  //////////////////////////////////////////*/////////////////
  // return (
  //   <div>
  //     <div>
  //       <DataTable columns={columans} data={users}></DataTable>
  //     </div>

  //     {/* <DataTable value={users} tableStyle={{ minWidth: "50rem" }}>
  //       <Column field="Email" header="Email"></Column>
  //       <Column field="Password" header="Password"></Column>
  //       <Column field="" header="Category"></Column>
  //       <Column field="quantity" header="Quantity"></Column>
  //     </DataTable> */}
  //     {/* <DataTable value={users} tableStyle={{ minWidth: "50rem" }}>
  //       {columns.map((col) => (
  //         <Column key={col.field} field={col.field} header={col.header} />
  //       ))}
  //     </DataTable> */}
  //     {error && <p>Error: {error}</p>}
  //     {users.length === 0 ? (
  //       <p>No users found.</p>
  //     ) : (
  //       users.map((user, index) => (
  //         <div>
  //           <div>
  //             <h2>{index + 1}</h2>
  //             <p> Email : {user.email}</p>
  //             <p> password: {user.password}</p>
  //             <p> BirthDate : {user.birthDate}</p>
  //             <p> SoicalNumber : {user.soicalNumber}</p>
  //             <p> UserId : {user.userId}</p>
  //           </div>
  //           <div>
  //             {/* <button onClick={DeleteItem(user.userId)}> delete </button> */}
  //           </div>
  //           <div className="App"></div>
  //           <hr></hr>
  //         </div>
  //       ))
  //     )}
  //   </div>
  // );
}
