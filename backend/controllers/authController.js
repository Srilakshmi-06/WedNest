const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const pool = require("../db");

exports.signup = async (req, res) => {
  const { name, email, password, phone } = req.body;
  try {
    const userExists = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    if (userExists.rows.length > 0) return res.status(400).json({ error: "User already exists" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await pool.query(
      "INSERT INTO users (name, email, password, phone) VALUES ($1, $2, $3, $4) RETURNING id, name, email, phone",
      [name, email, hashedPassword, phone]
    );

    const payload = { id: newUser.rows[0].id, name: newUser.rows[0].name };
    const token = jwt.sign(payload, process.env.JWT_SECRET || "fallback_secret", { expiresIn: "10d" });

    res.json({ token, user: newUser.rows[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    if (user.rows.length === 0) return res.status(400).json({ error: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.rows[0].password);
    if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

    const payload = { id: user.rows[0].id, name: user.rows[0].name };
    const token = jwt.sign(payload, process.env.JWT_SECRET || "fallback_secret", { expiresIn: "10d" });

    res.json({ token, user: { id: user.rows[0].id, name: user.rows[0].name, email: user.rows[0].email, phone: user.rows[0].phone } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getProfile = async (req, res) => {
  try {
    const user = await pool.query("SELECT id, name, email, phone FROM users WHERE id = $1", [req.user.id]);
    res.json(user.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateProfile = async (req, res) => {
  const { name, phone } = req.body;
  try {
    const updated = await pool.query(
      "UPDATE users SET name = $1, phone = $2 WHERE id = $3 RETURNING id, name, email, phone",
      [name, phone, req.user.id]
    );
    res.json(updated.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
