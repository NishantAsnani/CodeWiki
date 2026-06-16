const mongoose=require('mongoose');
const {Schema}=mongoose;

const chatSchema=new Schema({
    project:{ type: Schema.Types.ObjectId, ref: 'Project' },
    title:{
        type:String,
        required:true
    }
},{ timestamps:true});

module.exports=mongoose.model('Chat', chatSchema);