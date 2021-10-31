const express = require('express');
const dotenv= require('dotenv')
const morgan = require('morgan');
const exphbs=require('express-handlebars');
const connectDB=require('./config/db')
const passport = require('passport');
const session=require('express-session');
const path=require('path')


dotenv.config({path: './config/config.env'})

require('./config/passport')(passport)

connectDB();
const app=express();
if(process.env.MODE_ENV==='development'){
    app.use(morgan('dev'))
}
//Handlebars
app.engine('.hbs', exphbs({defaultLayout:'main',extname:'.hbs'}))
app.set('view engine', '.hbs')

//sessions
app.use(session({
    secret:'keyboard car',
    resave:false,
    saveUninitialized:false
}))

//passport middleware
app.use(passport.initialize())
app.use(passport.session())

//static folder
app.use(express.static(path.join(__dirname,'public')))

//routes

app.use('/',require('./routes/index'))
app.use('/auth',require('./routes/auth'))

const PORT=process.env.PORT  || 5000

app.listen(PORT, ()=>{
    console.log(`Server running on port ${process.env.NODE_ENV} mode on port ${PORT}`);
})
