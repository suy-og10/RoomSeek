const express = require('express');
const router = express.Router();
const {
    getRooms,
    getRoomById,
    deleteRoom,
    createRoom,
    getMyRooms,
} = require('../controllers/roomController.js');
const { protect, owner } = require('../middleware/authMiddleware.js');
const upload = require('../middleware/uploadMiddleware.js');

router.route('/').get(getRooms).post(protect, owner, upload.array('images', 5), createRoom);
router.route('/myrooms').get(protect, owner, getMyRooms);

router.route('/:id').get(getRoomById).delete(protect, owner, deleteRoom);

module.exports = router;
