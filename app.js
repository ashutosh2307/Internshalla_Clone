const express         = require("express"),
      mongoose        = require("mongoose"),
      bodyParser      = require("body-parser"),
      passport        = require("passport"),
      LocalStrategy   = require("passport-local"),
      methodOverride  = require("method-override");
      
const app = express();

const User   = require("./models/user"),
      Job    = require("./models/job");
      
const jobsRoutes       = require("./routes/jobs"),
      indexRoutes      = require("./routes/index");
    
mongoose.connect("mongodb://naruto1234:naruto1234@ds115543.mlab.com:15543/job-portal", { useNewUrlParser: true });

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(methodOverride("_method"));

//Configuring Passport Authentication
app.use(require("express-session")({
    secret : "Naruto Shippuden is the best anime.",
    resave : false,
    saveUninitialized : false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

    
app.use("/jobs", jobsRoutes);
app.use(indexRoutes);

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server has Started");
});