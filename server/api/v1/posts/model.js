const mongoose = require('mongoose');

const { Schema } = mongoose;

const fields = {
  location: {
    type: String,
    default: '',
    trim: true
  },
  photo_url: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: '',
    trim: true
  },
};

const post = new Schema(fields, {
  timestamps: true,
});
var postModel = mongoose.model('post', post);
module.exports = postModel;