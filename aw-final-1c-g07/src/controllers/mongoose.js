// import dependencies
const mongoose = require("mongoose");


const connect = async () => {

  // obtain the connection URI from the environment variable
  const mongo_uri = process.env.MONGO_URI;

  // set up sone mongoose events
  mongoose.connection.on("error", (error) => console.error(`Mongoose error: ${error}`));
  mongoose.connection.on("connected", () => console.log(`Mongoose connected to ${mongoose.connection.name}.`));
  mongoose.connection.on("disconnected", () => console.log(`Mongoose disconnected from ${mongoose.connection.name}.`));

  // perform the actual connection
  return mongoose.connect(mongo_uri);
};


const status = () => {

  // get the connection state
  let state = mongoose.connection.readyState

  // return the status information
  return {
    state: state === 1 ? "connected" : "disconnected",
    version: mongoose.version,
  }
};


module.exports = {
  connect,
  status
};