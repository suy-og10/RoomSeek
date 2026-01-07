const mongoose = require('mongoose');

const roomSchema = mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    location: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    propertyType: {
        type: String,
        required: true,
    },
    tenantPreference: {
        type: String,
        required: true,
    },
    images: [{
        type: String,
    }],
    contactNumber: {
        type: String,
    }
}, {
    timestamps: true,
});

const Room = mongoose.model('Room', roomSchema);
module.exports = Room;
