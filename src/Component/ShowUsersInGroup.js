import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
  import Header from "../Shared/Hader.js";

export default function ShowUsersInGroup() {
  const [users, setUsers] = useState([]);
  const { id ,groupName} = useParams();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          `https://localhost:7241/api/GetAllUsers/getDataAllUsersInGroup/${id}`
        );
        if (response.ok) {
          const data = await response.json();
          setUsers(data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
        <Header></Header>
        <h3>{groupName}</h3>
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
