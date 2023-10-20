const express = require("express"); 
const app = express(); 
const expressLayouts = require("express-ejs-layouts");
const path = require('path');
const connection = require("./connection.js");
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');
const session = require('express-session');

app.use(session({
    secret: "my secret",
    resave: false,
    saveUninitialized: false
  }));
  
const indexRouter = require('./routes/index')
const resourceRouter = require('./routes/resources')
const moveRouter = require('./routes/movingforward')
const loginRouter = require('./routes/login')
const registerRouter = require('./routes/register')
const dashboardRouter = require('./routes/dashboard')


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(path.join(__dirname, './public')));
app.use('/', indexRouter)
app.use('/', resourceRouter)
app.use('/', moveRouter)
app.use('/', loginRouter)
app.use('/', registerRouter)
app.use('/', dashboardRouter)

app.listen(process.env.PORT || 3000)