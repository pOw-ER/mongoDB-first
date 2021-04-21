const mongoose = require('mongoose')
// const Schema = mongoose.Schema;
const { Schema } = mongoose;

const galleryItemSchema = new Schema({
  url: String,
  author: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 0,
    max: 10
  }
}, { timestamps: true })

//pluralize collection name bekommt immer noch ein s z.B hier GalleryDbs
const GalleryItem = mongoose.model('GalleryDb', galleryItemSchema)

module.exports = GalleryItem;
