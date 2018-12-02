const express = require("express");
const path = require("path");
const app = express();

const data = require("./routes/api/v1/data");

const port = process.env.PORT || 3001;

app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "dist", "index.html"));
});

app.use("/api/v1", data);

app.listen(port, () =>
  console.log(`***********Server Running on Port ${port}***********`)
);
