const express = require("express");
const { deleteUser, deleteMessage, deleteComment } = require("../controllers/adminController");
const { authenticateToken, requireAdmin } = require("../middleware/authMiddleware");

const router = express.Router();

// Delete a user
router.delete("/deleteUser/:userId", authenticateToken, requireAdmin, deleteUser);

// Delete a message
router.delete("/deleteMessage/:messageId", authenticateToken, requireAdmin, deleteMessage);

// Delete a comment
router.delete("/deleteComment/:commentId", authenticateToken, requireAdmin, deleteComment);

module.exports = router;
