const express = require("express");
const app = express();

let data = "initial data";

const waitingClients = [];

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.get("/getData", (req, res) => {
  if (data !== req.query.lastData) {
    res.json({ data });
  } else {
    waitingClients.push(res);
  }
});

// user post/put to update
app.get("/updateData", (req, res) => {
  data = req.query.data;

  while (waitingClients.length > 0) {
    const client = waitingClients.pop();
    client.json({ data });
  }

  res.send({ success: "Data Update Successfully" });
});

const port = process.env.PORT || 5011;
app.listen(port, () => {
  console.log("Server is listen on port " + port);
});
