import React, { Fragment, useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import axios from "axios";

function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      const { data } = await axios.get("http://localhost:5000/api/register");
      setUsers(data);
    };
    getUsers();
  }, [users]);
  const deleteUser = async (id) => {
    await axios.delete(`http://localhost:5000/api/register/${id}`);
  };
  const setAdmin = async (id) => {
    const { data } = await axios.patch(
      `http://localhost:5000/api/register/${id}`,
      { adminRole: true }
    );
  };
  const setDefaultUser = async (id) => {
    const { data } = await axios.patch(
      `http://localhost:5000/api/register/${id}`,
      { adminRole: false }
    );
  };
  return (
    <Fragment>
      <Navbar />
      <div className="container mt-5">
        <table className="table table-dark table-hover">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">email</th>
              <th scope="col">Username</th>
              <th scope="col"></th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {users.map((item, i) => (
              <tr key={i}>
                <th scope="row">{i + 1}</th>
                <td>{item.email}</td>
                <td>{item.name}</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => deleteUser(item._id)}
                  >
                    Delete
                  </button>
                </td>
                <td>
                  {item.adminRole ? (
                    <button
                      type="button"
                      className="btn btn-warning"
                      onClick={() => setDefaultUser(item._id)}
                    >
                      Set default user
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="btn btn-warning"
                      onClick={() => setAdmin(item._id)}
                    >
                      Set Admin
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Fragment>
  );
}

export default Users;
