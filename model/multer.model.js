import mongoose from "mongoose"

const photoSchema=mongoose.Schema({
    username:{type:String},
    email:{type:String},
    photo:{type:Object}
})

export default mongoose.model.photos||mongoose.model("photo",photoSchema)