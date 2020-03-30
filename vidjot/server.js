const express = require("express");
const mongoose = require("mongoose");
const exphbs = require("express-handlebars");
const flash = require("connect-flash");
const session = require("express-session");
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const path = require('path')


const app = express();


// load routes

const ideas = require('./routes/ideas');
const users = require('./routes/users');

// connect db 

mongoose
.connect('mongodb+srv://admin:admin@nodejs1-mijxb.mongodb.net/test?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(()=> console.log("DB Connected!!"))
.catch((err)=> console.log(err));


// handlebars middlewares

app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);

app.use(bodyParser.urlencoded({extended: false}));

app.use(bodyParser.json());

//static folder
app.use(express.static(path.join(__dirname, 'public')));

app.use(methodOverride('_method'));

app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true,

}));

app.use(flash());

app.use(function(req,res,next){
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

app.set("view engine", "handlebars");

app.get("/about", (req, res, next) => {
  res.render("about");
});




app.get("/", (req, res, next) => {
  const title = "VidJot";
  res.render("index", {
    title: title
  });
});


app.use('/ideas', ideas);
app.use('/users', users);

app.listen(8000);
