const mongoose = require("mongoose");

const shipmentSchema = new mongoose.Schema({
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
    required: true,
  },
  pickupAddress: String,
  deliveryAddress: String,
  pickupLocation: {
    lat: Number,
    lng: Number,
  },
  deliveryLocation: {
    lat: Number,
    lng: Number,
  },
  receiverName: String,
  receiverPhone: String,
  weight: Number,
  status: {
    type: String,
    enum: ["Booked", "Picked", "In Transit", "Delivered"],
    default: "Booked",
  },
  trackingId: {
    type: String,
    unique: true,
  },
  assignedStaff: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Staff",
    default: null,
  },
  confirmation: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  deliveryDate: Date,
});

module.exports = mongoose.model("Shipment", shipmentSchema);