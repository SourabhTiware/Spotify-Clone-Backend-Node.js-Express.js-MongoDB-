# 🎵 Spotify Backend Clone

A robust, production-grade RESTful API designed to power a music streaming platform. This project demonstrates advanced backend development patterns, secure authentication, and complex data relationships using Node.js, Express.js, and MongoDB.

## 🚀 Features
### -🔐 Authentication & Authorization

- User & Artist Registration: Users can sign up as either a standard 'user' or an 'artist'. Upon registration, a secure JWT (JSON Web Token) is provided for session management.

- Secure Login: Authentication sets an HTTP-only JWT token in the client's browser cookies for secure, persistent sessions.

- Role-Based Access Control (RBAC): * Artists: Have exclusive rights to upload music and create albums.

- Users: Can browse and listen to all music and albums but cannot perform write operations.

## 💿 Music & Album Management
- Cloud Storage Integration: Integrated with ImageKit to handle music file uploads. Files are transformed into secure string URLs and stored in the database for high-performance retrieval.

- Comprehensive Music Discovery: Endpoints to fetch all music, all albums, or specific albums by their ID.

- Data Integrity: Uses Mongoose populate to manage relationships between Users (Artists), Music tracks, and Albums.

## 🛠️ Tech Stack
- Runtime Environment: Node.js

- Web Framework: Express.js

- Database: MongoDB with Mongoose ODM

- Storage Service: ImageKit (for audio/media storage)

- Security: JWT (JsonWebToken), Cookie-Parser, Bcrypt

## 📂 Project Structure
This project follows a professional Model-Controller-Route architecture used in production environments to ensure scalability and maintainability.
```

src/
├── controllers/      # Business logic and request handling
├── db/               # Database connection configuration
├── middlewares/      # Authentication & role-validation logic
├── models/           # Mongoose schemas (User, Music, Album)
├── routes/           # API endpoint definitions
└── services/          # External integrations (Storage/ImageKit)
```

## 🛣️ API Endpoints
```
Method	Endpoint	            Access	        Description
POST	/api/auth/register	    Public	    Register as User or Artist
POST	/api/auth/login	        Public	    Login and receive cookie token
```

## Music & Album Routes
```

Method	          Endpoint	           Access	               Description

POST	    /api/music/upload	    Artist                  Only Upload song file (via ImageKit)
POST	    /api/music/album	    Artist                  Only Create a new music album
GET	         /api/music/	        Auth User/Artist	    Fetch all available music
GET	        /api/music/album	    Auth User/Artist	    Fetch all albums
GET	        /api/music/album/:id	Auth User/Artist	    Get specific album details
GET	        /api/music/logout	    Auth User/Artist	    Clear session cookies

```

## 🏗️ Data Models
- The system is built on three core Mongoose schemas:

- User Schema: Stores credentials and identifies roles (User vs. Artist).

- Music Schema: Stores track metadata and the ImageKit source string.

- Album Schema: Groups multiple music tracks together under a single artist.

## ⚙️ Setup Instructions


### 1. Clone the Repository:
```
- git clone <your-repo-url>
```

### 2. Install Dependencies:
```
- npm install
```

### 3. Configure Environment Variables:
#### Create a .env file in the root directory and add:
```
- PORT=8000
- MONGO_URL=your_mongodb_connection_string
- JWT_SECRET=your_jwt_secret_key
- IMAGEKIT_PRIVATE_KEY=your_key
```

### 4. Run in Development Mode:
```
- npm run dev
```

