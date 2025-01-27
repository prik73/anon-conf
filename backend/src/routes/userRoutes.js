const express = require("express");
const { getMessages, postMessage, deleteMessage, commentOnMessage } = require("../controllers/userController");
const { authenticateToken } = require("../middleware/authMiddleware");

const router = express.Router();

// Get all messages
router.get("/messages", authenticateToken, getMessages);

// Post a new message
router.post("/messages", authenticateToken, postMessage);

// Delete a message (only by the creator)
router.delete("/messages/:messageId", authenticateToken, deleteMessage);

// Comment on a message
router.post("/comments/:messageId", authenticateToken, commentOnMessage);

module.exports = router;
