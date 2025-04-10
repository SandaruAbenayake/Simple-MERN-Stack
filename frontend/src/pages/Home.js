import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#ff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: (theme.vars ?? theme).palette.text.secondary,
  ...theme.applyStyles("dark", {
    backgroundColor: "#1A2027",
  }),
}));
ChartJS.register(ArcElement, Tooltip, Legend);

function Home() {
  const [students, setStudents] = useState([]);
  const [editData, setEditData] = useState({});
  const [gender, setGender] = useState({});
  const [maleCount, setMaleCount] = useState([]);
  const [femalCount, setFemaleCount] = useState([]);
  const [data, setData] = useState(null);
  const [childCount, setChildCount] = useState(0);
  const [adultsCount, setAdultCount] = useState(0);
  const [groups, setAgeGroups] = useState(0);

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

  useEffect(() => {
    if (students && students.length > 0) {
      let males = 0;
      let females = 0;
      let adults = 0;
      let children = 0;

      let groups = {
        "0-10": 0,
        "11-15": 0,
        "16-17": 0,
        "18+": 0,
      };

      students.forEach((student) => {
        if (student.gender === "Male") {
          males++;
        } else if (student.gender === "Female") {
          females++;
        }
        // Age Group Summary
        const age = student.age;
        if (age <= 10) groups["0-10"]++;
        else if (age <= 15) groups["11-15"]++;
        else if (age <= 17) groups["16-17"]++;
        else groups["18+"]++;

        // Child vs Adult
        if (age >= 18) adults++;
        else children++;
      });

      setMaleCount(males);
      setFemaleCount(females);
      setAgeGroups(groups);
      setChildCount(children);
      setAdultCount(adults);

      const data = {
        labels: ["Male", "Female"], // Categories for your pie chart
        datasets: [
          {
            label: "Number of Student", // Tooltip label
            data: [males, females], // Dynamic data: number of males and females
            backgroundColor: [
              "rgba(240, 43, 86, 0.2)", // Light red for Male
              "rgba(28, 151, 233, 0.2)", // Light blue for Female
            ],

            borderColor: [
              "rgb(14, 13, 13)", // Stronger red border
              "rgb(10, 10, 10)", // Stronger blue border
            ],
            borderWidth: 1, // Border thickness
            hoverOffset: 20,
          },
        ],
      };

      setData(data);
    }
  }, [students]);

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
    <Box sx={{ flexGrow: 1, padding: "20px", backgroundColor: "#f4f7fb" }}>
      <Grid container spacing={2}>
        {/* Pie chart section */}
        <Grid item xs={10} md={5}>
          <Item
            sx={{
              display: "FLEX",
              justifyContent: "center",
              alignItems: "center",
              padding: "10px",
            }}
          >
            {data && <Pie data={data} />}
          </Item>
        </Grid>
        <Grid>

        </Grid>
        
        


        {/* Student details section */}
        <Grid item xs={12} md={8}>
          <Item
            sx={{
              padding: "20px",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              textAlign: "left",
            }}
          >
            <h4
              style={{ marginBottom: "20px", color: "#333", fontSize: "24px" }}
            >
              Student Type
            </h4>
            <ul
              style={{
                textAlign: "left",
                listStyleType: "disc",
                paddingLeft: "20px",
                color: "#555",
              }}
            >
              <li>Child (below 18): {childCount}</li>
              <li>Adult (18 and above): {adultsCount}</li>
            </ul>
          </Item>
        </Grid>

        <Grid size={12}>
          <Item>
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
                      onChange={(e) =>
                        handleEdit(student._id, "name", e.target.value)
                      }
                    />
                    <input
                      type="number"
                      value={editData[student._id]?.age || student.age}
                      placeholder="Age"
                      onChange={(e) =>
                        handleEdit(student._id, "age", e.target.value)
                      }
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
          </Item>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Home;
