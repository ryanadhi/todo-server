if (process.env.NODE_ENV==='development') {
    require('dotenv').config()
} ;


const express = require ('express') ;
const app = express();
const routes = require ('./routes/index') ;


app.use(express.urlencoded({ extended: false })) ;
app.use(express.json()) ;

app.use (routes)

app.listen (process.env.PORT, ()=>{
    console.log(`listening on port: ${process.env.PORT}`);
})

