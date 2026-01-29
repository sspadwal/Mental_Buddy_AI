import mongoose from 'mongoose'

const summarySchema= new mongoose.Schema({
    summaryText:{
        type:String,
        required:true
    },
  
    department:{
        type:String,
        required:true
    },
    org_id:{
        type:String,
        required:true    
    },
    batch_size:{
        type:Number,
        required:true
    }
},{
    timestamps:true
})

export const Summary= mongoose.model('Summary',summarySchema)