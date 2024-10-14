const mongoose = require("mongoose");

// Modèle Étudiant
const studentSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  prenom: { type: String, required: true },
  dateNaissance: Date,
  // ... autres propriétés
  classe: [{ type: mongoose.Schema.Types.ObjectId, ref: "Classe" }], // Relation avec la classe
});
const Student = mongoose.model("Student", studentSchema);

// Modèle Enseignant
const teacherSchema = new mongoose.Schema({
  nom: String,
  prenom: String,
  matieres: [{ type: mongoose.Schema.Types.ObjectId, ref: "Matiere" }], // Matières enseignées
  classes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Classe" }], // Classes attribuées
});
const Teacher = mongoose.model("Teacher", teacherSchema);

// Modèle Classe
const classSchema = new mongoose.Schema({
  niveau: String,
  section: String,
  matieres: [{ type: mongoose.Schema.Types.ObjectId, ref: "Matiere" }],
  enseignant: { type: mongoose.Schema.Types.ObjectId, ref: "Teacher" },
  eleves: [{ type: mongoose.Schema.Types.ObjectId, ref: "Student" }],
});
const Classe = mongoose.model("Classe", classSchema);

// Modèle Matière
const subjectSchema = new mongoose.Schema({
  nom: String,
  coefficient: Number,
});
const Subject = mongoose.model("Subject", subjectSchema);

// Modèle Note
const gradeSchema = new mongoose.Schema({
  valeur: Number,
  date: Date,
  eleve: { type: mongoose.Schema.Types.ObjectId, ref: "Student" },
  matiere: { type: mongoose.Schema.Types.ObjectId, ref: "Subject" },
});
const Grade = mongoose.model("Grade", gradeSchema);

// Modèle Absence
const absenceSchema = new mongoose.Schema({
  date: Date,
  motif: String,
  eleve: { type: mongoose.Schema.Types.ObjectId, ref: "Student" },
  classe: { type: mongoose.Schema.Types.ObjectId, ref: "Classe" },
});
const Absence = mongoose.model("Absence", absenceSchema);

// Modèle Utilisateur (simplifié)
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["eleve", "enseignant", "parent", "admin"] },
  // Autres informations spécifiques au rôle
});
const User = mongoose.model("User", userSchema);
