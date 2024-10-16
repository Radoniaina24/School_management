const mongoose = require("mongoose");
// Modèle Étudiant
const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  firstname: { type: String, required: true },
  date_of_birth: { type: String, required: true },
  dddress: { type: String, required: true },
  phone: { type: String },
  email: { type: String },
  school_level: { type: String },
  registration_date: { type: String, required: true },
  classe: [{ type: mongoose.Schema.Types.ObjectId, ref: "Class" }], // Relation avec la classe
});
const Student = mongoose.model("Student", studentSchema);
module.exports = Student;
