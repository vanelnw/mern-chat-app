const express = require('express');
const { fetchChats, addToGroup, removeFromGroup, renameGroup, createGroupChat, accessChat } = require('../controllers/chatControllers');
const router = express.Router();

const { protect } = require('../middleware/autMiddleware');

router.route('/').post(protect, accessChat).get(protect, fetchChats);
router.post('/group', protect, createGroupChat);
router.put('/rename', protect, renameGroup);
router.put('/groupremove', protect, removeFromGroup);
router.put('/groupadd', protect, addToGroup);


module.exports = router