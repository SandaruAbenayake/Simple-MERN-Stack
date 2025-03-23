const router = require("express").Router();
let Student = require('../models/Student');

router.route("/add").post((req, res) => {
    
   
    const {name,age,gender} = req.body;

    const newStudent = new Student({
        name,
        age,
        gender
    });

    newStudent.save()
        .then(() => {
            res.json("Student Added");
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send({ status: "Error with adding student", error: err.message });
        });
});

router.route("/").get((req, res) => {
    Student.find()
        .then((students) => {
            res.json(students);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send({ status: "Error with fetching students", error: err.message });
        });
});

router.route("/update/:id").put(async (req, res) => {
    let {id} = req.params
    const { name, age, gender } = req.body;

    const updateStudent = { name, age, gender };

    await Student.findByIdAndUpdate(id, updateStudent)
        .then(() => {
            res.status(200).send({ status: "User Updated" });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send({ status: "Error with updating data", error: err.message });
        });
});

router.route("/delete/:id").delete(async (req, res) => {
    let userId = req.params.id;

    await Student.findByIdAndDelete(userId)
        .then(() => {
            res.status(200).send({ status: "User Deleted" });
        })
        .catch((err) => {
            console.log(err.message);
            res.status(500).send({ status: "Error with deleting user", error: err.message });
        });
});

router.route("/get/:id").get(async (req, res) => {
    let userId = req.params.id;

    await Student.findById(userId)
        .then((student) => {
            res.status(200).send({ status: "User fetched", student });
        })
        .catch((err) => {
            console.log(err.message);
            res.status(500).send({ status: "Error with getting user", error: err.message });
        });
});

module.exports = router;
