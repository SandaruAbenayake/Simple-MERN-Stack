import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

function Home() {
  const [students, setStudents] = useState([]);
  const [editData, setEditData] = useState({});
  const [gender, setGender] = useState("");

  // Fetch all students
  const getAllStudents = async () => {
    try {
      const response = await axios.get("http://localhost:5002/student");

      setStudents(response.data);
    } catch (error) {
      console.log("Error getting student list");
    }
  };
  useEffect(() => {
    getAllStudents();
  }, []);

  // Handle input changes for editing
  const handleEdit = (id, field, value) => {
    setEditData({
      ...editData,
      [id]: { ...editData[id], [field]: value },
    });
  };
  //Update Stedent Details
  const updateStudent = async (id) => {
    try {
      await axios.put(
        `http://localhost:5002/student/update/${id}`,
        editData[id]
      );

      Swal.fire({
        title: "Update Success",
        icon: "success",
        draggable: true,
      });
    } catch (error) {
      Swal.fire({
        title: "Update Failed",
        icon: "error",
        draggable: true,
      });
    }
  };
  //delete Student
  const deleteStudent = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`http://localhost:5002/student/delete/${id}`);
          setStudents(students.filter((student) => student._id !== id)); // Remove from UI
          Swal.fire("Deleted!", "Student has been removed.", "success");
        } catch (error) {
          Swal.fire("Error!", "Failed to delete student.", "error");
        }
      }
    });
  };

  return (
    <div className="home-container">
      <h1>Student List</h1>
      <ul className="student-list">
        {students.map((student) => (
          <li key={student._id} className="student-card">
            <span>
              <strong>{student.name}</strong>
            </span>
            <input
              type="text"
              value={editData[student._id]?.name || student.name}
              placeholder="Student Name"
              onChange={(e) => handleEdit(student._id, "name", e.target.value)}
            />
            <input
              type="number"
              value={editData[student._id]?.age || student.age}
              placeholder="Age"
              onChange={(e) => handleEdit(student._id, "age", e.target.value)}
            />
            <select
              value={editData[student._id]?.gender || student.gender}
              onChange={(e) =>
                handleEdit(student._id, "gender", e.target.value)
              }
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
            <div className="student-actions">
              <button
                className="update-btn"
                onClick={() => updateStudent(student._id)}
              >
                Update
              </button>
              <button
                className="delete-btn"
                onClick={() => deleteStudent(student._id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;
