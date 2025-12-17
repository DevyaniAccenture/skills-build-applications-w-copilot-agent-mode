import React, { useEffect, useState } from "react";

const codespaceName = process.env.REACT_APP_CODESPACE_NAME;
const endpoint = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/workouts/`
  : "/api/workouts/";


function Workouts() {
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    console.log("Fetching Workouts from:", endpoint);
    fetch(endpoint)
      .then((res) => res.json())
      .then((data) => {
        const items = data.results || data;
        console.log("Fetched Workouts:", items);
        setWorkouts(items);
      })
      .catch((err) => console.error("Error fetching workouts:", err));
  }, []);

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="display-6">Workouts</h2>
        <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addWorkoutModal">Add Workout</button>
      </div>
      <div className="card mb-4">
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-striped table-hover">
              <thead className="table-primary">
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Type</th>
                  <th>Date</th>
                  <th>Duration</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {workouts.length === 0 ? (
                  <tr><td colSpan="6" className="text-center">No workouts found.</td></tr>
                ) : (
                  workouts.map((w) => (
                    <tr key={w.id || w._id}>
                      <td>{w.id || w._id}</td>
                      <td>{w.name || '-'}</td>
                      <td>{w.type || '-'}</td>
                      <td>{w.date || '-'}</td>
                      <td>{w.duration || '-'}</td>
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
      <div className="modal fade" id="addWorkoutModal" tabIndex="-1" aria-labelledby="addWorkoutModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="addWorkoutModalLabel">Add Workout</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              {/* Bootstrap Form Placeholder */}
              <form>
                <div className="mb-3">
                  <label htmlFor="workoutName" className="form-label">Name</label>
                  <input type="text" className="form-control" id="workoutName" />
                </div>
                <div className="mb-3">
                  <label htmlFor="workoutType" className="form-label">Type</label>
                  <input type="text" className="form-control" id="workoutType" />
                </div>
                <div className="mb-3">
                  <label htmlFor="workoutDate" className="form-label">Date</label>
                  <input type="date" className="form-control" id="workoutDate" />
                </div>
                <div className="mb-3">
                  <label htmlFor="workoutDuration" className="form-label">Duration</label>
                  <input type="number" className="form-control" id="workoutDuration" />
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

export default Workouts;
