const express = require("express");
const cors = require("cors");
require("./database/db");
const User = require("./models/Vendor");

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("<h1>Welcome Page</h1>");
});

app.post("/upload", async (req, res) => {
  let data = await User(req.body);
  await data.save();
  res.send({ message: "Data saved in database" });
});

app.get("/details", async (req, res) => {
  let details = await User.find();
  if (details.length > 0) {
    res.send(details);
  } else {
    res.send({ result: "No details found" });
  }
});

app.delete("/delete/:id", async (req, res) => {
  let result = await User.deleteOne({ _id: req.params.id });
  res.send(result);
});

app.get("/details/:id", async (req, res) => {
  let result = await User.findOne({ _id: req.params.id });
  if (result) {
    res.send(result);
  } else {
    res.send({ mesage: "No record Found" });
  }
});

app.put("/update/:id", async (req, res) => {
  let result = await User.updateOne(
    { _id: req.params.id },
    {
      $set: req.body,
    }
  );
  res.send(result);
});

app.listen(5000, () => {
  console.log("Server is listening at port : 5000");
});