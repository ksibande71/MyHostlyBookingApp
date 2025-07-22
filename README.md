"# MyHostlyBookingApp" 
8 Simple Steps To Run The Application:

1. Using Git, clone the repository onto your local machine.
   
2. Install Node.js from their website: https://nodejs.org/
 
3. In your terminal, install pnpm with the following commands in your terminal:
  npm install -g npm
  npm install -g pnpm

4. Run pnpm install, in order to download all the node_modules (particularly dependencies) you'll require to run the application
   
5. Run pnpm approve-builds to ensure that anything else that wasn't installed can be now installed with your approval and supervision

6. Create a file called ".env.local". Create a cluster on MongoDB Atlas.

7. Connect using Node.js. Paste the connection string in your ".env.local" file

8. Run pnpm seed
   
9. Run pnpm dev

10. Finally, click CTRL and the link in order to follow the link provided

11. And there you have it.



Disclaimer, I enlisted the assistance of a tool to cover comprehensively what the application does I also got it to give further detailed instructions on how to set it up (Though I would suggest you follow my steps above, they're simple and easy to follow).

Also keep in mind, there's a lot of room for improvement in this project.

Here is what the project does:
# 🏠 Hostly - Property Booking Platform

A modern, full-stack property booking platform built with Next.js, featuring property listings, booking management, host dashboards, and user authentication. Think Booking.com, but better! 🚀

![Hostly Platform](https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&h=400&fit=crop&crop=center)

## ✨ Features

### 🏡 **For Guests**
- **Property Search & Discovery** - Browse and filter properties by location, price, amenities
- **Interactive Maps** - Google Maps integration for property locations
- **Detailed Property Views** - High-quality photos, amenities, reviews, and availability
- **Secure Booking System** - Easy booking flow with calendar integration
- **Trip Management** - View and manage your bookings
- **User Profiles** - Personalized user accounts and preferences
- **Messaging System** - Communicate with hosts directly

### 🏠 **For Hosts**
- **Host Dashboard** - Comprehensive analytics and property management
- **Listing Management** - Create, edit, and manage property listings
- **Calendar Management** - Set availability and pricing
- **Booking Management** - View and manage guest bookings
- **Earnings Dashboard** - Track revenue and payouts
- **Host Messaging** - Communicate with guests
- **Account Settings** - Manage host profile and preferences

### 🎯 **Core Features**
- **Responsive Design** - Works perfectly on desktop, tablet, and mobile
- **Real-time Updates** - Live booking status and availability
- **Search & Filters** - Advanced filtering by price, amenities, location
- **Photo Upload** - High-quality image management for listings
- **User Authentication** - Secure login and registration system
- **Database Integration** - MongoDB for data persistence

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, Node.js
- **Database**: MongoDB with Mongoose
- **Authentication**: Custom JWT-based auth system
- **Maps**: Google Maps API integration
- **UI Components**: shadcn/ui, Lucide React icons
- **Styling**: Tailwind CSS with custom teal branding
- **State Management**: React Context API
- **File Upload**: Built-in image handling

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:
- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **MongoDB** (local installation or MongoDB Atlas)
- **Google Maps API Key** (for map functionality)

### Installation

1. **Clone the repository**
   \`\`\`bash
   git clone https://github.com/yourusername/hostly.git
   cd hostly
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   # or
   yarn install
   \`\`\`

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   \`\`\`env
   # MongoDB Connection
   MONGODB_URI=mongodb://localhost:27017/hostly
   # or for MongoDB Atlas:
   # MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/hostly

   # Google Maps API (optional, for map functionality)
   NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here

   # JWT Secret (generate a secure random string)
   JWT_SECRET=your_super_secure_jwt_secret_here

   # App URL (for production)
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   \`\`\`

4. **Set up the database**
   
   Seed the database with sample properties:
   \`\`\`bash
   npm run seed
   \`\`\`
   
   This will create 13 sample properties across various locations.

5. **Run the development server**
   \`\`\`bash
   npm run dev
   # or
   yarn dev
   \`\`\`

6. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

## 📁 Project Structure

\`\`\`
hostly/
├── app/                          # Next.js 14 App Router
│   ├── api/                      # API routes
│   │   ├── bookings/            # Booking management APIs
│   │   ├── properties/          # Property management APIs
│   │   ├── users/               # User authentication APIs
│   │   └── host/                # Host-specific APIs
│   ├── booking/                 # Booking flow pages
│   ├── booking-confirmation/    # Booking confirmation
│   ├── experiences/             # Experiences page
│   ├── help/                    # Help center
│   ├── host/                    # Host dashboard and management
│   ├── login/                   # Authentication pages
│   ├── messages/                # Messaging system
│   ├── property/                # Property detail pages
│   ├── search/                  # Search results
│   ├── trips/                   # User trip management
│   └── layout.tsx               # Root layout
├── components/                   # Reusable React components
│   ├── ui/                      # shadcn/ui components
│   ├── auth-modal.tsx           # Authentication modal
│   ├── booking-flow.tsx         # Booking process
│   ├── header.tsx               # Navigation header
│   ├── property-grid.tsx        # Property listings
│   └── ...                     # Other components
├── lib/                         # Utility functions and configurations
│   ├── db/                      # Database models and utilities
│   ├── auth-context.tsx         # Authentication context
│   └── mongodb.ts               # MongoDB connection
├── scripts/                     # Database seeding and utilities
│   └── seed-database.js         # Sample data seeding
└── public/                      # Static assets
\`\`\`

## 🗄️ Database Setup

### Local MongoDB

1. **Install MongoDB** locally or use **MongoDB Atlas**
2. **Create a database** named `hostly`
3. **Update** your `MONGODB_URI` in `.env.local`
4. **Run the seed script** to populate sample data:
   \`\`\`bash
   npm run seed
   \`\`\`

### Sample Data

The seed script creates:
- **13 diverse properties** across major US cities
- **Property types**: Apartments, houses, cabins, penthouses, studios
- **Price range**: $95 - $850 per night
- **Various amenities**: WiFi, parking, pools, hot tubs, etc.

## 🎨 Customization

### Branding
- **Primary Color**: Teal (`#0d9488`)
- **Logo**: "Hostly" with custom styling
- **Fonts**: System fonts with Tailwind CSS

### Styling
- Built with **Tailwind CSS**
- **shadcn/ui** components for consistent design
- **Responsive design** for all screen sizes
- **Dark mode** support (can be extended)

## 📱 Features in Detail

### Property Search
- **Location-based search** with Google Maps
- **Price range filtering**
- **Amenity filtering** (WiFi, parking, pool, etc.)
- **Guest count filtering**
- **Date availability checking**

### Booking System
- **Calendar integration** for date selection
- **Real-time availability** checking
- **Price calculation** with taxes and fees
- **Secure booking confirmation**
- **Email notifications** (can be extended)

### Host Dashboard
- **Analytics overview** with key metrics
- **Property management** (create, edit, delete)
- **Booking management** with status updates
- **Calendar management** for availability
- **Earnings tracking** and reporting
- **Guest messaging** system


## 📝 Scripts

\`\`\`bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint

# Database
npm run seed         # Seed database with sample data
\`\`\`

## 🐛 Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Check your `MONGODB_URI` in `.env.local`
   - Ensure MongoDB is running locally or Atlas is accessible

2. **Google Maps Not Loading**
   - Verify your `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`
   - Enable Maps JavaScript API in Google Cloud Console

3. **Build Errors**
   - Clear `.next` folder: `rm -rf .next`
   - Reinstall dependencies: `rm -rf node_modules && npm install`


## 🙏 Acknowledgments

- **Next.js** team for the amazing framework
- **shadcn/ui** for beautiful UI components
- **Tailwind CSS** for utility-first styling
- **MongoDB** for flexible database solutions

---

**Built with ❤️ by the Hostly Team**
