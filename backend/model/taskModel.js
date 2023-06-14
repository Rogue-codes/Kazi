import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  isCompleted:{
    type: Boolean,
    required: true,
    default: false
  },
  startDate: {
    type: String,
    default: () => new Date().toLocaleString().split(",")[0],
  },
  dateDue: { 
    type: String, 
    required: true,
  },
  category: {
    type: String,
    required: true,
    enum: ["college stuff", "work", "study", "personal project", "home"],
  },
});


// Virtual property for duration calculation
// taskSchema.virtual('duration').get(function() {
//     const diffInMilliseconds = this.endDate - this.startDate;
// Convert the difference to the desired duration format (e.g., minutes, hours, days, etc.)
// Here, we'll calculate the duration in days
// const diffInDays = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24));
// return diffInDays;
// });

// Enable virtual property to be included in JSON output
// taskSchema.set('toJSON', { getters: true });

const Task = mongoose.model("Task", taskSchema);

export default Task;
