const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const vendorRoutes = require("./routes/vendors");
const inquiryRoutes = require("./routes/inquiries");
require("dotenv").config();

const app = express();

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/vendors", vendorRoutes);
app.use("/api/inquiries", inquiryRoutes);

app.get("/api/user/inquiries", require("./middleware/authMiddleware"), async (req, res) => {
  const pool = require("./db");
  try {
    const { rows } = await pool.query(
      `SELECT i.*, v.name as vendor_name, v.image as vendor_image 
       FROM inquiries i
       JOIN vendors v ON i.vendor_id = v.id
       WHERE i.user_id = $1`,
      [req.user.id]
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
