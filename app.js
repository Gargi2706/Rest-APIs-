// const express = require('express');
// const app = express();
// const port = 3000;

// app.get('/', (req, res) => {
//   res.send('Api is running');
// });

// app.listen(port, () => {
//   console.log(`Example app listening at http://localhost:${port}`);
// });


const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();

const app = express();

connectDB();

app.use(express.json());

const userRoutes = require("./routes/userRoutes");

app.use("/api", userRoutes);

const profileRoutes = require("./routes/profileRoutes");

app.use("/api", profileRoutes); 

const PORT = process.env.PORT;

app.listen(PORT, () => {

 console.log("Server running on port "+PORT);

});