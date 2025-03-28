import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

export default function AddStudent() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");

  const submitStudent = async (e) => {
    e.preventDefault();

    const newStudent = { name, age, gender };

    try {
      await axios.post("http://localhost:5002/student/add", newStudent);

      setName("");
      setAge("");
      setGender("");

      Swal.fire({
        title: "Student Added Successfully!",
        icon: "success",
        draggable: true,
      });
    } catch (error) {
      console.error("Error adding student:", error);
      Swal.fire({
        title: "Error adding student",
        icon: "error",
        draggable: true,
      });
    }
  };

  return (
    <div className="add-student-container">
      <h2>Add New Student</h2>
      <form className="add-student-form" onSubmit={submitStudent}>
        <div className="form-group">
          <label htmlFor="name">Student Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={name}
            placeholder="Enter Student Name"
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="age">Student Age</label>
          <input
            type="number"
            className="form-control"
            id="age"
            value={age}
            placeholder="Enter Student Age"
            onChange={(e) => setAge(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="gender">Student Gender</label>
          <select
            className="form-control"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>

        <button type="submit" className="submit-btn">
          Submit
        </button>
      </form>
    </div>
  );
}
