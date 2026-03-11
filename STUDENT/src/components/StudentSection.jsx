import React, { useEffect, useState } from 'react'
import StudentCard from "./StudentCard"
import ViewStudent from './View'

const StudentSection = () => {

  const [formLive, setFormLive] = useState(false)

  const [students, setStudents] = useState([])


  const [name, setName] = useState("")
  const [course, setCourse] = useState("")
  const [batch, setBatch] = useState("")
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState("")

  const [selectedStudent, setSelectedStudent] = useState(null)

  const handleView = (student) => {
    setSelectedStudent(student)
  }
  
  const[editingId, setEditingId] = useState(null)

  const handleEdit = (student) => {
    setName(student.name)
    setCourse(student.course)
    setBatch(student.batch)
    setEmail(student.email)
    setStatus(student.status)
    setEditingId(student.id)
    setFormLive(true)
  }


  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((data) => {

        const formattedStudents = data.map((user) => ({
          id: user.id,
          name: user.name,
          course: "react",
          batch: "2025",
          email: user.email,
          status: "Active"
        }))

        setStudents(formattedStudents)
      })
  }, [])

  const handleDelete = (id) => {
    const updatedStudents = students.filter(
      (student) => student.id !== id
    )

    setStudents(updatedStudents)
  }

  const fetchStudent = () => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((respond) => respond.json())
      .then((data) => {

        const formattedStudent = data.map((user) => ({
          id: user.id,
          name: user.name,
          course: "react",
          batch: "2025",
          email: user.email,
          status: "Active"
        }))

        setStudents(formattedStudent)
      })
      .catch(() => {
        setError("Failed to fetch students")
        setLoading(false)
      })
  }

 const handleSubmit = () => {

  if (editingId) {

    const updatedStudents = students.map((student) => {
      if (student.id === editingId) {
        return {
          ...student,
          name: name,
          course: course,
          batch: batch,
          email: email,
          status: "Updated"
        }
      }
      return student
    })

    setStudents(updatedStudents)
    setEditingId(null)

  } else {

    const newStudent = {
      id: Date.now(),
      name,
      course,
      batch,
      email,
      status: "New"
    }

    setStudents([...students, newStudent])
  }

  setName("")
  setCourse("")
  setBatch("")
  setEmail("")
  setStatus("")
  setFormLive(false)
}

  return (
    <div className="container my-5">

      <h2 className="text-center mb-4 fw-bold">Our Students</h2>

      {
        students.length === 0
          ? <h2 className='text-danger text-center'>No students found</h2>
          : <h5>Total students : {students.length}</h5>
      }

      <div className="row">
        {students.map((student) => (
          <StudentCard
            key={student.id}
            id={student.id}
            name={student.name}
            course={student.course}
            batch={student.batch}
            email={student.email}
            status={student.status}
            onDelete={() => handleDelete(student.id)}
            onView={() => handleView(student)}
            onEdit={() => handleEdit(student)}
          />
        ))}
      </div>

      <button
        className='btn btn-primary mb-2'
        onClick={() => {
          setName("")
          setCourse("")
          setBatch("")
          setEmail("")
          setStatus("")
          setEditingId(null)
          setFormLive(true)
        }}
      >
        Add student
      </button>

      <button
        className='btn btn-warning'
        onClick={() => setStudents([])}
      >
        Clear all
      </button>

      {
        formLive &&
        (
          <div className="popup-form">
            <h4>{editingId ? "Update Student" : "Add New Student"}</h4>
            

            <input type="text" placeholder="Name" className="form-control mb-2" value={name} onChange={(e) => setName(e.target.value)} />
            <input type="text" placeholder="Course" className="form-control mb-2" value={course} onChange={(e) => setCourse(e.target.value)} />
            <input type="text" placeholder="Batch" className="form-control mb-2" value={batch} onChange={(e) => setBatch(e.target.value)} />
            <input type="email" placeholder="Email" className="form-control mb-2" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="text" placeholder="Status" className="form-control mb-2" value={status} onChange={(e) => setStatus(e.target.value)} />

            <button className="btn btn-success me-2" onClick={handleSubmit}>
              Submit
            </button>

            <button
              className="btn btn-secondary mt-2" onClick={() => setFormLive(false)}>
              Cancel
            </button>
          </div>
        )
      }




      <button
        className='btn btn-info mt-2'
        onClick={fetchStudent}
      >
        Fetch Students
      </button>
      {selectedStudent && (
        <ViewStudent
          student={selectedStudent}
          onClose={() => setSelectedStudent(null)}
        />
      )}
    </div>
  )
}

export default StudentSection







