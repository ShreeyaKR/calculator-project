const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/calculatorDB")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

const HistorySchema = new mongoose.Schema({
  expression: String,
  result: Number
});

const History = mongoose.model("History", HistorySchema);

app.post("/calculate", async (req, res) => {
    console.log(req.body)
  const { expression } = req.body;

  try {
    const result = eval(expression);

    await History.create({
      expression,
      result
    });

    res.json({ result });
  } catch(err) {
    console.log(err);
    res.status(400).json({
      error: "Invalid Expression"
    });
  }
});

app.get("/history", async (req, res) => {
  const history = await History.find().sort({ _id: -1 });
  res.json(history);
});

app.listen(5000, () => {
  console.log("Server Running on Port 5000");
});