import express from 'express'
import createMood from '../controllers/moodController.js'
import getDepartmentAnalytics from '../controllers/departmentAnalyticsController.js'
import moodHistory from '../controllers/moodhistoryController.js'
import moodSummary from '../controllers/moodSummary.js'

import checkUser from '../middleware/auth.js'
import getSummaryHistory from '../controllers/summaryHistory.js'
const router = express.Router();

router.post('/add', checkUser, createMood)
router.get('/history', checkUser, moodHistory)
router.get('/analytics/:dept', checkUser, getDepartmentAnalytics)
router.post('/summarize', checkUser, moodSummary)
router.get('/summary-history',checkUser,getSummaryHistory)
export default router