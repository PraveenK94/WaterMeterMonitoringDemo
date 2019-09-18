var express = require("express");
const https = require("https");
const pino = require("express-pino-logger")();

let app = express();
let port = 8000;

app.use(pino);

var remoteProxyServerToken = "";
var remoteProxyServerDevicelist = "";
var remoteProxyServerDeviceData = "";

//function to GET Token
function remoteProxyServerGetToken() {
  const data = JSON.stringify({
    id: "5d5ec20aedc3268530f1659c",
    u: "$2b$07$FSxd3aDsh1eBTvQxJhfTLOJL3tqdCSSEJLM4KVTXb3sz/K8sVXUXq"
  });

  const options = {
    hostname: "ec2-52-66-213-31.ap-south-1.compute.amazonaws.com",
    port: 7452,
    path: "/cmVzdGZ1bCBhcGk/cmlybyBsb3JhIHByb3h5IHNlcnZlciA/signin",
    method: "POST",
    rejectUnauthorized: false,
    headers: {
      "Content-Type": "application/json",
      "Content-Length": data.length
    }
  };

  const req = https.request(options, res => {
    res.on("data", d => {
      remoteProxyServerToken = JSON.parse(d.toString()).token;
      console.log(remoteProxyServerToken);
      console.log("\n");
    });
  });

  req.on("error", e => {
    console.error(e);
  });

  req.write(data);

  req.end();
}

// function to GET Device List
function remoteProxyServerGetDevicelist(callback) {
  var err = false;
  const options = {
    hostname: "ec2-52-66-213-31.ap-south-1.compute.amazonaws.com",
    port: 7452,
    path:
      "/cmVzdGZ1bCBhcGk/cmlybyBsb3JhIHByb3h5IHNlcnZlciA/5d5ec20aedc3268530f1659c/2/deviceList?limit=100&offset=0",
    method: "GET",
    rejectUnauthorized: false,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${remoteProxyServerToken}`
    }
  };
  console.log("be: devicelist req");
  const req = https.request(options, res => {
    console.log(
      "be: devicelist response",
      res.statusCode,
      " status message::",
      res.statusMessage
    );
    res.on("data", d => {
      remoteProxyServerDeviceData = d.toString();
      console.log(remoteProxyServerDeviceData);
      console.log("\n");
      callback(err, remoteProxyServerDeviceData);
    });
  });

  req.on("error", e => {
    console.log("be: devicelist req error");
    err = true;
    callback(err, null);
    console.error(e);
  });

  req.end();
}

setTimeout(remoteProxyServerGetToken, 100);
setInterval(remoteProxyServerGetToken, 27900000);

// function to call GET DeviceData
function remoteProxyServerGetDeviceData(deviceId, callback) {
  var err = false;
  const deviceEui = deviceId.devEUI;
  console.log("device EUI::::::", deviceEui);
  const options = {
    hostname: "ec2-52-66-213-31.ap-south-1.compute.amazonaws.com",
    port: 7452,
    path: `/cmVzdGZ1bCBhcGk/cmlybyBsb3JhIHByb3h5IHNlcnZlciA/5d5ec20aedc3268530f1659c/2/${deviceEui}/getDeviceData`,
    method: "GET",
    rejectUnauthorized: false,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${remoteProxyServerToken}`
    }
  };

  console.log("be: devicelist req");
  const req = https.request(options, res => {
    console.log(
      "be: devicelist response",
      res.statusCode,
      " status message::",
      res.statusMessage
    );
    res.on("data", d => {
      remoteProxyServerDevicelist = d.toString();
      console.log(remoteProxyServerDevicelist);
      console.log("\n");
      callback(err, remoteProxyServerDevicelist);
    });
  });

  req.on("error", e => {
    console.log("be: devicelist req error");
    err = true;
    callback(err, null);
    console.error(e);
  });

  req.end();
}

app.get("/api/devicelist", (req, res) => {
  console.log("be: devicelist");
  remoteProxyServerGetDevicelist(function(errorCode, deviceList) {
    console.log("be: devicelist callback");
    if (errorCode) {
      return res.sendStatus(403);
    }
    res.setHeader("Content-Type", "application/json");
    res.send(JSON.stringify(deviceList));
  });
});

app.get("/api/devicedata", (req, res) => {
  console.log("be: devicedata query", req.query);
  remoteProxyServerGetDeviceData(req.query, function(errorCode, deviceData) {
    console.log("be: devicedata callback");
    if (errorCode) {
      return res.sendStatus(403);
    }
    res.setHeader("Content-Type", "application/json");
    res.send(JSON.stringify(deviceData));
  });
});

app.get("/api/signin", (req, res) => {
  return res.sendStatus(200);
});

app.listen(port, () => {
  console.log(`Server running on ${port} `);
});
