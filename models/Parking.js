const mongoose = require('mongoose');

const parkingSchema = new mongoose.Schema({
    photo: String,
    name: String,
    mobile: String,
    vehicleCompanyAndModel: String,
    vehicleColor: String,
    vehicleNumber: String,
    parkingSlot: String,
    floor: String,
    entryDate: Date,
    entryTime: String,
    exitDate: Date,
    exitTime: String,
    duration: String,
    vehicleType: String,
    userType: String,
});

module.exports = mongoose.model('Parking', parkingSchema);
