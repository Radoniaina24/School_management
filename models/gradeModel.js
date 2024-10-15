const mongoose = require("mongoose");
// Modèle Note
const gradeSchema = new mongoose.Schema({
  valeur: Number,
  date: Date,
  student: { type: mongoose.Schema.Types.ObjectId, ref: "Student" },
  subject: { type: mongoose.Schema.Types.ObjectId, ref: "Subject" },
});
const Grade = mongoose.model("Grade", gradeSchema);
module.exports = Grade;
