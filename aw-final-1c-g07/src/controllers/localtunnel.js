// import dependencies
const lt = require('localtunnel');


// some global variables
let tunnel = null;
let password = null;
let port = 3000;


const connect = async (portNumber) => {

  // save the port number if provided
  if (portNumber) port = portNumber;

  // ignore if already connected
  if (tunnel && !tunnel.closed) return;

  // bypass the localtunnel setup if LOCALTUNNEL_ENABLED is not set
  if (!process.env.LOCALTUNNEL_ENABLED) return;

  // create the tunnel
  tunnel = await lt({
    port: port,
    subdomain: process.env.LOCALTUNNEL_SUBDOMAIN
  });
  
  // add some handlers to the tunnel events
  tunnel.on("close", () => console.log("Localtunnel closed"));
  tunnel.on("error", err => console.error(`Localtunnel error: ${err}`));
  
  // add some hooks to gracefully close the tunnel
  process.on("exit", disconnect);
  process.on("SIGINT", () => process.exit());
  process.on("SIGTERM", () => process.exit());
  process.on("SIGUSR1", () => process.exit());
  process.on("SIGUSR2", () => process.exit());
  
  // get the password required by localtunnel
  password = await fetch("https://loca.lt/mytunnelpassword").then(res => res.text())
  
  // print the obtained url (may differ from the requested or be random) and the password
  console.log(`HTTPS tunnel is running on ${tunnel.url}`);
  console.log(`Localtunnel password: ${password}`);

  // return the tunnel object
  return tunnel;
}

const disconnect = () => {

  // bypass if the tunnel is not connected
  if (!tunnel || tunnel.closed) return;
  
  // close the tunnel and reset it
  tunnel.close();
  tunnel = null;

  // signal the disconnection
  return true;
};


const status = () => {

  // return the status information
  return {
    url: tunnel ? tunnel.url : null,
    status: tunnel && !tunnel.closed ? "connected" : "disconnected",
    password: password
  };
};

module.exports = {
  connect,
  disconnect,
  status
};