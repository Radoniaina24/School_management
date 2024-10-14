const mongoose = require("mongoose");
// Modèle Matière
const subjectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  level: { type: String, required: true },
  coefficient: { type: Number, required: true },
});
const Subject = mongoose.model("Subject", subjectSchema);
module.exports = Subject;
