# RoomSeek 🏠

RoomSeek is a modern **MERN Stack** web application designed to connect room seekers with property owners. It provides a seamless platform for users to search for rental rooms based on location, price, and preferences, while allowing owners to list and manage their properties.

## 🚀 Features

### For Room Seekers (Tenants)
- **Smart Search**: Filter rooms by Location, Price Range, Property Type (1BHK/2BHK), and Tenant Preference (Bachelor/Family).
- **Detailed View**: View comprehensive room details including rent, photos, and amenities.
- **Contact Owners**: Access owner contact details directly from the listing.
- **Responsive Design**: Optimized for both desktop and mobile viewing.

### For Room Owners
- **Easy Listing**: Post new room ads with multiple images.
- **Dashboard**: Manage your listings (View, Delete).
- **Secure Access**: Protected routes for adding and managing content.

## 🛠️ Tech Stack

- **Frontend**: React.js (Vite), Tailwind CSS, Lucide React (Icons)
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Mongoose ODM)
- **Authentication**: JWT (JSON Web Tokens) with Bcrypt for security
- **Image Handling**: Multer (Local storage / Cloudinary ready)

## 📂 Project Structure

```bash
room-finder-mern/
├── client/          # React Frontend
│   ├── src/
│   │   ├── components/  # Reusable UI components
│   │   ├── pages/       # Application views (Home, Login, Dashboard)
│   │   ├── context/     # React Context for Auth state
│   └── ...
├── server/          # Express Backend
│   ├── controllers/ # Logic for API endpoints
│   ├── models/      # Mongoose Schema definitions
│   ├── routes/      # API Routes
│   ├── middleware/  # Auth & Upload middlewares
│   └── ...
└── README.md
```

## ⚙️ Installation & Setup

### Prerequisites
- Node.js (v14+)
- MongoDB (Running locally or MongoDB Atlas URI)

### 1. Clone the Repository
```bash
git clone https://github.com/suy-og10/RoomSeek.git
cd RoomSeek
```

### 2. Backend Setup
Navigate to the server folder and install dependencies:
```bash
cd server
npm install
```

Create a `.env` file in the `server` directory:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/room-finder
JWT_SECRET=your_super_secret_key
```

Start the server:
```bash
npm run dev
```

### 3. Frontend Setup
Open a new terminal, navigate to the client folder and install dependencies:
```bash
cd client
npm install
```

Start the client (Vite):
```bash
npm run dev
```

Visit `http://localhost:5173` in your browser.

## 📡 API Endpoints

| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/register` | Register a new user | Public |
| `POST` | `/api/auth/login` | Login user & get token | Public |
| `GET` | `/api/rooms` | Get all rooms (with filters) | Public |
| `GET` | `/api/rooms/:id` | Get single room details | Public |
| `POST` | `/api/rooms` | Create a new room | Owner |
| `GET` | `/api/rooms/myrooms` | Get logged-in owner's rooms | Owner |
| `DELETE` | `/api/rooms/:id` | Delete a room | Owner |

## 🤝 Contributing

Contributions are welcome! Please fork the repository and submit a pull request.

## 📄 License

This project is licensed under the MIT License.
