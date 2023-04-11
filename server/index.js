"use strict";

// import the needed node_modules.
const express = require("express");
const morgan = require("morgan");

const { attemptLogin, saveLoop, getLoopsByUserId,deleteLoopById } = require("./handlers");

express()
  // Below are methods that are included in express(). We chain them for convenience.
  // --------------------------------------------------------------------------------
  .use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Methods",
      "OPTIONS, HEAD, GET, PUT, POST, DELETE"
    );
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  })
  // This will give us will log more info to the console. see https://www.npmjs.com/package/morgan
  .use(morgan("tiny"))
  .use(express.json())

  // Any requests for static files will go into the public folder
  .use(express.static("public"))

  //test bacon
  .get("/bacon", (req, res) => res.status(200).json("🥓"))

  //post handler to /api/userAuth
  .post("/api/userAuth", attemptLogin)
  .post("/api/loops/:user_id", saveLoop)
  .get("/api/loopsByUser/:user_id", getLoopsByUserId)
  .delete("/api/loops/:loop_id", deleteLoopById)

  //catch all 404
  .get("*", (req, res) => {
    res.status(404).json({ status: 404, message: "not found" });
  })

  //listen for requests :)
  .listen(8000, () => console.log(`Listening on port 8000`));
