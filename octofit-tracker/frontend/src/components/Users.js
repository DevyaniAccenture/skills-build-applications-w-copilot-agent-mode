import React, { useEffect, useState } from "react";

const codespaceName = process.env.REACT_APP_CODESPACE_NAME;
const endpoint = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/users/`
  : "/api/users/";


function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    console.log("Fetching Users from:", endpoint);
    fetch(endpoint)
      .then((res) => res.json())
      .then((data) => {
        const items = data.results || data;
        console.log("Fetched Users:", items);
        setUsers(items);
      })
      .catch((err) => console.error("Error fetching users:", err));
  }, []);

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="display-6">Users</h2>
        <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addUserModal">Add User</button>
      </div>
      <div className="card mb-4">
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-striped table-hover">
              <thead className="table-primary">
                <tr>
                  <th>ID</th>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Joined</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.length === 0 ? (
                  <tr><td colSpan="5" className="text-center">No users found.</td></tr>
                ) : (
                  users.map((u) => (
                    <tr key={u.id || u._id}>
                      <td>{u.id || u._id}</td>
                      <td>{u.username || u.name || '-'}</td>
                      <td>{u.email || '-'}</td>
                      <td>{u.joined || u.date_joined || '-'}</td>
                      <td>
                        <button className="btn btn-sm btn-outline-info me-2">View</button>
                        <button className="btn btn-sm btn-outline-warning me-2">Edit</button>
                        <button className="btn btn-sm btn-outline-danger">Delete</button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal Placeholder */}
      <div className="modal fade" id="addUserModal" tabIndex="-1" aria-labelledby="addUserModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="addUserModalLabel">Add User</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              {/* Bootstrap Form Placeholder */}
              <form>
                <div className="mb-3">
                  <label htmlFor="userName" className="form-label">Username</label>
                  <input type="text" className="form-control" id="userName" />
                </div>
                <div className="mb-3">
                  <label htmlFor="userEmail" className="form-label">Email</label>
                  <input type="email" className="form-control" id="userEmail" />
                </div>
                <button type="submit" className="btn btn-primary">Save</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Users;
