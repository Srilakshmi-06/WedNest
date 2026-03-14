const express = require("express");
const router = express.Router();
const { createInquiry, getUserInquiries } = require("../controllers/inquiryController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/", authMiddleware, createInquiry);
router.get("/", authMiddleware, getUserInquiries);

module.exports = router;
