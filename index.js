const express = require("express");
const app = express();
const cors = require("cors");
const { globalErrHandler, notFound } = require("./middlewares/globaErrHandler");
app.use(cors());
require("dotenv").config();
const dbConnect = require("./config/dbConnect");
const userRoutes = require("./routes/userRoutes");

const subjectRoutes = require("./routes/subjectRoutes");
const classRoutes = require("./routes/classRoutes");
const port = process.env.PORT;
dbConnect();
app.use(express.json());
//routes
app.use("/api/users", userRoutes);
app.use("/api/subject", subjectRoutes);
app.use("/api/class", classRoutes);
//Gestion des erreurs
app.use(notFound);
app.use(globalErrHandler);
app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
