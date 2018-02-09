var express = require('express');
var router = express.Router();
var path = require('path');

router.get("/", function(req, res) {
res.render("index")

  // res.sendFile(path.join(__dirname, '../index.html'));
  //Note: __dirname returns the directory that the currently 
  //executing script is in. In our case, the "index.html" file is in
  //"app" directory, which is the parent directory of the parent of
  //"index.js". SO, in order to get to "app/index.html", we will have
  //to back out two levels because right now we are in "app/routes/index.html".
});


module.exports = router; 