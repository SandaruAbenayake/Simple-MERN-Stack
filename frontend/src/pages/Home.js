import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Swal from 'sweetalert2';

function Home() {

    const [students, setStudents] = useState([])
    const [editData, setEditData] = useState({});

            // Fetch all students
    const getAllStudents = async()=>{

        try {
            const response = await axios.get("http://localhost:5002/student")

            setStudents(response.data)
            
            
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
    const updateStudent = async(id)=>{

        try {
            
            await axios.put(`http://localhost:5002/student/update/${id}`,editData[id])

            Swal.fire({
                title: "Update Success",
                icon:'success',
                draggable: true
                });

        } catch (error) {
            Swal.fire({
                title: "Update Failed",
                icon:'error',
                draggable: true
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
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {

                    await axios.delete(`http://localhost:5002/student/delete/${id}`);
                    setStudents(students.filter(student => student._id !== id)); // Remove from UI
                    Swal.fire("Deleted!", "Student has been removed.", "success");
                } catch (error) {
                    Swal.fire("Error!", "Failed to delete student.", "error");
                    
                }
            }
        });
    };

   


  return (
    <>
        <h1>Student List</h1>
        <ul>
            {students.map((student,index)=>(
                <>
                    <li key={index}> {student.name}</li>
                    <input
                        type="text"
                        class="form-control"
                        id="name"
                        value={editData[student._id]?.name || student.name}
                        placeholder="Student Name"
                        onChange={(e) => handleEdit(student._id, "name", e.target.value)}
                    />

                    <input
                            type="text"
                            className="form-control"
                            defaultValue={editData[student._id]?.age || student.age}
                            placeholder="Age"
                            onChange={(e) => handleEdit(student._id, "age", e.target.value)}
                        />
                        <select
                            className="form-control"
                            value={editData[student._id]?.gender || student.gender}
                            onChange={(e) => handleEdit(student._id, "gender", e.target.value)}
                        >
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                        <button onClick={() => updateStudent(student._id)}>Update</button>
                        <button onClick={() => deleteStudent(student._id)}>Delete</button>
                </>
                
            ))}
        </ul>
      </>
  )
}

export default Home
