import { Router } from "express";
import * as rh from "./requestHandler.js";
import multer from "multer"
import path from "path"
const router=Router()

const storage = multer.diskStorage({
    destination: "./uploads",
    filename: function (req, file, cb) {
        
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, uniqueSuffix + "_" + file.originalname)
    }
  })
  
  const upload = multer({storage})

router.route("/upload").post(upload.single('photos'),rh.fileUpload)
router.route("/get").get(rh.getUsers)
router.route("/getuser/:_id").get(rh.getUser)
router.route("/updateuser/:_id").put(upload.single('photos'),rh.updateUser)
router.route("/delete/:_id").delete(rh.deleteUser)
router.route("/image/:filename").get((req,res)=>{
  // console.log(req.params);
  const{filename}=req.params
  return res.sendFile(path.resolve(`./uploads/${filename}`))
})

export default router