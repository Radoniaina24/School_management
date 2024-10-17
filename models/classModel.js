const mongoose = require("mongoose");
// Modèle Classe
const classSchema = new mongoose.Schema({
  level: { type: String, require: true },
  // subjects: [{ type: mongoose.Schema.Types.ObjectId, ref: "Subject" }],
  //teacher: { type: mongoose.Schema.Types.ObjectId, ref: "Teacher" },
  // students: [{ type: mongoose.Schema.Types.ObjectId, ref: "Student" }],
});
const Class = mongoose.model("Class", classSchema);
module.exports = Class;
