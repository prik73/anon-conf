const pool = require("../config/db");

// Delete a user
const deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;
    await pool.query("DELETE FROM users WHERE id = $1", [userId]);
    res.status(200).json({ message: "✅ User deleted successfully!" });
  } catch (error) {
    console.error("❌ Error deleting user:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Delete a message
const deleteMessage = async (req, res) => {
  try {
    const { messageId } = req.params;
    await pool.query("DELETE FROM messages WHERE id = $1", [messageId]);
    res.status(200).json({ message: "✅ Message deleted successfully!" });
  } catch (error) {
    console.error("❌ Error deleting message:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Delete a comment
const deleteComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    await pool.query("DELETE FROM comments WHERE id = $1", [commentId]);
    res.status(200).json({ message: "✅ Comment deleted successfully!" });
  } catch (error) {
    console.error("❌ Error deleting comment:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { deleteUser, deleteMessage, deleteComment };
