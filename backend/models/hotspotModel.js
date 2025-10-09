import mongoose from 'mongoose';

const hotspotSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  lat: {
    type: Number,
    required: true,
  },
  lng: {
    type: Number,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
});

const Hotspot = mongoose.model('Hotspot', hotspotSchema);

export default Hotspot;
