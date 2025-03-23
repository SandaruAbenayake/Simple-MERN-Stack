import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

export default function AddStudent() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");

  const submitStudent = async (e) => {
    e.preventDefault(); // Prevents the page from refreshing

    const newStudent = {
      name,
      name,
      age: age,
      gender: gender,
    };

    await axios.post("http://localhost:5002/student/add", newStudent);

    setName("");
    setAge("");
    setGender("");

    Swal.fire({
      title: "Success",
      icon: "success",
      draggable: true,
    });

    try {
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
    <div className="container">
      <form>
        <div class="form-group">
          <label for="name">Student Name</label>
          <input
            type="text"
            class="form-control"
            id="name"
            value={name}
            placeholder="Enter Student Name"
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div class="form-group">
          <label for="age">Student Age</label>
          <input
            type="text"
            class="form-control"
            id="age"
            value={age}
            placeholder="Enter Student Age"
            onChange={(e) => setAge(e.target.value)}
          />
        </div>

        <div class="form-group">
          <label for="gender">Student Gender</label>
          <select
            className="form-control"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <option value="">Select Gender</option> {/* Empty default option */}
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>

        <button type="submit" class="btn btn-primary" onClick={submitStudent}>
          Submit
        </button>
      </form>
    </div>
  );
}
