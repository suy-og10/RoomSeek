const Room = require('../models/Room.js');

// @desc    Fetch all rooms
// @route   GET /api/rooms
// @access  Public
const getRooms = async (req, res) => {
    try {
        const { location, maxPrice, type, tenant } = req.query;
        let query = {};

        if (location) {
            query.location = { $regex: location, $options: 'i' };
        }
        if (maxPrice) {
            query.price = { $lte: maxPrice };
        }
        if (type) {
            query.propertyType = type;
        }
        if (tenant) {
            query.tenantPreference = tenant;
        }

        const rooms = await Room.find(query).populate('owner', 'name email phone');
        res.json(rooms);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Fetch single room
// @route   GET /api/rooms/:id
// @access  Public
const getRoomById = async (req, res) => {
    const room = await Room.findById(req.params.id).populate('owner', 'name email phone');

    if (room) {
        res.json(room);
    } else {
        res.status(404).json({ message: 'Room not found' });
    }
};

// @desc    Delete a room
// @route   DELETE /api/rooms/:id
// @access  Private/Owner
const deleteRoom = async (req, res) => {
    const room = await Room.findById(req.params.id);

    if (room) {
        if (room.owner.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: 'Not authorized to delete this room' });
        }
        await room.deleteOne();
        res.json({ message: 'Room removed' });
    } else {
        res.status(404).json({ message: 'Room not found' });
    }
};

// @desc    Create a room
// @route   POST /api/rooms
// @access  Private/Owner
const createRoom = async (req, res) => {
    const { title, description, location, price, propertyType, tenantPreference, contactNumber } = req.body;

    let images = [];
    if (req.files) {
        images = req.files.map((file) => `/uploads/${file.filename}`);
    }

    const room = new Room({
        owner: req.user._id,
        title,
        description,
        location,
        price,
        propertyType,
        tenantPreference,
        images,
        contactNumber,
    });

    const createdRoom = await room.save();
    res.status(201).json(createdRoom);
};

// @desc    Get owner rooms
// @route   GET /api/rooms/myrooms
// @access  Private/Owner
const getMyRooms = async (req, res) => {
    const rooms = await Room.find({ owner: req.user._id });
    res.json(rooms);
};

module.exports = { getRooms, getRoomById, deleteRoom, createRoom, getMyRooms };
