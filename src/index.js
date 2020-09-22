const express =require('express')
const morgan = require('morgan')
var cors = require('cors');
var os = require("os");
const app = express(); //instance express
const testPort = 3000; //test port 
const rutasaudio= require('./routes/audio.routes')


app.set('port', process.env.PORT || testPort);


//middlewares
app.use(cors());
app.use(morgan('dev'));
    //routes
app.use(rutasaudio)

//up
app.listen(app.get('port'), () => {
    //console.dir(os.networkInterfaces());
    console.log("server up and ready for listen at port " + app.get('port'));
}) //indicate the port to listen, callback funtion allows know that the server is up