const { audiosController } = require("./controller/audiosController.js");
const  express = require("express");
const morgan = require("morgan");

require("dotenv").config();


const app= express();
app.set('port',process.env.PORT || 3000)


//midelwares
app.use(morgan("dev"));
app.use(express.json);

//controller
app.use(audiosController);

//
app.listen(app.get('port'), ()=>{
    console.log(`server on port ${app.get('port')}` );  
})


