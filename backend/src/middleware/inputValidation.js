// Middleware to validate signup inputs
const validateSignup = (req, res, next) => {
    const { username, password } = req.body;
  
    if (!username || typeof username !== "string" || username.trim().length < 3) {
      return res.status(400).json({ error: "⚠️ Invalid username (min 3 characters required)" });
    }
  
    if (!password || typeof password !== "string" || password.length < 6) {
      return res.status(400).json({ error: "⚠️ Invalid password (min 6 characters required)" });
    }
  
    next();
  };
  
  const validateLogin = (req, res, next) => {
    const { username, password } = req.body;
  
    if (!username || !password) {
      return res.status(400).json({ 
        message: "Username and password are required.",
        field: !username ? "username" : "password"
      });
    }
  
    if (password.length < 6) {
      return res.status(400).json({ 
        message: "Password must be at least 6 characters long.",
        field: "password"
      });
    }
  
    next();
  };
  
  // Middleware to validate message inputs
  const validateMessage = (req, res, next) => {
    const { content } = req.body;
  
    if (!content || typeof content !== "string" || content.trim().length === 0) {
      return res.status(400).json({ error: "⚠️ Message content cannot be empty" });
    }
  
    next();
  };
  
  // Middleware to validate comment inputs
  const validateComment = (req, res, next) => {
    const { messageId, content } = req.body;
  
    if (!messageId || typeof messageId !== "number") {
      return res.status(400).json({ error: "⚠️ Valid message ID is required" });
    }
  
    if (!content || typeof content !== "string" || content.trim().length === 0) {
      return res.status(400).json({ error: "⚠️ Comment content cannot be empty" });
    }
  
    next();
  };
  
  export { validateSignup, validateMessage, validateComment, validateLogin };
  