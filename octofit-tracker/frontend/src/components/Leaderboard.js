import React, { useEffect, useState } from "react";

const codespaceName = process.env.REACT_APP_CODESPACE_NAME;
const endpoint = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/leaderboard/`
  : "/api/leaderboard/";


function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    console.log("Fetching Leaderboard from:", endpoint);
    fetch(endpoint)
      .then((res) => res.json())
      .then((data) => {
        const items = data.results || data;
        console.log("Fetched Leaderboard:", items);
        setLeaderboard(items);
      })
      .catch((err) => console.error("Error fetching leaderboard:", err));
  }, []);

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="display-6">Leaderboard</h2>
        <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addLeaderboardModal">Add Entry</button>
      </div>
      <div className="card mb-4">
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-striped table-hover">
              <thead className="table-primary">
                <tr>
                  <th>Rank</th>
                  <th>User</th>
                  <th>Score</th>
                  <th>Team</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {leaderboard.length === 0 ? (
                  <tr><td colSpan="5" className="text-center">No leaderboard data found.</td></tr>
                ) : (
                  leaderboard.map((l, idx) => (
                    <tr key={l.id || l._id || idx}>
                      <td>{l.rank || idx + 1}</td>
                      <td>{l.user || l.username || '-'}</td>
                      <td>{l.score || '-'}</td>
                      <td>{l.team || '-'}</td>
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
      <div className="modal fade" id="addLeaderboardModal" tabIndex="-1" aria-labelledby="addLeaderboardModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="addLeaderboardModalLabel">Add Leaderboard Entry</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              {/* Bootstrap Form Placeholder */}
              <form>
                <div className="mb-3">
                  <label htmlFor="userName" className="form-label">User</label>
                  <input type="text" className="form-control" id="userName" />
                </div>
                <div className="mb-3">
                  <label htmlFor="userScore" className="form-label">Score</label>
                  <input type="number" className="form-control" id="userScore" />
                </div>
                <div className="mb-3">
                  <label htmlFor="userTeam" className="form-label">Team</label>
                  <input type="text" className="form-control" id="userTeam" />
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

export default Leaderboard;
