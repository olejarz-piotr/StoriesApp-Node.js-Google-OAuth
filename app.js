const express = require('express');
const dotenv= require('dotenv')
const morgan = require('morgan');
const exphbs=require('express-handlebars');
const connectDB=require('./config/db')

dotenv.config({path: './config/config.env'})

connectDB();
const app=express();
if(process.env.MODE_ENV==='development'){
    app.use(morgan('dev'))
}
//Handlebars
app.engine('.hbs', exphbs({defaultLayout:'main',extname:'.hbs'}))
app.set('view engine', '.hbs')

//routes

app.use('/',require('./routes/index'))

const PORT=process.env.PORT  || 5000

app.listen(PORT, ()=>{
    console.log(`Server running on port ${process.env.NODE_ENV} mode on port ${PORT}`);
})
