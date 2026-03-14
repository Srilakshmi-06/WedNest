const pool = require("../db");

exports.createInquiry = async (req, res) => {
  const { vendor_id, name, email, phone, event_date, message } = req.body;
  const user_id = req.user ? req.user.id : null; // Optional user_id if logged in, but we can require it

  try {
    const inquiry = await pool.query(
      `INSERT INTO inquiries (user_id, vendor_id, name, email, phone, event_date, message)
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [user_id, vendor_id, name, email, phone, event_date, message]
    );
    res.json(inquiry.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getUserInquiries = async (req, res) => {
  try {
    const inquiries = await pool.query(
      `SELECT i.*, v.name as vendor_name 
       FROM inquiries i
       JOIN vendors v ON i.vendor_id = v.id
       WHERE i.user_id = $1`,
      [req.user.id]
    );
    res.json(inquiries.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
