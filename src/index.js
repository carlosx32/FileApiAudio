const { audiosRoutes } = require("./routes/audioRoutes");
const  expr = require("express");
const morgan = require("morgan");
const  mongoose  = require("mongoose");

require("dotenv").config();

mongoose.connect(process.env.mongourl, {useNewUrlParser: true, useUnifiedTopology:true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', ()=> {
    console.log("Db conected")
});
//settings
const app= expr();

//midelwares
app.use(expr.json()) // for parsing application/json
app.use(expr.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(morgan("dev"));


app.set('port',process.env.PORT || 3000)

//routes
app.use( require("./routes/audioRoutes"));

//

app.listen(app.get('port'), ()=>{
    console.log(`server on port ${app.get('port')}` );  
})