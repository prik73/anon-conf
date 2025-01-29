import { Router } from "express";
import { getMessages, postMessage, deleteMessage, commentOnMessage } from "../controllers/userController.js";
import { authenticateToken } from "../middleware/authMiddleware.js";

const router = Router();

// Get all messages
router.get("/messages", authenticateToken, getMessages);

// Post a new message
router.post("/messages", authenticateToken, postMessage);

// Delete a message (only by the creator)
router.delete("/messages/:messageId", authenticateToken, deleteMessage);

// Comment on a message
router.post("/comments/:messageId", authenticateToken, commentOnMessage);

export default router;
