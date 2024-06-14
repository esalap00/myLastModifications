// import dependencies
const tunnel = require('./localtunnel');
const mongoose = require('./mongoose');


const reload = (req, res) => {

  // warn about the reload
  console.log("Reloading server");
  res.sendStatus(200);

  // reload the server
  process.exit(0);
};

const status = (req, res) => {
  
  // send some system information
  res.json({
    mongoose: mongoose.status(),
    tunnel: tunnel.status(),
  });
};


module.exports = {
  reload,
  status,
};