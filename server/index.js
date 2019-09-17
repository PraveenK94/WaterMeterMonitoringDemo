var express = require("express");
const https = require("https");
var remoteProxyServerToken = "";
var remoteProxyServerDevicelist = "";

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

function getUpdatedToken() {
  const t = JSON.parse(remoteProxyServerToken).token;
  console.log(t);
  return t;
}

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

function remoteProxyServerGetDeviceData(callback) {
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

const pino = require("express-pino-logger")();

let app = express();
let port = 8000;
app.use(pino);
setTimeout(remoteProxyServerGetToken, 10000);
setInterval(remoteProxyServerGetToken, 27900000);

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
  console.log("be: device");
  remoteProxyServerGetDeviceData(function(errorCode, deviceList) {
    console.log("be: devicelist callback");
    if (errorCode) {
      return res.sendStatus(403);
    }
    res.setHeader("Content-Type", "application/json");
    res.send(JSON.stringify(deviceList));
  });
});

app.get("/api/signin", (req, res) => {
  return res.sendStatus(200);
});

app.listen(port, () => {
  console.log(`Server running on ${port} `);
});
