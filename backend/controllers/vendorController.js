const pool = require("../db");

exports.getVendors = async (req, res) => {
  try {
    const { category, search } = req.query;
    let query = "SELECT * FROM vendors WHERE 1=1";
    const params = [];

    if (category) {
      params.push(category);
      query += ` AND category = $${params.length}`;
    }
    
    if (search) {
      params.push(`%${search}%`);
      query += ` AND name ILIKE $${params.length}`;
    }

    const vendors = await pool.query(query, params);
    
    // Auto-populate dummy vendors if empty just for showcase purposes if requested.
    // For now returning actual DB results.
    res.json(vendors.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getVendorById = async (req, res) => {
  try {
    const vendor = await pool.query("SELECT * FROM vendors WHERE id = $1", [req.params.id]);
    if (vendor.rows.length === 0) return res.status(404).json({ error: "Vendor not found" });
    res.json(vendor.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
