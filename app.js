require('dotenv').config()
const express = require('express')
const app  = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
var path = require('path');
const passport = require('passport');




//My Routes
const homeRoutes = require('./routes/index')
const authRoutes = require('./routes/auth')
const dashRoutes = require('./routes/dashboard')




// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');





//DB Connection
mongoose.connect(process.env.DATABASE,
    {useNewUrlParser: true, 
       useUnifiedTopology: true,}).then(()=>{
       console.log("DB Connected")
   }).catch(()=>{
       console.log("DB Disconnected !!!")
       console.log(err)
   })


//Middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname, '/')));


// Initializes passport and passport sessions
app.use(passport.initialize());
app.use(passport.session());


//MY ROUTES
app.use('/',homeRoutes)
app.use('/',authRoutes)
app.use('/',dashRoutes)

// app.use('/api',profileRoutes)
// app.use('/api',userRoutes)
// app.use('/api',attendanceRoutes)
// app.use('/api',restrauntRoutes)





const port = process.env.PORT || 8000

app.listen(port,()=>{
    console.log(`App Started on ${port}`)
})


