const busRoutes = require("./src/routes/busRoutes");

const express = require("express");
const app = express();

app.use("/search", busRoutes); // Example url: http://localhost:3000/search?from=Gdańsk, Dworzec Autobusowy&to=Test&time=14:00&day=weekdays

app.get("/", (req, res) => {
  res.send("GdzieOnJest Welcomes Urbanowicz!");
});

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
