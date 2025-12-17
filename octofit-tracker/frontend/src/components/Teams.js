import React, { useEffect, useState } from "react";

const codespaceName = process.env.REACT_APP_CODESPACE_NAME;
const endpoint = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/teams/`
  : "/api/teams/";


function Teams() {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    console.log("Fetching Teams from:", endpoint);
    fetch(endpoint)
      .then((res) => res.json())
      .then((data) => {
        const items = data.results || data;
        console.log("Fetched Teams:", items);
        setTeams(items);
      })
      .catch((err) => console.error("Error fetching teams:", err));
  }, []);

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="display-6">Teams</h2>
        <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addTeamModal">Add Team</button>
      </div>
      <div className="card mb-4">
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-striped table-hover">
              <thead className="table-primary">
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Members</th>
                  <th>Created</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {teams.length === 0 ? (
                  <tr><td colSpan="5" className="text-center">No teams found.</td></tr>
                ) : (
                  teams.map((t) => (
                    <tr key={t.id || t._id}>
                      <td>{t.id || t._id}</td>
                      <td>{t.name || '-'}</td>
                      <td>{Array.isArray(t.members) ? t.members.length : '-'}</td>
                      <td>{t.created || '-'}</td>
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
      <div className="modal fade" id="addTeamModal" tabIndex="-1" aria-labelledby="addTeamModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="addTeamModalLabel">Add Team</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              {/* Bootstrap Form Placeholder */}
              <form>
                <div className="mb-3">
                  <label htmlFor="teamName" className="form-label">Name</label>
                  <input type="text" className="form-control" id="teamName" />
                </div>
                <div className="mb-3">
                  <label htmlFor="teamMembers" className="form-label">Members (comma separated)</label>
                  <input type="text" className="form-control" id="teamMembers" />
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

export default Teams;
