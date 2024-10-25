import photoSchema from "./model/multer.model.js"
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { promises as fs } from 'fs';

export async function fileUpload(req,res) {
   try {
    // console.log(req.file);
    // console.log(req.body);
    const photo=req.file
    const {username,email}=req.body
    await photoSchema.create({username,email,photo}).then(()=>{
        res.status(201).send({msg:"successfully uploaded"})
    }).catch((error)=>{
        // console.log(error);
        res.status(404).send({msg:error})
    })
    
} catch (error) {
    // console.log(error);
    res.status(404).send({msg:error})
    
    
   }  
}

export async function getUsers(req,res) {
    try {
        const users=await photoSchema.find()
        res.status(200).send(users)

    } catch (error) {
        res.status(404).send({msg:users}) 
    }
    
}
export async function getUser(req,res) {
    try {
        const _id=req.params
        const user=await photoSchema.findOne({_id})
        res.status(200).send(user)
       

    } catch (error) {
        res.status(404).send({msg:error}) 
    }
    
}
export async function updateUser(req,res) {
    try {
        const _id=req.params
        const photo=req.file
        const{username,email}=req.body
        // console.log(_id);
        const user=await photoSchema.findOne({_id})
        if(!user)
            res.status(404).send({msg:"user not exist"}) 
        const __filename=fileURLToPath(import.meta.url)
        // console.log(__filename);
        const __dirname=dirname(__filename)
        // console.log(__dirname);
        const fullpath = join(__dirname,"/uploads/",user.photo.filename);
        // console.log(fullpath);
        if(photo)
            await fs.unlink(fullpath)

        await photoSchema.updateOne({_id},{$set:{username,email,photo}}).then(()=>{
            res.status(201).send({msg:"Updated successfully"})
        }).catch((error)=>{
            res.status(404).send({msg:error})
        })


    } catch (error) {
        console.log(error);
        res.status(404).send({msg:error}) 
    }
    
}
export async function deleteUser(req,res) {
    try {
        const _id=req.params;
        // console.log(_id);
        
        const user=await photoSchema.findOne({_id})
        // console.log(user);
        
        if(!user)
            res.status(404).send({msg:"user not exist"}) 
        const __filename=fileURLToPath(import.meta.url)
        // console.log(__filename);
        const __dirname=dirname(__filename)
        // console.log(__dirname);
        const fullpath = join(__dirname,"/uploads/",user.photo.filename);
        // console.log(fullpath);
        await fs.unlink(fullpath)
        await photoSchema.deleteOne({_id}).then(()=>{
            res.status(200).send({msg:"Successfully Deleted"}) 

        }).catch((error)=>{
            log
            res.status(404).send({msg:error}) 
        })  
    } catch (error) {
        console.log(error);
        res.status(404).send({msg:error}) 
    }
    
}