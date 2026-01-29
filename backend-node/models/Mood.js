import mongoose from "mongoose";

const moodSchema = new mongoose.Schema({
    entry_text: {
        type: String,
        trim: true,
        minlength: 5,
        required: true
    },
    sentiment_score: {
        type: Number,
        default: 1,
        required: true
    },
    category_tags: [String],

    urgency_level: {
        type: Number,
        default: 1,
        required: true
    },
    org_id: {
        type: String,
        default: "Company_A",
        required: true
    },
    department: {
        type: String,
        required: true
    },
    // username: { type: String, required: true }
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    isSummarized:{
        type:Boolean,
        default:false
    }

}, {
    timestamps: true
})

export const Mood = mongoose.model('mood', moodSchema)