const express = require("express");
const app = express();
const routes = require("./routes");

const PORT = process.env.PORT || 3000;

app.use(routes);

app.get("/", function (req, res) {
    res.send("<h1>Hello World</h1>")
});

app.listen(3000, () => {
    console.log("Server is running on Port " + PORT);
});