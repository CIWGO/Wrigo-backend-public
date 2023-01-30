const express = require("express");

var app = express();

app.get("/", function(req, res) {
    res.send("Helle World!")
})

app.listen(5000, function () {

console.log("Started application on port %d", 3000);

});

