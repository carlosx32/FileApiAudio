const { model ,Schema } = require("mongoose");

const audioModel = new Schema({
    "dispositivo":{
        "idDispositivo":String,
        "lat":Number,
        "long":Number
    },
    "auduioBase64":String,
})



module.exports= model('audioModel',audioModel)