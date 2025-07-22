Reproduce the following code exactly, make no other changes except (filling it up with relevant image links): 

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
      "/placeholder.svg?height=600&width=800&text=Beachfront+Villa",
      "/placeholder.svg?height=300&width=400&text=Villa+Pool",
      "/placeholder.svg?height=300&width=400&text=Villa+Interior",
      "/placeholder.svg?height=300&width=400&text=Villa+Bedroom",
    ],
    amenities: ["WiFi", "Kitchen", "Pool", "Air conditioning", "Free parking", "TV"],
    propertyType: "villa",
    guests: 8,
    bedrooms: 4,
    bathrooms: 3,
    host: {
      id: "host1",
      name: "Michael",
      avatar: "/placeholder.svg?height=100&width=100&text=Michael",
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
      "/placeholder.svg?height=600&width=800&text=Mountain+Cabin",
      "/placeholder.svg?height=300&width=400&text=Cabin+Interior",
      "/placeholder.svg?height=300&width=400&text=Cabin+Fireplace",
      "/placeholder.svg?height=300&width=400&text=Mountain+View",
    ],
    amenities: ["WiFi", "Kitchen", "Fireplace", "Heating", "Free parking"],
    propertyType: "cabin",
    guests: 6,
    bedrooms: 3,
    bathrooms: 2,
    host: {
      id: "host2",
      name: "Sarah",
      avatar: "/placeholder.svg?height=100&width=100&text=Sarah",
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
      "/placeholder.svg?height=600&width=800&text=Downtown+Loft",
      "/placeholder.svg?height=300&width=400&text=Loft+Living+Room",
      "/placeholder.svg?height=300&width=400&text=Loft+Kitchen",
      "/placeholder.svg?height=300&width=400&text=City+View",
    ],
    amenities: ["WiFi", "Kitchen", "Air conditioning", "Gym", "Elevator"],
    propertyType: "apartment",
    guests: 4,
    bedrooms: 2,
    bathrooms: 2,
    host: {
      id: "host3",
      name: "Emma",
      avatar: "/placeholder.svg?height=100&width=100&text=Emma",
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
      "/placeholder.svg?height=600&width=800&text=Treehouse",
      "/placeholder.svg?height=300&width=400&text=Tree+Interior",
      "/placeholder.svg?height=300&width=400&text=Forest+View",
      "/placeholder.svg?height=300&width=400&text=Tree+Deck",
    ],
    amenities: ["WiFi", "Kitchen", "Heating", "Outdoor seating"],
    propertyType: "unique",
    guests: 2,
    bedrooms: 1,
    bathrooms: 1,
    host: {
      id: "host4",
      name: "David",
      avatar: "/placeholder.svg?height=100&width=100&text=David",
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
      "/placeholder.svg?height=600&width=800&text=Desert+Oasis",
      "/placeholder.svg?height=300&width=400&text=Desert+Pool",
      "/placeholder.svg?height=300&width=400&text=Desert+Interior",
      "/placeholder.svg?height=300&width=400&text=Desert+Sunset",
    ],
    amenities: ["WiFi", "Kitchen", "Pool", "Hot tub", "Air conditioning", "Free parking"],
    propertyType: "house",
    guests: 6,
    bedrooms: 3,
    bathrooms: 2,
    host: {
      id: "host5",
      name: "Lisa",
      avatar: "/placeholder.svg?height=100&width=100&text=Lisa",
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
      "/placeholder.svg?height=600&width=800&text=Lake+House",
      "/placeholder.svg?height=300&width=400&text=Lake+View",
      "/placeholder.svg?height=300&width=400&text=Lake+Dock",
      "/placeholder.svg?height=300&width=400&text=Lake+Interior",
    ],
    amenities: ["WiFi", "Kitchen", "Fireplace", "Private dock", "Kayaks", "Free parking"],
    propertyType: "house",
    guests: 8,
    bedrooms: 4,
    bathrooms: 3,
    host: {
      id: "host6",
      name: "John",
      avatar: "/placeholder.svg?height=100&width=100&text=John",
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
  // NEW PROPERTIES - 7 additional ones
  {
    title: "Historic Brownstone",
    description:
      "Charming historic brownstone in Brooklyn with original details and modern updates. Perfect for exploring NYC.",
    location: {
      address: "234 Park Slope Avenue",
      city: "Brooklyn",
      state: "NY",
      country: "United States",
      coordinates: { lat: 40.6782, lng: -73.9442 },
    },
    price: 220,
    images: [
      "/placeholder.svg?height=600&width=800&text=Historic+Brownstone",
      "/placeholder.svg?height=300&width=400&text=Brownstone+Interior",
      "/placeholder.svg?height=300&width=400&text=Historic+Details",
      "/placeholder.svg?height=300&width=400&text=Brooklyn+Street",
    ],
    amenities: ["WiFi", "Kitchen", "Heating", "Washer", "Dryer"],
    propertyType: "house",
    guests: 6,
    bedrooms: 3,
    bathrooms: 2,
    host: {
      id: "host7",
      name: "Rachel",
      avatar: "/placeholder.svg?height=100&width=100&text=Rachel",
      isSuperhost: true,
      joinedYear: 2019,
    },
    rating: 4.7,
    reviewCount: 134,
    availability: [],
    createdAt: new Date(),
    updatedAt: new Date(),
    status: "active",
  },
  {
    title: "Luxury Penthouse",
    description:
      "Stunning penthouse with panoramic city views, rooftop terrace, and premium amenities in downtown Miami.",
    location: {
      address: "567 Biscayne Boulevard",
      city: "Miami",
      state: "Florida",
      country: "United States",
      coordinates: { lat: 25.7617, lng: -80.1918 },
    },
    price: 650,
    images: [
      "/placeholder.svg?height=600&width=800&text=Luxury+Penthouse",
      "/placeholder.svg?height=300&width=400&text=City+Views",
      "/placeholder.svg?height=300&width=400&text=Rooftop+Terrace",
      "/placeholder.svg?height=300&width=400&text=Modern+Interior",
    ],
    amenities: ["WiFi", "Kitchen", "Pool", "Air conditioning", "Gym", "Elevator", "Hot tub"],
    propertyType: "apartment",
    guests: 4,
    bedrooms: 2,
    bathrooms: 2,
    host: {
      id: "host8",
      name: "Carlos",
      avatar: "/placeholder.svg?height=100&width=100&text=Carlos",
      isSuperhost: true,
      joinedYear: 2020,
    },
    rating: 4.9,
    reviewCount: 87,
    availability: [],
    createdAt: new Date(),
    updatedAt: new Date(),
    status: "active",
  },
  {
    title: "Rustic Farmhouse",
    description: "Authentic farmhouse experience in the Texas Hill Country. Surrounded by vineyards and rolling hills.",
    location: {
      address: "890 Ranch Road",
      city: "Fredericksburg",
      state: "Texas",
      country: "United States",
      coordinates: { lat: 30.2752, lng: -98.8719 },
    },
    price: 195,
    images: [
      "/placeholder.svg?height=600&width=800&text=Rustic+Farmhouse",
      "/placeholder.svg?height=300&width=400&text=Farmhouse+Porch",
      "/placeholder.svg?height=300&width=400&text=Hill+Country",
      "/placeholder.svg?height=300&width=400&text=Vineyard+Views",
    ],
    amenities: ["WiFi", "Kitchen", "Fireplace", "Free parking", "Outdoor seating"],
    propertyType: "house",
    guests: 8,
    bedrooms: 4,
    bathrooms: 3,
    host: {
      id: "host9",
      name: "Jake",
      avatar: "/placeholder.svg?height=100&width=100&text=Jake",
      isSuperhost: false,
      joinedYear: 2021,
    },
    rating: 4.6,
    reviewCount: 52,
    availability: [],
    createdAt: new Date(),
    updatedAt: new Date(),
    status: "active",
  },
  {
    title: "Coastal Cottage",
    description:
      "Charming coastal cottage just steps from the beach. Perfect for a romantic getaway or small family vacation.",
    location: {
      address: "123 Seaside Lane",
      city: "Carmel-by-the-Sea",
      state: "California",
      country: "United States",
      coordinates: { lat: 36.5553, lng: -121.9233 },
    },
    price: 380,
    images: [
      "/placeholder.svg?height=600&width=800&text=Coastal+Cottage",
      "/placeholder.svg?height=300&width=400&text=Beach+Access",
      "/placeholder.svg?height=300&width=400&text=Cottage+Garden",
      "/placeholder.svg?height=300&width=400&text=Ocean+Views",
    ],
    amenities: ["WiFi", "Kitchen", "Fireplace", "Free parking", "Beach access"],
    propertyType: "house",
    guests: 4,
    bedrooms: 2,
    bathrooms: 2,
    host: {
      id: "host10",
      name: "Maria",
      avatar: "/placeholder.svg?height=100&width=100&text=Maria",
      isSuperhost: true,
      joinedYear: 2018,
    },
    rating: 4.8,
    reviewCount: 165,
    availability: [],
    createdAt: new Date(),
    updatedAt: new Date(),
    status: "active",
  },
  {
    title: "Mountain Chalet",
    description:
      "Alpine-style chalet with stunning mountain views and ski-in/ski-out access. Perfect for winter sports enthusiasts.",
    location: {
      address: "456 Alpine Way",
      city: "Park City",
      state: "Utah",
      country: "United States",
      coordinates: { lat: 40.6461, lng: -111.498 },
    },
    price: 420,
    images: [
      "/placeholder.svg?height=600&width=800&text=Mountain+Chalet",
      "/placeholder.svg?height=300&width=400&text=Ski+Access",
      "/placeholder.svg?height=300&width=400&text=Alpine+Interior",
      "/placeholder.svg?height=300&width=400&text=Mountain+Views",
    ],
    amenities: ["WiFi", "Kitchen", "Fireplace", "Hot tub", "Ski storage", "Free parking"],
    propertyType: "chalet",
    guests: 10,
    bedrooms: 5,
    bathrooms: 4,
    host: {
      id: "host11",
      name: "Tom",
      avatar: "/placeholder.svg?height=100&width=100&text=Tom",
      isSuperhost: true,
      joinedYear: 2017,
    },
    rating: 4.9,
    reviewCount: 198,
    availability: [],
    createdAt: new Date(),
    updatedAt: new Date(),
    status: "active",
  },
  {
    title: "Urban Studio",
    description: "Modern studio apartment in the heart of Seattle. Perfect for business travelers and urban explorers.",
    location: {
      address: "789 Pine Street",
      city: "Seattle",
      state: "Washington",
      country: "United States",
      coordinates: { lat: 47.6062, lng: -122.3321 },
    },
    price: 95,
    images: [
      "/placeholder.svg?height=600&width=800&text=Urban+Studio",
      "/placeholder.svg?height=300&width=400&text=Modern+Design",
      "/placeholder.svg?height=300&width=400&text=City+Location",
      "/placeholder.svg?height=300&width=400&text=Compact+Living",
    ],
    amenities: ["WiFi", "Kitchen", "Air conditioning", "Elevator", "Gym"],
    propertyType: "apartment",
    guests: 2,
    bedrooms: 1,
    bathrooms: 1,
    host: {
      id: "host12",
      name: "Alex",
      avatar: "/placeholder.svg?height=100&width=100&text=Alex",
      isSuperhost: false,
      joinedYear: 2022,
    },
    rating: 4.5,
    reviewCount: 43,
    availability: [],
    createdAt: new Date(),
    updatedAt: new Date(),
    status: "active",
  },
  {
    title: "Vineyard Estate",
    description:
      "Luxurious estate surrounded by vineyards in Napa Valley. Includes wine tasting and private chef services.",
    location: {
      address: "321 Vineyard Road",
      city: "Napa",
      state: "California",
      country: "United States",
      coordinates: { lat: 38.2975, lng: -122.2869 },
    },
    price: 850,
    images: [
      "/placeholder.svg?height=600&width=800&text=Vineyard+Estate",
      "/placeholder.svg?height=300&width=400&text=Wine+Cellar",
      "/placeholder.svg?height=300&width=400&text=Estate+Grounds",
      "/placeholder.svg?height=300&width=400&text=Luxury+Interior",
    ],
    amenities: ["WiFi", "Kitchen", "Pool", "Hot tub", "Wine cellar", "Private chef", "Free parking"],
    propertyType: "villa",
    guests: 12,
    bedrooms: 6,
    bathrooms: 5,
    host: {
      id: "host13",
      name: "Victoria",
      avatar: "/placeholder.svg?height=100&width=100&text=Victoria",
      isSuperhost: true,
      joinedYear: 2016,
    },
    rating: 4.9,
    reviewCount: 76,
    availability: [],
    createdAt: new Date(),
    updatedAt: new Date(),
    status: "active",
  },
]

async function seedDatabase() {
  const client = new MongoClient(uri)

  try {
    console.log("Connecting to MongoDB...")
    await client.connect()
    console.log("✅ Connected to MongoDB successfully")

    const db = client.db("hostly")

    // Clear existing properties data ONLY
    console.log("Clearing existing properties data...")
    await db.collection("properties").deleteMany({})
    console.log("✅ Existing properties data cleared")

    // Insert sample properties
    console.log("Inserting sample properties...")
    const result = await db.collection("properties").insertMany(sampleProperties)
    console.log(`✅ ${result.insertedCount} sample properties inserted`)

    // Create indexes for better performance
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

// Run the seeding function
seedDatabase()
