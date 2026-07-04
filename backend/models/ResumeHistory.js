import mongoose from "mongoose";

const resumeHistorySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  userId: String,

  name: String,

  fileName: String,

  atsScore: Number,

  summary: String,

  strengths: [String],

  suggestions: [String],

  uploadDate: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model(
  "ResumeHistory",
  resumeHistorySchema
);