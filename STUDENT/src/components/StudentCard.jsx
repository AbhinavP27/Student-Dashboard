import React from 'react'

const StudentCard = (props) => {
  return (
    <div className="col-md-4 mb-4">
      <div className="card student-card shadow-sm">
        <div className="card-body">

          <p className="card-text">Id: {props.id}</p>
          <h5 className="card-title">{props.name}</h5>
          <p className="card-text">Course: {props.course}</p>
          <p className="card-text">Batch: {props.batch}</p>
          {/* <p className="card-text">Email: {props.email}</p>
          <p className="card-text">Status: {props.status}</p> */}
          <p className="card-text">
            Status:
            <span className={
              props.status === "Updated" ? "text-warning" : "text-success"
            }>
              {props.status}
            </span>
          </p>

          <button
            className="btn btn-primary btn-sm me-2 mb-2"
            onClick={props.onView}
          >
            View
          </button>

          <button
            className="btn btn-info btn-sm me-2 mb-2"
            onClick={props.onEdit}
          >
            Update
          </button>

          <button
            className="btn btn-danger btn-sm"
            onClick={props.onDelete}
          >
            Delete
          </button>

        </div>
      </div>
    </div>
  )
}

export default StudentCard