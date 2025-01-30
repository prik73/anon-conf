import { Router } from "express";
import { deleteUser, deleteMessage, deleteComment } from "../controllers/adminController.js";
import { authenticateToken, requireAdmin } from "../middleware/authMiddleware.js";

const router = Router();

// Delete a user
router.delete("/deleteUser/:userId", authenticateToken, requireAdmin, deleteUser);

// Delete a message
router.delete("/deleteMessage/:messageId", authenticateToken, requireAdmin, deleteMessage);

// Delete a comment
router.delete("/deleteComment/:commentId", authenticateToken, requireAdmin, deleteComment);

export default router;
