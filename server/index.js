var express = require("express");
//var morgan = require("morgan");
const pino = require("express-pino-logger")();

let app = express();
let port = 8000;
app.use(pino);
//app.use(morgan("dev"));

//

app.get("/api/signin", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.send(JSON.stringify({ greeting: "Hello" }));
});

app.listen(port, () => {
  console.log(`Server running on ${port} `);
});
