import express from "express";
import Teacher from "../models/Teacher.model.js";

export const route = express.Router();

// Get all teachers
route.get("/", async (req, res) => {
  try {
    const teachers = await Teacher.find();
    res.status(200).json(teachers);
  } catch (error) {
    console.error("Error fetching teachers:", error);
    res.status(500).json({ message: "Server error", error });
  }
});

// find by id the single student
route.get("/students/:id", (req, res) => {
  res.send("get students");
});

// Update teacher exam data by ID
route.post("/teacher", async (req, res) => {
  try {
    const { studentName, studentId, subjectName, marks } = req.body;

    if (!studentName || !studentId || !subjectName || !marks) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Create a new teacher document
    const teacher = new Teacher({
      studentName,
      studentId,
      subjectName,
      marks,
      timestamp: Date.now()
    });

    // Save to MongoDB
    await teacher.save();

    res.status(201).json({ message: "Teacher saved successfully", teacher });
  } catch (error) {
    console.error("Error saving teacher:", error);
    res.status(500).json({ message: "Server error", error });
  }
});


// Put example
route.put("/teacher/:id", async (req, res) => {
  const { id } = req.params;
  const { studentName, studentId, subjectName, marks } = req.body;

  try {
    const updatedTeacher = await Teacher.findByIdAndUpdate(
      id,
      { studentName, studentId, subjectName, marks },
      { new: true } // return updated document
    );

    if (!updatedTeacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }

    res.status(200).json({ message: "Teacher updated", data: updatedTeacher });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Delete teacher by ID
route.delete("/teacher/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deletedTeacher = await Teacher.findByIdAndDelete(id);

    if (!deletedTeacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }

    res.status(200).json({ message: "Teacher deleted", data: deletedTeacher });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});


route.get("/student", (req, res) => {
  res.send("get what teacher post");
});
