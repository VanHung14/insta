const mongoose = require('mongoose');   
const slug = require('mongoose-slug-generator');

mongoose.plugin(slug);
const Schema = mongoose.Schema;

const Post = new Schema({
    name: {type: String, maxlength: 255 },
    description: {type: String, maxlength: 600 }, 
    image: {type: String},
    slug: { type: String, slug: 'name', unique: true }
  }, {
    timestamps: true
  });

module.exports = mongoose.model('Post', Post);