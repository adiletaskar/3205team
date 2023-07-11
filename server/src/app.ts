import express from "express";

const app = express();
const cors = require("cors");
const port = 5000;

app.use(cors());

const router = require("./routes/index");
app.use("/api", router);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
