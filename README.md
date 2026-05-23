# DevConnector 🔗

## 🌐 Live Demo

👉 [View Live App](https://devconnector-6nlc.onrender.com/)

---

## 📋 Table of Contents

- [About](#about)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [API Routes](#api-routes)
- [Project Structure](#project-structure)
- [Screenshots](#screenshots)
- [Deployment](#deployment)

---

## About

DevConnector is a social networking platform built specifically for developers. Users can create profiles, share posts, like and comment on other developers' posts, and showcase their GitHub repositories — all in one place.

This project was built from scratch following the MERN stack architecture, with a RESTful API backend and a React + Redux frontend.

---

## ✨ Features

- 🔐 **User Authentication** — Register and login with JWT-based auth
- 👤 **Developer Profiles** — Create and edit your profile with skills, experience, and education
- 🐙 **GitHub Integration** — Automatically display your public GitHub repositories on your profile
- 📝 **Posts & Feed** — Create posts, like/unlike, and delete your own posts
- 💬 **Comments** — Add and delete comments on any post
- 👥 **Developer Directory** — Browse all registered developers and view their profiles
- 📱 **Responsive Design** — Works on desktop and mobile
- ☁️ **Cloud Deployed** — Live on Render with MongoDB Atlas
- 📸 **Profile Photo Upload** — Upload your own photo from your computer
- 🖼️ **Post Image Attachments** — Add images to community posts
- 📄 **Resume Upload** — Upload and share your PDF resume on your profile

---

## 🛠 Tech Stack

### Backend
| Technology | Purpose |
|---|---|
| Node.js | Runtime environment |
| Express.js | Web framework |
| MongoDB | Database |
| Mongoose | ODM for MongoDB |
| JSON Web Tokens | Authentication |
| bcryptjs | Password hashing |
| express-validator | Input validation |
| Gravatar | Profile avatars |
| Cloudinary | Cloud file storage for photos, images & resumes |

### Frontend
| Technology | Purpose |
|---|---|
| React | UI library |
| Redux | State management |
| Redux Thunk | Async actions |
| Axios | HTTP requests |
| React Router | Client-side routing |

### DevOps
| Technology | Purpose |
|---|---|
| MongoDB Atlas | Cloud database |
| Render | App hosting |
| GitHub | Version control |

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) v18+
- [npm](https://www.npmjs.com/)
- [Git](https://git-scm.com/)
- A [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account

### Installation

**1. Clone the repository**
```bash
git clone https://github.com/YOUR_USERNAME/devconnector.git
cd devconnector
```

**2. Install server dependencies**
```bash
npm install
```

**3. Install client dependencies**
```bash
cd client
npm install
cd ..
```

**4. Set up environment variables**

Create a `.env` file in the root of the project:
```env
MONGO_URI=your_mongodb_atlas_uri
JWT_SECRET=your_jwt_secret
GITHUB_TOKEN=your_github_personal_access_token
NODE_ENV=development
```

**5. Run the app in development mode**
```bash
npm run dev
```

This runs both the Express server (port 5000) and React app (port 3000) concurrently.

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔑 Environment Variables

| Variable | Description |
|---|---|
| `MONGO_URI` | Your MongoDB Atlas connection string |
| `JWT_SECRET` | Secret key for signing JWT tokens |
| `GITHUB_TOKEN` | GitHub personal access token for repo fetching |
| `NODE_ENV` | `development` or `production` |

---

## 📡 API Routes

### Users
| Method | Route | Description | Access |
|---|---|---|---|
| POST | `/api/users` | Register a new user | Public |

### Auth
| Method | Route | Description | Access |
|---|---|---|---|
| GET | `/api/auth` | Get logged in user | Private |
| POST | `/api/auth` | Login user & get token | Public |

### Profile
| Method | Route | Description | Access |
|---|---|---|---|
| GET | `/api/profile/me` | Get current user profile | Private |
| POST | `/api/profile` | Create or update profile | Private |
| GET | `/api/profile` | Get all profiles | Public |
| GET | `/api/profile/user/:id` | Get profile by user ID | Public |
| DELETE | `/api/profile` | Delete profile & user | Private |
| PUT | `/api/profile/experience` | Add experience | Private |
| DELETE | `/api/profile/experience/:id` | Delete experience | Private |
| PUT | `/api/profile/education` | Add education | Private |
| DELETE | `/api/profile/education/:id` | Delete education | Private |
| GET | `/api/profile/github/:username` | Get GitHub repos | Public |

### Posts
| Method | Route | Description | Access |
|---|---|---|---|
| POST | `/api/posts` | Create a post | Private |
| GET | `/api/posts` | Get all posts | Private |
| GET | `/api/posts/:id` | Get post by ID | Private |
| DELETE | `/api/posts/:id` | Delete a post | Private |
| PUT | `/api/posts/like/:id` | Like a post | Private |
| PUT | `/api/posts/unlike/:id` | Unlike a post | Private |
| POST | `/api/posts/comment/:id` | Add a comment | Private |
| DELETE | `/api/posts/comment/:id/:comment_id` | Delete a comment | Private |

---

## 📁 Project Structure

```
devconnector/
├── client/                  # React frontend
│   ├── public/
│   └── src/
│       ├── actions/         # Redux actions
│       ├── components/
│       │   ├── auth/        # Login & Register
│       │   ├── dashboard/   # Dashboard, Experience, Education
│       │   ├── layout/      # Navbar, Landing, Alert, Spinner
│       │   ├── post/        # Single post & comments
│       │   ├── posts/       # Posts feed & post form
│       │   ├── profile/     # Individual profile page
│       │   ├── profile-forms/ # Create/Edit profile forms
│       │   └── profiles/    # Developers listing
│       ├── reducers/        # Redux reducers
│       ├── utils/           # Helper functions
│       ├── App.js           # Root component with routes
│       └── store.js         # Redux store
├── config/
│   └── db.js                # MongoDB connection
├── middleware/
│   └── auth.js              # JWT auth middleware
├── models/
│   ├── Post.js
│   ├── Profile.js
│   └── User.js
├── routes/
│   └── api/
│       ├── auth.js
│       ├── posts.js
│       ├── profile.js
│       └── users.js
├── .env                     # Environment variables (not committed)
├── .gitignore
├── package.json
└── server.js                # Express server entry point
```

---


## ☁️ Deployment

This app is deployed as a single full-stack unit on **Render**.

- The Express server serves the React production build
- MongoDB Atlas is used as the cloud database
- Environment variables are configured in the Render dashboard

### Deploy your own

1. Fork this repo
2. Create a [Render](https://render.com) account
3. Create a new Web Service connected to your GitHub repo
4. Set the build command: `npm run build`
5. Set the start command: `npm start`
6. Add all environment variables in the Render dashboard
7. Deploy!


---

## 🙏 Acknowledgements

- [Brad Traversy](https://github.com/bradtraversy) for the original project idea
- [Traversy Media](https://www.youtube.com/traversymedia) for the amazing tutorials

---

