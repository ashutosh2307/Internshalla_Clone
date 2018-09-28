const express      = require("express"),
      router       = express.Router(),
      Job          = require("../models/job"),
      middleware   = require("../middleware");
    
router.get("/", function(req, res){
     Job.find({}, function(err, allJob){
        if(err){
            // req.flash("error", "Campground not found");
            console.log(err);
        }
        else {
        res.render("jobs/index", {jobs : allJob});
        }
    });
});

router.post("/", middleware.isLoggedIn,function(req, res){
    
    let title = req.body.title;
    let description = req.body.description;
    let companyName = req.body.companyName;
    let experience = req.body.experience; 
    let qualification = req.body.qualification; 
    let salary = req.body.salary;
    let keySkills = req.body.keySkills;
    let author = {
      id : req.user._id,
      username : req.user.username
    };
    
    let newJob = {
        title : title,
        description : description,
        companyName : companyName,
        experience : experience,
        qualification : qualification,
        salary : salary,
        keySkills : keySkills,
        author : author
    };
    
    Job.create(newJob, function(err, newlyCreated){
        if(err){
            // req.flash("error", "Something went worng");
            console.log(err);
        }
        else {
            // req.flash("success", "Successfully added campground");
            res.redirect("/jobs");
        }
    });
});

router.get("/new", middleware.isLoggedIn, function(req, res) {
   res.render("jobs/new.ejs"); 
});

router.get("/:id", function(req, res){
    Job.findById(req.params.id, function(err, foundJob){
        if(err || !foundJob){
            // req.flash("error", "Campground not found");
            console.log(err);
            res.redirect("back");
        }
        else {
            // console.log(foundCampground);
            res.render("jobs/show", {job : foundJob});
        }
    });
});

//Edit Campground
router.get("/:id/edit", middleware.checkPostOwnership, function(req, res){
    Job.findById(req.params.id, function(err, foundJob) {
        if(err){
            //  req.flash("error", "Campground not found");
             console.log(err);
        }
        else {
            res.render("jobs/edit", {job : foundJob});
        }
    });
});


//Udate Campground
router.put("/:id", middleware.checkPostOwnership, function(req,res){
    Job.findByIdAndUpdate(req.params.id, req.body.job, function(err, updatedJob){
      if(err){
        //   req.flash("error", "Campground not found");
          res.redirect("/jobs");
      } 
      else {
        //   req.flash("success", "Campground successfully upadated");
          res.redirect("/jobs/"+req.params.id);
      }
    });
});

//Destroy Campground
router.delete("/:id", middleware.checkPostOwnership, function(req,res){
    Job.findByIdAndRemove(req.params.id, function(err){
        if(err){
            // req.flash("error", "Campground not found");
            res.redirect("/jobs");
        }
        else {
            // req.flash("success", "Campground successfully deleted");
            res.redirect("/jobs");
        }
    });
});

module.exports = router;