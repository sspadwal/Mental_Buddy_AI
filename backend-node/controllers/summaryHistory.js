import { Summary } from '../models/Summarized.js';
const getSummaryHistory=async(req,res)=>{
    try{
    const { department, org_id } = req.user
    const final_summary=await Summary.find({department,org_id}).sort({ createdAt: -1 });
    return res.status(200).json({data:final_summary})

    }
    catch(e){
    return res.status(400).json({error:e.message})
    }
}
export default getSummaryHistory;