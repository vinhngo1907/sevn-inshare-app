require("dotenv").config();
const express = require("express");
// const bodyParser = require("body-parse");
const cors = require("cors");

// const authApiRoute = require("./routes/auth");
const fileApiRoute = require("./routes/files")
    // const database = require("./database/db");


const app = express();
// app.use(bodyParser())
app.use(cors({ credentials: true, origin: true }));
// app.use(cors())
app.use(express.json())

// app.use("/api/auth", authApiRoute);
app.use("/files", fileApiRoute);

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log('Server started on port ' + PORT)
})