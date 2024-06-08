const express = require("express");
const app = express();
const port = 8080;

let namesCollection = new Set();

// simple custom logger
app.use((req, res, next) => {
  const startTime = Date.now();
  res.on("finish", () => {
    const endTime = Date.now();
    const logMessage = [
      `-------------`,
      `Incoming request:`,
      `HTTP METHOD: ${req.method}`,
      `Endpoint path:  ${req.originalUrl}`,
      `Status code: ${res.statusCode}`,
      `Total Time: ${endTime - startTime}ms`,
    ].join("\n");
    console.log(logMessage);
  });
  next();
});

app.post("/insert/:name", (req, res) => {
  const name = req.params?.name;
  if (namesCollection.has(name)) {
    res.status(400).json({ success: false });
  } else {
    namesCollection.add(name);
    res.status(201).json({ success: true });
  }
});

app.put("/update/:name/:newName", (req, res) => {
  const name = req.params?.name;
  const newName = req.params?.newName;
  if (namesCollection.has(name)) {
    namesCollection.delete(name);
    namesCollection.add(newName);
    res.status(200).json({ success: true });
  } else {
    res.status(400).json({ success: false });
  }
});

app.delete("/delete/:name", (req, res) => {
  const name = req.params?.name;
  if (namesCollection.has(name)) {
    namesCollection.delete(name);
    res.status(200).json({ success: true });
  } else {
    res.status(400).json({ success: false });
  }
});

app.get("/get-count", (req, res) => {
  res.status(200).json({ count: namesCollection.size });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
