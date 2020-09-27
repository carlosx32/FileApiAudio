const audioModel= require('../model/audiomodel')


insertAudios= async (req,res)=>{
    console.log(req.body);
    body=req.body;
    let a=new audioModel(req.body)
    const save = await a.save();
    res.status(200).json({save})
} 

getAudios= async (req,res)=>{
    all = await audioModel.find();
    console.log(all);
    res.status(200).send(all); 
}



module.exports={
    insertAudios,getAudios
}