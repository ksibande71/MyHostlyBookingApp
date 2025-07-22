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
      "https://images.pexels.com/photos/8266981/pexels-photo-8266981.jpeg",
      "https://images.pexels.com/photos/19737858/pexels-photo-19737858.jpeg",
      "https://images.pexels.com/photos/29887390/pexels-photo-29887390.jpeg",
      "https://images.pexels.com/photos/9130979/pexels-photo-9130979.jpeg",
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
      "https://images.pexels.com/photos/17502001/pexels-photo-17502001.jpeg",
      "https://images.pexels.com/photos/8266981/pexels-photo-8266981.jpeg",
      "https://images.pexels.com/photos/19737858/pexels-photo-19737858.jpeg",
      "https://images.pexels.com/photos/29887390/pexels-photo-29887390.jpeg",
      "https://images.pexels.com/photos/9130979/pexels-photo-9130979.jpeg",
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
      "https://a0.muscache.com/im/pictures/miso/Hosting-25178105/original/12bc582a-d987-4ab1-9ac8-da16c5f4fc6e.jpeg?im_w=960",
      "https://a0.muscache.com/im/pictures/miso/Hosting-25178105/original/04b4aa01-7d99-46fb-9c2d-a105c212be76.jpeg?im_w=720",
      "https://a0.muscache.com/im/pictures/miso/Hosting-25178105/original/15fe6c94-cea3-470e-9644-4fff84ac4b28.jpeg?im_w=720",
      "https://a0.muscache.com/im/pictures/miso/Hosting-25178105/original/291918aa-9d00-4675-b28b-1b6d757323b0.jpeg?im_w=720",
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
      "https://images.pexels.com/photos/19737858/pexels-photo-19737858.jpeg",
      "https://images.pexels.com/photos/29887390/pexels-photo-29887390.jpeg",
      "https://images.pexels.com/photos/9130979/pexels-photo-9130979.jpeg",
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
      "https://a0.muscache.com/im/pictures/miso/Hosting-25178105/original/15fe6c94-cea3-470e-9644-4fff84ac4b28.jpeg?im_w=720",
      "https://a0.muscache.com/im/pictures/miso/Hosting-25178105/original/291918aa-9d00-4675-b28b-1b6d757323b0.jpeg?im_w=720",
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
      "https://a0.muscache.com/im/pictures/miso/Hosting-25178105/original/291918aa-9d00-4675-b28b-1b6d757323b0.jpeg?im_w=720",
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
      "https://images.pexels.com/photos/8266981/pexels-photo-8266981.jpeg",
      "https://images.pexels.com/photos/19737858/pexels-photo-19737858.jpeg",
      "https://images.pexels.com/photos/29887390/pexels-photo-29887390.jpeg",
      "https://images.pexels.com/photos/9130979/pexels-photo-9130979.jpeg",
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
      "https://images.pexels.com/photos/17502001/pexels-photo-17502001.jpeg",
      "https://images.pexels.com/photos/8266981/pexels-photo-8266981.jpeg",
      "https://images.pexels.com/photos/19737858/pexels-photo-19737858.jpeg",
      "https://images.pexels.com/photos/29887390/pexels-photo-29887390.jpeg",
      "https://images.pexels.com/photos/9130979/pexels-photo-9130979.jpeg",
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
      "https://a0.muscache.com/im/pictures/miso/Hosting-25178105/original/12bc582a-d987-4ab1-9ac8-da16c5f4fc6e.jpeg?im_w=960",
      "https://a0.muscache.com/im/pictures/miso/Hosting-25178105/original/04b4aa01-7d99-46fb-9c2d-a105c212be76.jpeg?im_w=720",
      "https://a0.muscache.com/im/pictures/miso/Hosting-25178105/original/15fe6c94-cea3-470e-9644-4fff84ac4b28.jpeg?im_w=720",
      "https://a0.muscache.com/im/pictures/miso/Hosting-25178105/original/291918aa-9d00-4675-b28b-1b6d757323b0.jpeg?im_w=720",
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
      "https://images.pexels.com/photos/19737858/pexels-photo-19737858.jpeg",
      "https://images.pexels.com/photos/29887390/pexels-photo-29887390.jpeg",
      "https://images.pexels.com/photos/9130979/pexels-photo-9130979.jpeg",
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
      "https://a0.muscache.com/im/pictures/miso/Hosting-25178105/original/15fe6c94-cea3-470e-9644-4fff84ac4b28.jpeg?im_w=720",
      "https://a0.muscache.com/im/pictures/miso/Hosting-25178105/original/291918aa-9d00-4675-b28b-1b6d757323b0.jpeg?im_w=720",
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
      "https://a0.muscache.com/im/pictures/miso/Hosting-25178105/original/291918aa-9d00-4675-b28b-1b6d757323b0.jpeg?im_w=720",
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
]


async function seedDatabase() {
  const client = new MongoClient(uri)

  try {
    console.log("Connecting to MongoDB...")
    await client.connect()
    console.log("✅ Connected to MongoDB successfully")

    const db = client.db("airbnb")

    // Clear existing data
    console.log("Clearing existing data...")
    await db.collection("properties").deleteMany({})
    await db.collection("bookings").deleteMany({})
    await db.collection("users").deleteMany({})
    console.log("✅ Existing data cleared")

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
