import React from "react";

const ViewStudent = ({ student, onClose }) => {

  if (!student) return null;

  return (
    <div className="popup-overlay">
      <div className="popup-form">

        <h4 className="mb-3">Student Details</h4>

        <p><strong>ID:</strong> {student.id}</p>
        <p><strong>Name:</strong> {student.name}</p>
        <p><strong>Course:</strong> {student.course}</p>
        <p><strong>Batch:</strong> {student.batch}</p>
        {/* <p><strong>Email:</strong> {student.email}</p> */}
        <p><strong>Status:</strong> {student.status}</p>


        <h4 className="mt-3">Contact Details</h4>
        <p><strong>Email:</strong> {student.email}</p>
        {/* <p><strong>Status:</strong> {student.status}</p> */}

        <button 
          className="btn btn-secondary mt-3"
          onClick={onClose}
        >
          Close
        </button>

      </div>
    </div>
  );
};

export default ViewStudent;