const Student = require("../models/studentModel");
const Class = require("../models/classModel");
const multer = require("multer");
const sharp = require("sharp");

const multerStorage = multer.memoryStorage();
const upload = multer({ storage: multerStorage, fileFilter: multerFitler });
const uploadStudentPhoto = upload.single("photo");

function multerFitler(req, file, cb) {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new Error("Not image, please upload only image"), false);
  }
}

function resizeStudentPhoto(req, res, next) {
  if (!req.file) return next();
  req.file.filename = `student-${req.params.id}-${Date.now()}.jpeg`;
  sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(`public/img/students/${req.file.filename}`);

  next();
  // console.log(req);
}

async function postStudent(req, res) {
  let photoStudent = "";
  if (req.file) {
    photoStudent = req.file.filename;
  }
  const {
    name,
    first_name,
    gender,
    date_of_birth,
    classe,
    address,
    phone,
    mail,
    mother_name,
    mother_occupation,
    mother_phone,
    father_name,
    father_occupation,
    father_phone,
    submission,
  } = req.body;

  try {
    const classFound = await Class.findOne({ level: classe });
    if (!classFound) {
      throw new Error("La classe n'existe pas");
    }

    const studentExist = await Student.findOne({ first_name });
    if (studentExist) {
      throw new Error("Student already exist");
    }
    //create student
    const student = await new Student({
      photo: photoStudent,
      name,
      first_name,
      gender,
      date_of_birth,
      address,
      phone,
      mail,
      mother_name,
      mother_occupation,
      mother_phone,
      father_name,
      father_occupation,
      father_phone,
      submission,
      classe: classFound._id,
    });
    await student.save();
    res.status(201).json({
      message: "Student registered Successfully",
      data: student,
    });
  } catch (err) {
    throw new Error(err.message);
  }
}
async function deleteStudent(req, res) {
  const id = req.params.id;
  try {
    await Student.deleteOne({ _id: id });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
  res.status(200).json({ message: "Student delete Successfully" });
}
async function getAllStudent(req, res) {
  // n'oublie pas de mettre des filtre par date
  const { page = 1, limit = 10, search } = req.query;
  try {
    const searchQuery = {};
    if (search) {
      searchQuery.$or = [
        { first_name: { $regex: search, $options: "i" } },
        { name: { $regex: search, $options: "i" } },
      ];
    }
    const tolaleStudents = await Student.countDocuments(searchQuery);
    const totalPages = Math.ceil(tolaleStudents / limit);
    const students = await Student.find(searchQuery)
      .populate("classe")
      .skip((page - 1) * limit)
      .limit(limit);

    res.status(200).json({
      status: "success",
      message: "Student fetched successfully",
      totale: tolaleStudents,
      totalPages,
      students,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}
async function updateStudent(req, res) {
  const id = req.params.id;
  let photoStudent = "";
  if (req.file) {
    photoStudent = req.file.filename;
  }
  const {
    name,
    first_name,
    gender,
    date_of_birth,
    classe,
    address,
    phone,
    mail,
    mother_name,
    mother_occupation,
    mother_phone,
    father_name,
    father_occupation,
    father_phone,
    submission,
  } = req.body;

  const query = { _id: id };
  try {
    const classFound = await Class.findOne({ level: classe });
    if (!classFound) {
      throw new Error("La classe n'existe pas");
    }

    await Student.findByIdAndUpdate(
      query,
      {
        photo: photoStudent,
        name,
        first_name,
        gender,
        date_of_birth,
        classe: classFound._id,
        address,
        phone,
        mail,
        mother_name,
        mother_occupation,
        mother_phone,
        father_name,
        father_occupation,
        father_phone,
        submission,
      },
      { new: true, runValidators: true }
    );
  } catch (err) {
    res.status(400).json({ message: err?.message });
  }
  res.status(200).json({ message: "La student est à jour avec success" });
}
module.exports = {
  postStudent,
  deleteStudent,
  getAllStudent,
  updateStudent,
  uploadStudentPhoto,
  resizeStudentPhoto,
};
