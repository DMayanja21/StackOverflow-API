// Call mongoose
const mongoose = require('mongoose');

// Call Schema constructor
const {
  Schema,
} = mongoose;

// Create an answer schema
const answerSchema = new Schema({
  // answer_id: mongoose.Schema.Types.ObjectId,
  question_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  status: {
    upvotes: [{
      user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
      },
    }],
    downvotes: [{
      user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
      },
    }],

  },
  preferred: {
    type: Boolean,
    required: true,
    default: false,
  },
  comments: [{
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    date: {
      type: Date,
      default: new Date(),
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
  }],


});

// Export model
const Answer = mongoose.model('Answer', answerSchema);
module.exports = Answer;
