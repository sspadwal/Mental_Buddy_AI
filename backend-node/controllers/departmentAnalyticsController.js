import { Mood } from '../models/Mood.js'
import axios from 'axios'

const getDepartmentAnalytics = async (req, res) => {
    try {
        const dept = req.user.department;
        console.log(dept)
        // 1. Get the TRUE total count for the manager to see (Scale)
        const true_total = await Mood.countDocuments({
            department: dept,
            org_id: req.user.org_id
        });

        // 1.1 Get the count of UNSUMMARIZED entries for the readiness guardrail
        const unsummarized_count = await Mood.countDocuments({
            department: dept,
            org_id: req.user.org_id,
            isSummarized: false
        });

        // 2. Get only the most RECENT 20 entries for analysis (Performance & Quota)
        const department = await Mood.find({
            department: dept,
            org_id: req.user.org_id
        }).sort({ createdAt: -1 }).limit(20);

        const current_batch_size = department.length;
        let average = 0;

        // 3. Math Logic for the recent batch
        if (current_batch_size > 0) {
            const total_sum = department.reduce((acc, item) => acc + item.sentiment_score, 0);
            average = total_sum / current_batch_size;
        }

        const critical = department.filter((item) => item.urgency_level >= 4);

        // 4. AI Summary Logic with Fallback
        let summary_data = { summary: "No Data Available yet." };


        return res.status(200).json({
            department: dept,
            stats: {
                totalEntries: true_total, // Now showing the real total
                unsummarizedCount: unsummarized_count, // For the readiness check
                averageSentiment: average,
                criticalAlerts: critical.length,
                status: average < 0 ? "At Risk" : "Cool",
                // summary: summary_data.summary
            },
            data: department
        });

    } catch (e) {
        console.error("Controller Error:", e.message);
        return res.status(400).json({ message: "Failed to generate department analytics." });
    }
}

export default getDepartmentAnalytics;