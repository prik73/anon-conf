import pool from "../config/db.js";

// Get all messages
const getMessages = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM messages");
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("❌ Error fetching messages:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Post a new message
const postMessage = async (req, res) => {
  try {
    const { content } = req.body;
    const userId = req.user.id; // Extracted from token
    const result = await pool.query(
      "INSERT INTO messages (user_id, content) VALUES ($1, $2) RETURNING *",
      [userId, content]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("❌ Error posting message:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Delete a message (only by the creator)
const deleteMessage = async (req, res) => {
  try {
    const { messageId } = req.params;
    const userId = req.user.id; // Extracted from token

    // Check if the user owns the message
    const message = await pool.query("SELECT * FROM messages WHERE id = $1 AND user_id = $2", [messageId, userId]);

    if (message.rows.length === 0) {
      return res.status(403).json({ error: "❌ Unauthorized: You can only delete your own messages." });
    }

    await pool.query("DELETE FROM messages WHERE id = $1", [messageId]);
    res.status(200).json({ message: "✅ Message deleted successfully!" });
  } catch (error) {
    console.error("❌ Error deleting message:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Comment on a message
const commentOnMessage = async (req, res) => {
  try {
    const { messageId } = req.params;
    const { content } = req.body;
    const userId = req.user.id; // Extracted from token
    const result = await pool.query(
      "INSERT INTO comments (message_id, user_id, content) VALUES ($1, $2, $3) RETURNING *",
      [messageId, userId, content]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("❌ Error commenting on message:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export { getMessages, postMessage, deleteMessage, commentOnMessage };
