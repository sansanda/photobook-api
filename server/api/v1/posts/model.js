const mongoose = require("mongoose");

const post = {
    location: String,
    photo_url: String,
    description: String,
};

module.exports = mongoose.model('postModel', post);