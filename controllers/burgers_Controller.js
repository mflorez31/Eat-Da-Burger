var express = require("express");

var router = express.Router();

// Import the model (cat.js) to use its database functions.
var burger = require("../models/burgers.js");

// Default the route to /burgers (Main Home Page)
router.get('/',function(req,res){
  res.redirect("/burgers");
});
// Get Burgers
router.get('/burgers',function(req,res){
  burger.select(function(data){
      var hbsObject = { burgers: data };
      res.render('index',hbsObject);
  });
});
// Create Burger
router.post("/burgers/create",function(req,res){
  burger.create(["burger_name"],[req.body.burger_name],function(result){
      res.redirect("/burgers");
  });
});
// Update Burger
router.put("/api/burgers/:id", function(req, res) {
  var condition = "id = " + req.params.id;

  console.log("condition", condition);

  burger.update({ 'devoured': req.body.devoured },condition,function(data){
    res.redirect('/burgers');
});
});
router.put('/burgers/update/:id', function(req,res){
  var condition = `id = ${req.params.id}`;
  burger.update({ 'devoured': req.body.devoured },condition,function(data){
      res.redirect('/burgers');
  });
});

// Export routes for server.js to use.
module.exports = router;
