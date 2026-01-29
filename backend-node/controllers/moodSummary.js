import { Mood } from '../models/Mood.js'
import axios from 'axios'
// import {Summarized} from '../models/Summarized'
import {Summary} from '../models/Summarized.js'
const moodSummary = async (req, res) => {
    let summary_data;
    try {
        const { department, org_id } = req.user

        const entries = await Mood.find({ department, org_id, isSummarized: false }).sort({ createdAt: -1 });
        console.log(entries.length)
        if (entries.length >= 15) {
            const bundle = entries.map((item) => item.entry_text).join(" | ");

            try {
                const summaryResponse = await axios.post(`${process.env.AI_ENGINE_URL}/summarize`, { bundle: bundle });
                // Robust parsing check
                // console.log("summaryResponse : ", summaryResponse.data.message)
                summary_data = typeof summaryResponse.data.message === 'string'
                    ? JSON.parse(summaryResponse.data.message)
                    : summaryResponse.data.message;
                const newSummary =await new Summary({summaryText:summary_data.summary,department,org_id,batch_size:entries.length})
                await newSummary.save();
                const all_id= entries.map((mood)=>mood._id)
            
                await Mood.updateMany({_id:{$in:all_id}},{$set:{isSummarized:true}})
                // console.log("summary_data : " , summary_data)

            } catch (aiError) {
                console.log("AI Server Error:", aiError.message);
                summary_data = { summary: "Analysis temporarily unavailable due to server load." };
            }
        }
        else{
            return res.status(200).json({message:`Not enough data yet. You need 15 queries, but only have ${entries.length}`})
        }
        res.status(200).json(newSummary)


    }
    catch (error) {
        return res.status(400).json({ "message": error.message })
    }

}

export default moodSummary;