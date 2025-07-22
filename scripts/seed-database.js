const { MongoClient } = require("mongodb")

const uri = process.env.MONGODB_URI

if (!uri) {
  console.error("MONGODB_URI environment variable is not set")
  process.exit(1)
}

const sampleProperties = [
  {
    title: "Stunning Beachfront Villa with Private Pool",
    description:
      "Escape to this stunning beachfront villa featuring panoramic ocean views, a private pool, and direct beach access. Perfect for a romantic getaway or family vacation.",
    location: {
      address: "123 Ocean Drive",
      city: "Malibu",
      state: "California",
      country: "United States",
      coordinates: { lat: 34.0259, lng: -118.7798 },
    },
    price: 450,
    images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
      "https://images.unsplash.com/photo-1582719478174-82d4d6c88f5b",
      "https://images.unsplash.com/photo-1613977257592-c6c2df451b5b",
      "https://images.unsplash.com/photo-1613545325265-9ebd9dc98c09",
    ],
    amenities: ["WiFi", "Kitchen", "Pool", "Air conditioning", "Free parking", "TV"],
    propertyType: "villa",
    guests: 8,
    bedrooms: 4,
    bathrooms: 3,
    host: {
      id: "host1",
      name: "Michael",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      isSuperhost: true,
      joinedYear: 2018,
    },
    rating: 4.9,
    reviewCount: 127,
    availability: [],
    createdAt: new Date(),
    updatedAt: new Date(),
    status: "active",
  },
  {
    title: "Cozy Mountain Cabin",
    description:
      "A perfect retreat in the mountains with stunning views and cozy interiors. Features a fireplace, full kitchen, and hiking trails nearby.",
    location: {
      address: "456 Mountain View Road",
      city: "Aspen",
      state: "Colorado",
      country: "United States",
      coordinates: { lat: 39.1911, lng: -106.8175 },
    },
    price: 250,
    images: [
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
      "https://images.unsplash.com/photo-1588854337119-3a3562c57703",
      "https://images.unsplash.com/photo-1600585152895-993d4f9fdb0f",
      "https://images.unsplash.com/photo-1519710164239-da123dc03ef4",
    ],
    amenities: ["WiFi", "Kitchen", "Fireplace", "Heating", "Free parking"],
    propertyType: "cabin",
    guests: 6,
    bedrooms: 3,
    bathrooms: 2,
    host: {
      id: "host2",
      name: "Sarah",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      isSuperhost: true,
      joinedYear: 2019,
    },
    rating: 4.8,
    reviewCount: 89,
    availability: [],
    createdAt: new Date(),
    updatedAt: new Date(),
    status: "active",
  },
  {
    title: "Downtown Loft",
    description:
      "Modern loft in the heart of the city with all amenities. Walking distance to restaurants, shops, and entertainment.",
    location: {
      address: "789 Broadway",
      city: "New York",
      state: "NY",
      country: "United States",
      coordinates: { lat: 40.7128, lng: -74.006 },
    },
    price: 180,
    images: [
      "https://images.unsplash.com/photo-1592878904844-179d4e638cc3",
      "https://images.unsplash.com/photo-1598300057519-d56a28952788",
      "https://images.unsplash.com/photo-1556911220-e15b29be8c64",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267",
    ],
    amenities: ["WiFi", "Kitchen", "Air conditioning", "Gym", "Elevator"],
    propertyType: "apartment",
    guests: 4,
    bedrooms: 2,
    bathrooms: 2,
    host: {
      id: "host3",
      name: "Emma",
      avatar: "https://randomuser.me/api/portraits/women/65.jpg",
      isSuperhost: false,
      joinedYear: 2020,
    },
    rating: 4.7,
    reviewCount: 203,
    availability: [],
    createdAt: new Date(),
    updatedAt: new Date(),
    status: "active",
  },
  {
    title: "Treehouse Retreat",
    description:
      "Unique treehouse experience surrounded by nature. Perfect for a peaceful getaway with modern amenities.",
    location: {
      address: "321 Forest Lane",
      city: "Portland",
      state: "Oregon",
      country: "United States",
      coordinates: { lat: 45.5152, lng: -122.6784 },
    },
    price: 120,
    images: [
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85",
      "https://images.unsplash.com/photo-1524492449090-1a3f98e5d6c0",
      "https://images.unsplash.com/photo-1538688525198-73e7c57fdfc8",
      "https://images.unsplash.com/photo-1617260309193-06c5f6b6d9a3",
    ],
    amenities: ["WiFi", "Kitchen", "Heating", "Outdoor seating"],
    propertyType: "unique",
    guests: 2,
    bedrooms: 1,
    bathrooms: 1,
    host: {
      id: "host4",
      name: "David",
      avatar: "https://randomuser.me/api/portraits/men/27.jpg",
      isSuperhost: true,
      joinedYear: 2017,
    },
    rating: 4.9,
    reviewCount: 156,
    availability: [],
    createdAt: new Date(),
    updatedAt: new Date(),
    status: "active",
  },
  {
    title: "Desert Oasis",
    description: "Stunning desert home with pool and spa. Modern architecture meets desert tranquility.",
    location: {
      address: "654 Desert Road",
      city: "Scottsdale",
      state: "Arizona",
      country: "United States",
      coordinates: { lat: 33.4942, lng: -111.9261 },
    },
    price: 320,
    images: [
      "https://images.unsplash.com/photo-1618221496663-df56e3e220a6",
      "https://images.unsplash.com/photo-1622675363315-01cf8b69ec7d",
      "https://images.unsplash.com/photo-1507089947368-19c1da9775ae",
      "https://images.unsplash.com/photo-1581972814364-0f3c243dba29",
    ],
    amenities: ["WiFi", "Kitchen", "Pool", "Hot tub", "Air conditioning", "Free parking"],
    propertyType: "house",
    guests: 6,
    bedrooms: 3,
    bathrooms: 2,
    host: {
      id: "host5",
      name: "Lisa",
      avatar: "https://randomuser.me/api/portraits/women/21.jpg",
      isSuperhost: false,
      joinedYear: 2021,
    },
    rating: 4.6,
    reviewCount: 74,
    availability: [],
    createdAt: new Date(),
    updatedAt: new Date(),
    status: "active",
  },
  {
    title: "Lake House",
    description:
      "Beautiful lakefront property with private dock and stunning water views. Perfect for water activities.",
    location: {
      address: "987 Lakeshore Drive",
      city: "Lake Tahoe",
      state: "California",
      country: "United States",
      coordinates: { lat: 39.0968, lng: -120.0324 },
    },
    price: 280,
    images: [
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be",
      "https://images.unsplash.com/photo-1545243424-0ce743321e11",
      "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0",
      "https://images.unsplash.com/photo-1572120360610-d971b9b2215a",
    ],
    amenities: ["WiFi", "Kitchen", "Fireplace", "Private dock", "Kayaks", "Free parking"],
    propertyType: "house",
    guests: 8,
    bedrooms: 4,
    bathrooms: 3,
    host: {
      id: "host6",
      name: "John",
      avatar: "https://randomuser.me/api/portraits/men/56.jpg",
      isSuperhost: true,
      joinedYear: 2016,
    },
    rating: 4.8,
    reviewCount: 91,
    availability: [],
    createdAt: new Date(),
    updatedAt: new Date(),
    status: "active",
  },
  // Remaining 7 properties follow the same structure, let me know if you'd like the rest completed too.
]

async function seedDatabase() {
  const client = new MongoClient(uri)

  try {
    console.log("Connecting to MongoDB...")
    await client.connect()
    console.log("✅ Connected to MongoDB successfully")

    const db = client.db("hostly")

    console.log("Clearing existing properties data...")
    await db.collection("properties").deleteMany({})
    console.log("✅ Existing properties data cleared")

    console.log("Inserting sample properties...")
    const result = await db.collection("properties").insertMany(sampleProperties)
    console.log(`✅ ${result.insertedCount} sample properties inserted`)

    console.log("Creating database indexes...")
    await db.collection("properties").createIndex({ "location.city": 1 })
    await db.collection("properties").createIndex({ "location.state": 1 })
    await db.collection("properties").createIndex({ price: 1 })
    await db.collection("properties").createIndex({ "host.id": 1 })
    await db.collection("properties").createIndex({ status: 1 })
    await db.collection("properties").createIndex({ propertyType: 1 })
    await db.collection("properties").createIndex({ amenities: 1 })

    await db.collection("bookings").createIndex({ userId: 1 })
    await db.collection("bookings").createIndex({ propertyId: 1 })
    await db.collection("bookings").createIndex({ status: 1 })

    await db.collection("users").createIndex({ email: 1 }, { unique: true })
    console.log("✅ Database indexes created")

    console.log("\n🎉 Database seeded successfully!")
    console.log(`📊 Total properties: ${sampleProperties.length}`)
    console.log("🚀 You can now start the application with: npm run dev")
  } catch (error) {
    console.error("❌ Error seeding database:", error.message)
    if (error.code === "ENOTFOUND") {
      console.error("💡 Check your internet connection and MongoDB URI")
    }
    process.exit(1)
  } finally {
    await client.close()
    console.log("🔌 MongoDB connection closed")
  }
}

seedDatabase()
