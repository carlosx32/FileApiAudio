const {MongoClient}=require('mongodb');

let db;
MongoClient.connect(
    'mongodb+srv://audioUser:audioUser@cluster0.fangg.mongodb.net/test?retryWrites=true&w=majority',
    {useUnifiedTopology: true},
    (err, client)=>{
        if(err){
            console.log(err);
            process.exit(0)
        }
    console.log("db conected");
    db=client.db('audio');
})

const getConnection =()=> db;

module.exports={
    getConnection
}


