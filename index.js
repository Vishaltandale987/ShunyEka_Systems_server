const express = require("express");

const cors = require("cors");
const connection  = require("./config/db");

require("dotenv").config();

const { default: axios } = require("axios");
const { DataModel } = require("./model/Data.Model");

let app = express();
app.use(express.json());
app.use(cors());













//welcome

app.get("/", (req, res) => {
  res.send("Welcome to ShunyEka Systems Assignment Server.");

});

// get


app.get("/users", async (req, res) => {
  try {
    const notes = await DataModel.find();
    res.send(notes);
  } catch (error) {
    console.log(error)
  }

});

// post

app.post("/users", async (req, res) => {

  const newPost = new DataModel(req.body);
  try {
    const savedPost = await newPost.save();
    res.status(200).json("User has been added successfully.")
  } catch (err) {
    res.status(500).json(err);
  }
});


// delete 

app.delete("/users/:id", async (req, res) => {


  try {
    await DataModel.findByIdAndDelete(req.params.id);
    res.status(200).json("User has been deleted");
  } catch (err) {
    return res.status(500).json(err);
  }
});

//find single user

app.get("/users/:id", async (req, res) => {


  try {
   let notes =  await DataModel.findById(req.params.id);
    res.send(notes);

  } catch (err) {
    return res.status(500).json(err);
  }
});


// edit 

app.put("/users/:id", async (req, res) => {
const editid =  req.params.id

const obj =  req.body

console.log(editid,obj)

  try {
    const user = await DataModel.findByIdAndUpdate(editid, {
      $set: obj,
    });
    res.status(200).json("User has been updated");
  } catch (err) {
    return res.status(500).json(err);
  }
});


connection()
app.listen(process.env.port, async () => {
  try {
    // await connection;
    console.log("connected to the db");
  } catch (error) {
    console.log(error);
  }
  console.log(`server running on ${process.env.port} `);
});
