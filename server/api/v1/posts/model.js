const mongoose = require('mongoose');

const { Schema } = mongoose;

const postFields = {
  location: {
    type: String,
    default: '',
    trim: true,
    required: true
  },
  photo_url: {
    type: String,
    default: '',
    required: true,
  },
  description: {
    type: String,
    default: '',
    trim: true,
  },
};


const postSchemma = new Schema(postFields, {
  timestamps: true
});

var postModel = mongoose.model('post',postSchemma);
module.exports = postModel;