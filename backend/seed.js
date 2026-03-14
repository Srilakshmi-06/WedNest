const pool = require("./db");

const vendors = [
  {
    name: "Céleste Studios",
    category: "Photographers",
    location: "Paris, FR / Global",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80&w=1200",
    description: "Céleste specializes in editorial, film-inspired editorial photography. We craft timeless art pieces of your intimate milestones, heavily favoring natural twilight and authentic romance.",
    price_range: "$4,500 - $9,000",
    services: ["Editorial Coverage", "Medium Format Film", "Destination Engagements", "Archival Albums"]
  },
  {
    name: "The Velvet Orchid",
    category: "Decorators",
    location: "London, UK",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&q=80&w=1200",
    description: "Avant-garde floral compositions and monumental tablescapes. We believe romance is dramatic. Deep reds, emeralds, and architectural botany form the core of our signature aesthetics.",
    price_range: "$3,000 - $12,000",
    services: ["Architectural Floristry", "Candlelight Curation", "Bespoke Textiles", "Ceiling Installations"]
  },
  {
    name: "Château Lumière",
    category: "Venues",
    location: "Bordeaux, FR",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1542042457-3f86e06dd425?auto=format&fit=crop&q=80&w=1200",
    description: "An aristocratic 18th-century chateau featuring sweeping vineyards and a grand cobblestone courtyard illuminated by festoon lights. The epitome of old-world European romance.",
    price_range: "$15,000 - $35,000",
    services: ["Exclusive Estate Access", "Vineyard Dining", "Wine Cellar Receptions", "Bridal Wing Accommodation"]
  },
  {
    name: "Maison du Goût Catering",
    category: "Caterers",
    location: "New York, NY",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1464366400600-7168b849cb32?auto=format&fit=crop&q=80&w=1200",
    description: "Michelin-level gastronomy reimagined for significant celebrations. Expect theatrical plating, rare seasonal ingredients, and sommelier-curated pairings.",
    price_range: "$180 - $350 per person",
    services: ["Tasting Tasting Menu", "Interactive Chef Stations", "Sommelier Pairings", "Avant-garde Desserts"]
  },
  {
    name: "Opal & Ash Artistry",
    category: "Makeup Artists",
    location: "Los Angeles, CA",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&q=80&w=1200",
    description: "Specializing in high-fashion, luminous artistry. We don't mask beauty, we amplify it with glassy skin textures and softly defined features.",
    price_range: "$800 - $1,500",
    services: ["Glass-Skin Prep", "Editorial Bridal Makeup", "On-location Touchups", "Bridal Party Grooming"]
  },
  {
    name: "Epoch Event Design",
    category: "Planners",
    location: "Lake Como, IT",
    rating: 5.0,
    image: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&q=80&w=1200",
    description: "We orchestrate multi-day, monumental gatherings across the globe. No detail is too opulent, no logistical endeavor too complex for our elite team.",
    price_range: "Starts at $15,000",
    services: ["Complete Event Architecture", "Multi-day Logistical Routing", "Vendor Sourcing", "RSVP Concierge"]
  }
];

const seedVendors = async () => {
  try {
    console.log("Truncating existing tables to apply fresh data...");
    await pool.query("TRUNCATE TABLE inquiries CASCADE;");
    await pool.query("TRUNCATE TABLE vendors CASCADE;");

    console.log("Tables truncated. Seeding new high-end vendor data...");
    
    for (const vendor of vendors) {
      await pool.query(
        `INSERT INTO vendors (name, category, location, rating, image, description, price_range, services)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
        [
          vendor.name, 
          vendor.category, 
          vendor.location, 
          vendor.rating, 
          vendor.image, 
          vendor.description, 
          vendor.price_range, 
          vendor.services
        ]
      );
    }
    console.log("Seeding complete with completely new data layout.");
    process.exit(0);
  } catch (err) {
    console.error("Error seeding vendors:", err);
    process.exit(1);
  }
};

setTimeout(seedVendors, 2000); 
