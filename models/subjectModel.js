const mongoose = require("mongoose");
// Modèle Matière
const subjectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  coefficient: {
    type: Number,
    required: [true, "Ce champ coefficient est requis"],
    min: [1, "La coefficient doit être d'au moins 1."],
    max: [5, "La coefficient ne peut pas dépasser 5."],
  },
});
const Subject = mongoose.model("Subject", subjectSchema);
module.exports = Subject;
