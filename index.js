const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
require("dotenv").config();
const dbConnect = require("./config/dbConnect");
const userRoutes = require("./routes/userRoutes");
const { globalErrHandler, notFound } = require("./middlewares/globaErrHandler");
const subjectRoutes = require("./routes/subjectRoutes");
const port = process.env.PORT;
dbConnect();
app.use(express.json());
//routes
app.use("/api/users", userRoutes);
app.use("/api/subject", subjectRoutes);
//Gestion des erreurs
app.use(notFound);
app.use(globalErrHandler);
app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
