import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import { Pie, Bar } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

// Styled MUI item
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

function Home() {
  const [students, setStudents] = useState([]);
  const [editData, setEditData] = useState({});
  const [pieData, setPieData] = useState(null);
  const [barData, setBarData] = useState(null);
  const [childCount, setChildCount] = useState(0);
  const [adultCount, setAdultCount] = useState(0);

  const getAllStudents = async () => {
    try {
      const res = await axios.get("http://localhost:5002/student");
      setStudents(res.data);
    } catch (error) {
      console.log("Error fetching student list", error);
    }
  };

  useEffect(() => {
    getAllStudents();
  }, []);

  useEffect(() => {
    if (students.length > 0) {
      let males = 0,
        females = 0,
        adults = 0,
        children = 0;
      let ageGroups = {
        "0-10": 0,
        "11-15": 0,
        "16-17": 0,
        "18+": 0,
      };

      students.forEach((student) => {
        const { gender, age } = student;

        if (gender === "Male") males++;
        else if (gender === "Female") females++;

        if (age <= 10) ageGroups["0-10"]++;
        else if (age <= 15) ageGroups["11-15"]++;
        else if (age <= 17) ageGroups["16-17"]++;
        else ageGroups["18+"]++;

        if (age >= 18) adults++;
        else children++;
      });

      setChildCount(children);
      setAdultCount(adults);

      setPieData({
        labels: ["Male", "Female"],
        datasets: [
          {
            label: "Gender Distribution",
            data: [males, females],
            backgroundColor: ["rgba(240, 43, 86, 0.5)", "rgba(28, 151, 233, 0.5)"],
            borderColor: ["#000", "#000"],
            borderWidth: 1,
          },
        ],
      });

      setBarData({
        labels: Object.keys(ageGroups),
        datasets: [
          {
            label: "Age Group Distribution",
            data: Object.values(ageGroups),
            backgroundColor: "rgba(75, 192, 192, 0.5)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
          },
        ],
      });
    }
  }, [students]);

  const handleEdit = (id, field, value) => {
    setEditData({
      ...editData,
      [id]: { ...editData[id], [field]: value },
    });
  };

  const updateStudent = async (id) => {
    try {
      await axios.put(`http://localhost:5002/student/update/${id}`, editData[id]);
      Swal.fire("Updated!", "Student data has been updated.", "success");
      getAllStudents();
    } catch (error) {
      Swal.fire("Failed!", "Update failed.", "error");
    }
  };

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
          setStudents(students.filter((student) => student._id !== id));
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
        <Grid item xs={12} md={4}>
          <Item>{pieData && <Pie data={pieData} />}</Item>
        </Grid>
        <Grid item xs={12} md={4}>
          <Item>{barData && <Bar data={barData} />}</Item>
        </Grid>
        <Grid item xs={12} md={4}>
          <Item>
            <h4 style={{ marginBottom: "20px" }}>Student Types</h4>
            <ul style={{ textAlign: "left" }}>
              <li>Children (below 18): {childCount}</li>
              <li>Adults (18 and above): {adultCount}</li>
            </ul>
          </Item>
        </Grid>
        <Grid item xs={12}>
          <Item>
            <h2>Student List</h2>
            <ul style={{ listStyleType: "none", padding: 0 }}>
              {students.map((student) => (
                <li
                  key={student._id}
                  style={{
                    marginBottom: "10px",
                    border: "1px solid #ccc",
                    padding: "10px",
                    borderRadius: "8px",
                  }}
                >
                  <input
                    type="text"
                    value={editData[student._id]?.name || student.name}
                    onChange={(e) =>
                      handleEdit(student._id, "name", e.target.value)
                    }
                    placeholder="Name"
                    style={{ marginRight: "10px" }}
                  />
                  <input
                    type="number"
                    value={editData[student._id]?.age || student.age}
                    onChange={(e) =>
                      handleEdit(student._id, "age", e.target.value)
                    }
                    placeholder="Age"
                    style={{ marginRight: "10px" }}
                  />
                  <select
                    value={editData[student._id]?.gender || student.gender}
                    onChange={(e) =>
                      handleEdit(student._id, "gender", e.target.value)
                    }
                    style={{ marginRight: "10px" }}
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                  <button onClick={() => updateStudent(student._id)}>Update</button>
                  <button
                    onClick={() => deleteStudent(student._id)}
                    style={{ marginLeft: "10px", color: "red" }}
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          </Item>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Home;
