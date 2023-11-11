"use strict";

const { MongoClient, ObjectId } = require("mongodb");
const { v4: uuidv4 } = require("uuid");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// Function to attempt login
const attemptLogin = async (req, res) => {
  const user = req.body.user;
  console.log(user);

  const client = new MongoClient(MONGO_URI, options);
  await client.connect();
  const db = client.db("loop-dabord");
  const users = db.collection("users");

  const foundUser = await users.findOne({ email: user.email });

  if (foundUser) {
    // If user is found, return success response
    res
      .status(200)
      .json({ status: 200, message: "User found", user: foundUser });
  } else {
    // If user is not found, add them to the database
    const newUser = {
      _id: uuidv4(),
      first_name: user.given_name,
      last_name: user.family_name,
      email: user.email,
      picture: user.picture,
    };
    const result = await users.insertOne(newUser);
    if (result.insertedCount === 1) {
      res
        .status(200)
        .json({ status: 200, message: "User added", user: newUser });
    } else {
      res.status(500).json({ status: 500, message: "Error adding user" });
    }
  }
};

// Function to save loop
const saveLoop = async (req, res) => {
  const loop = req.body.loop;
  const user_id = req.params.user_id;

  const client = new MongoClient(MONGO_URI, options);
  await client.connect();
  const db = client.db("loop-dabord");
  const loops = db.collection("loops");

  const newLoop = {
    _id: uuidv4(),
    user_id: user_id,
    loop: loop,
  };
  const result = await loops.insertOne(newLoop);
  if (result.acknowledged) {
    res.status(200).json({ status: 200, message: "Loop added", loop: newLoop });
  } else {
    res.status(500).json({ status: 500, message: "Error adding loop" });
  }
};

// Function to get loops by user id
const getLoopsByUserId = async (req, res) => {
  const user_id = req.params.user_id;
  const client = new MongoClient(MONGO_URI, options);
  await client.connect();
  const db = client.db("loop-dabord");
  const loops = db.collection("loops");

  const foundLoops = await loops.find({ user_id: user_id }).toArray();

  if (foundLoops) {
    // If user is found, return success response
    res
      .status(200)
      .json({ status: 200, message: "Loops found", loops: foundLoops });
  } else {
    // If user is not found, add them to the database
    res.status(500).json({ status: 500, message: "Error finding loops" });
  }
};
// Function to delete loop by id
const deleteLoopById = async (req, res) => {
  const loop_id = req.params.loop_id;
  console.log("loop_id", loop_id);

  const client = new MongoClient(MONGO_URI, options);
  await client.connect();
  const db = client.db("loop-dabord");
  const loops = db.collection("loops");

  const result = await loops.deleteOne({ _id: loop_id });

  if (result.deletedCount === 1) {
    res.status(202).json({ status: 202, message: "Loop deleted" });
  } else {
    res.status(500).json({ status: 500, message: "Error deleting loop" });
  }
};

module.exports = {
  attemptLogin,
  saveLoop,
  getLoopsByUserId,
  deleteLoopById,
};
