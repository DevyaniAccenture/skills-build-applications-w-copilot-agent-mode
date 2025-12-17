import React, { useEffect, useState } from "react";

const codespaceName = process.env.REACT_APP_CODESPACE_NAME;
const endpoint = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/activities/`
  : "/api/activities/";


function Activities() {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    console.log("Fetching Activities from:", endpoint);
    fetch(endpoint)
      .then((res) => res.json())
      .then((data) => {
        const items = data.results || data;
        console.log("Fetched Activities:", items);
        setActivities(items);
      })
      .catch((err) => console.error("Error fetching activities:", err));
  }, []);

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="display-6">Activities</h2>
        <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addActivityModal">Add Activity</button>
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
                {activities.length === 0 ? (
                  <tr><td colSpan="6" className="text-center">No activities found.</td></tr>
                ) : (
                  activities.map((a) => (
                    <tr key={a.id || a._id}>
                      <td>{a.id || a._id}</td>
                      <td>{a.name || '-'}</td>
                      <td>{a.type || '-'}</td>
                      <td>{a.date || '-'}</td>
                      <td>{a.duration || '-'}</td>
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
      <div className="modal fade" id="addActivityModal" tabIndex="-1" aria-labelledby="addActivityModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="addActivityModalLabel">Add Activity</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              {/* Bootstrap Form Placeholder */}
              <form>
                <div className="mb-3">
                  <label htmlFor="activityName" className="form-label">Name</label>
                  <input type="text" className="form-control" id="activityName" />
                </div>
                <div className="mb-3">
                  <label htmlFor="activityType" className="form-label">Type</label>
                  <input type="text" className="form-control" id="activityType" />
                </div>
                <div className="mb-3">
                  <label htmlFor="activityDate" className="form-label">Date</label>
                  <input type="date" className="form-control" id="activityDate" />
                </div>
                <div className="mb-3">
                  <label htmlFor="activityDuration" className="form-label">Duration</label>
                  <input type="number" className="form-control" id="activityDuration" />
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

export default Activities;
