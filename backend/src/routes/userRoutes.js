import { Router } from "express";
import { getMessages, postMessage, deleteMessage, commentOnMessage, commentOnComment } from "../controllers/userController.js";
import { authenticateToken } from "../middleware/authMiddleware.js";

const router = Router();

// Get all messages
router.get("/messages", authenticateToken, getMessages);

// Post a new message
router.post("/messages", authenticateToken, postMessage);

// Delete a message (only by the creator)
router.delete("/messages/:messageId", authenticateToken, deleteMessage);

// Comment on a message (main comment)
router.post("/messages/:messageId/comments", authenticateToken, commentOnMessage);


//commentsOnComments
router.post("/messages/:messageId/comments/:parentCommentId", authenticateToken, commentOnComment);

export default router;
