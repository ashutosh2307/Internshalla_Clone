const express      = require("express"),
    router         =  express.Router(),
    passport       = require("passport"),
    User           = require("../models/user");
    
router.get("/", function(req, res){
    res.send("landing");
});

/* =========================
  AUTH ROUTES
  ========================= */

router.get("/register", function(req,res){
    res.render("user/register");
});

//Student SignUp logic
router.post("/register", function(req, res){
    var newUser = new User({username : req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            //   req.flash("error", err.message);
              return res.redirect("/registerStudent");
            }
        passport.authenticate("local")(req, res, function(){
            // req.flash("success", "Welcome to YelpCamp "+user.username);
            res.redirect("/jobs");
        });
    });
});


//Login Form
router.get("/login", function(req, res){
    res.render("user/login");
});

//Login Logic
router.post("/login", passport.authenticate("local", {
    successRedirect: "/jobs",
    failureRedirect: "/login"
    }),function(res, res){
});

//LogOut Logic
router.get("/logout", function(req, res){
    req.logout();
    // req.flash("success", "Logged you out!");
    res.redirect("/jobs");
});


module.exports = router;