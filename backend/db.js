const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || "postgres://postgres:postgres@localhost:5432/wednest",
  ssl: process.env.DATABASE_URL ? { rejectUnauthorized: false } : false
});

// A helper function to initialize DB tables
const initDB = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        phone VARCHAR(20)
      );

      CREATE TABLE IF NOT EXISTS vendors (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        category VARCHAR(100) NOT NULL,
        location VARCHAR(255) NOT NULL,
        rating NUMERIC(3, 2) DEFAULT 0,
        image VARCHAR(500),
        gallery TEXT[],
        description TEXT,
        services TEXT[],
        price_range VARCHAR(50)
      );

      CREATE TABLE IF NOT EXISTS inquiries (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id),
        vendor_id INTEGER REFERENCES vendors(id),
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(20) NOT NULL,
        event_date DATE NOT NULL,
        message TEXT,
        status VARCHAR(50) DEFAULT 'Pending'
      );
    `);
    console.log("Database tables initialized.");
  } catch (err) {
    console.error("Error creating tables", err);
  }
};

initDB();

module.exports = pool;
