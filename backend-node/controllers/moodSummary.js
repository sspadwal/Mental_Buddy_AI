import { Mood } from '../models/Mood.js'
import axios from 'axios'
// import {Summarized} from '../models/Summarized'
import {Summary} from '../models/Summarized.js'
const moodSummary = async (req, res) => {
    let summary_data;
    try {
        const { department, org_id } = req.user

        const entries = await Mood.find({ department, org_id, isSummarized: false }).sort({ createdAt: -1 });
        if (entries.length >= 15) {
            const bundle = entries.map((item) => item.entry_text).join(" | ");

            try {
                // Normalize the AI_ENGINE_URL to prevent double slashes (e.g., //summarize)
                const aiBaseUrl = process.env.AI_ENGINE_URL.replace(/\/+$/, '');
                const summaryResponse = await axios.post(`${aiBaseUrl}/summarize`, { bundle: bundle });
                
                summary_data = typeof summaryResponse.data.message === 'string'
                    ? JSON.parse(summaryResponse.data.message)
                    : summaryResponse.data.message;

                const newSummary = new Summary({ summaryText: summary_data.summary, department, org_id, batch_size: entries.length })
                await newSummary.save();

                const all_id = entries.map((mood) => mood._id)
                await Mood.updateMany({ _id: { $in: all_id } }, { $set: { isSummarized: true } })

                return res.status(200).json(newSummary)

            } catch (aiError) {
                // Fallback if AI fails
                return res.status(500).json({ message: "Analysis temporarily unavailable due to server load.", error: aiError.message });
            }
        }
        else {
            return res.status(200).json({ message: `Not enough data yet. You need 15 queries, but only have ${entries.length}` })
        }


    }
    catch (error) {
        return res.status(400).json({ "message": error.message })
    }

}

export default moodSummary;