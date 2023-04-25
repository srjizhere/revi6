const mongoose = require("mongoose");
ObjectId = mongoose.Schema.ObjectId
const bookingSchema = mongoose.Schema({
	 user : { type: ObjectId, ref: 'User' },
	 flight : { type: ObjectId, ref: 'Flight' }
})


const Booking = mongoose.model("booking", bookingSchema);

module.exports = {
  Booking,
};