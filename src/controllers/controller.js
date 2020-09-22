const nodemon = require("nodemon");
const multer = require('multer');
const {getConnection} = require('../database');
const {GridFSBucket} = require('mongodb');
const {Readable} = require('stream');


index = (req, res)=>{
    res.send('audio indexWorks');
}
uploadFile=(req,res)=>{
    
    console.log(req.body);
    
    const storage=multer.memoryStorage();
    
    //use multer to manage audiofile
    const upload = multer({
        storage,  //storage in a buffer
        limits:{
            fields: 1, //fields
            fileSize:6000000, //6mb
            files: 1,//1 file per upload
            parts:2//info type(file and methadata)
        }
    })


    upload.single('audio_file'/*key*/)(req,res,(err)=>{
        console.log(req.body);

        if (err){
            return res.status(400).json({message:err.message})
        }else if(!req.body.audiofilename){
            return res.status(400).json({message:"no filename in request body"})
        }
    
        let audiofilename=req.body.audiofilename;
        // convert buffer to readable stream
        //use readable
        const readAudioStream =new Readable();

        readAudioStream.push(req.file.buffer);
        readAudioStream.push(null)
        //   let flie=req.file;
        
        const db= getConnection();
        
        let bucket=new GridFSBucket(db,{
            bucketName:'archivosAudio'
        });

        let uploadstream=bucket.openUploadStream(audiofilename)//upload file througth buffer(stream buffer)
        let id=uploadstream.id;

        readAudioStream.pipe(uploadstream);

        uploadstream.on('error', () => {
            return res.status(500).json({ message: "Error uploading file" });
        });
    
        uploadstream.on('finish', () => {
        return res.status(201).json({ message: "File uploaded successfully, stored under Mongo ObjectID: " + id });
        });

    });    
}


showFile= (req,res)=>{
    res.send('upladed ok');
}




module.exports={
    index,uploadFile,showFile
}