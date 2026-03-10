# CodeLeap Network - Frontend Challenge

A complete social network application built with React, TypeScript, React Query, and Framer Motion.

## 🚀 Live Demo
**Deploy:** [https://codeleap-network-sandy.vercel.app](https://codeleap-network-sandy.vercel.app)
**GitHub:** [https://github.com/CampiteliRafael/codeleap-network](https://github.com/CampiteliRafael/codeleap-network)

## 📋 About the Project

This is a complete solution for the CodeLeap technical challenge, implementing a CRUD posts application with multiple advanced features and responsive design.

## ✨ Implemented Features

### Core Features (Required)
- ✅ Signup/login system with username
- ✅ Create new posts (title + content)
- ✅ List posts sorted by most recent
- ✅ Edit own posts
- ✅ Delete own posts
- ✅ Form validation (disabled buttons when empty)
- ✅ Confirmation modals
- ✅ Figma-faithful design

### Bonus Features (Implemented)
- 🎯 **Persistent Login/Logout** - localStorage for session persistence
- 🔍 **Search and Filters** - search by title, content, or author
- 📊 **Sorting** - sort by newest or oldest
- ❤️ **Like System** - like posts (fake API with localStorage)
- 💫 **Smooth Animations** - transitions with Framer Motion
- 📱 **Responsive Design** - optimized for mobile, tablet, and desktop
- ⏳ **Loading States** - skeleton screens and spinners
- 🎨 **Empty State** - friendly message when no posts exist
- 🎭 **Hover Effects** - polished visual interactions

## 🛠️ Technologies

### Core
- **React 19** - Main framework
- **TypeScript** - Static typing
- **Vite** - Fast build tool
- **React Query (TanStack Query)** - Server state management
- **Axios** - HTTP client
- **Framer Motion** - Animations
- **CSS3** - Custom styling

### Testing and Quality
- **Vitest** - Test runner
- **React Testing Library** - Component testing
- **MSW** - Mock Service Worker
- **ESLint** - Linting

### DevOps
- **Docker** - Containerization
- **GitHub Actions** - CI/CD
- **Vercel** - Automatic deployment

## 📦 Running Locally

### Prerequisites
- Node.js 20+
- npm or yarn
- Docker (optional)

### Option 1: Standard Installation

```bash
# Clone the repository
git clone https://github.com/CampiteliRafael/codeleap-network.git

# Enter the directory
cd codeleap-network

# Install dependencies
npm install

# Run in development
npm run dev
```

The application will be available at `http://localhost:5173`

### Option 2: With Docker (Recommended)

```bash
# Clone the repository
git clone https://github.com/CampiteliRafael/codeleap-network.git

# Enter the directory
cd codeleap-network

# Run with Docker Compose
docker-compose up

# Or in background
docker-compose up -d

# To stop
docker-compose down
```

The application will be available at `http://localhost:5173`

**Docker Benefits:**
- ✅ Isolated and consistent environment
- ✅ No need to install dependencies locally
- ✅ Hot reload works normally
- ✅ Easy to share between teams

### Production Build

```bash
# Create optimized build
npm run build

# Preview the build
npm run preview
```

### Testing

```bash
# Run tests in watch mode
npm run test

# Run tests once
npm run test:run

# Run tests with interactive UI
npm run test:ui

# Run tests with coverage
npm run test:coverage

# Run tests in CI (with coverage)
npm run test:ci
```

### Lint and Type Check

```bash
# Check linting
npm run lint

# Build TypeScript (type check)
npm run build
```

## 🌐 API

The application integrates with CodeLeap's test API:

**Base URL:** `https://dev.codeleap.co.uk/careers/`

### Endpoints Used
- `GET /` - List all posts
- `POST /` - Create a new post
- `PATCH /:id/` - Update a post
- `DELETE /:id/` - Delete a post

## 📁 Project Structure

Organized by **features** for better scalability:

```
src/
├── features/                    # Features organized by domain
│   ├── auth/                   # Authentication feature
│   │   └── components/
│   │       └── SignupModal/    # Login modal
│   ├── posts/                  # Posts feature
│   │   ├── components/
│   │   │   ├── CreatePost/     # Create post
│   │   │   ├── PostCard/       # Post card
│   │   │   ├── EditModal/      # Edit post
│   │   │   ├── DeleteModal/    # Delete post
│   │   │   └── FilterBar/      # Search and filters
│   │   └── hooks/
│   │       └── usePosts.ts     # Posts hook
│   └── likes/                  # Likes feature
│       └── hooks/
│           └── useLikes.ts     # Likes hook
├── shared/                      # Shared code
│   ├── components/             # Reusable components
│   │   ├── EmptyState/         # Empty state
│   │   └── PostSkeleton/       # Loading skeleton
│   ├── services/               # Services
│   │   └── api.ts              # Axios client
│   └── types/                  # TypeScript types
│       └── index.ts            # Global definitions
├── App.tsx                      # Root component
├── App.css                      # Global styles
└── main.tsx                     # Entry point
```

### Why This Structure?

- **Scalability**: Easy to add new features
- **Maintainability**: Code organized by domain
- **Reusability**: Shared components in `/shared`
- **Clarity**: Self-explanatory structure

## 🎨 Design and UX

### Main Colors
- **Primary Blue:** #7695EC (Header, main buttons)
- **Like Red:** #FF6B6B (Like button)
- **Success Green:** #47B960 (Save button)
- **Background Gray:** #DDDDDD
- **Card White:** #FFFFFF

### Responsiveness
- **Desktop:** >768px - Full layout
- **Tablet:** 768px - Spacing adjustments
- **Mobile:** <768px - Optimized vertical layout

### Animations
- Fade in/out on modals
- Slide up on new posts
- Scale on clicked buttons
- Smooth hover effects

## 🔑 Detailed Features

### Like System (Fake Frontend)
- Like counter per post
- Visual feedback (filled heart)
- localStorage persistence
- Click animation

### Search and Filters
- Real-time search
- Filter by title, content, or author
- Sort by date (newest/oldest)
- Clear button to reset search

### Loading States
- Skeleton screens while loading
- Spinners on buttons during operations
- Specific loading states (create, edit, delete)

### Persistence
- Username saved in localStorage
- Likes saved locally
- Auto-login on page reload
- Logout button to clear session

## 📝 Technical Notes

- **React Query** manages cache and automatic synchronization
- **Refetch interval** of 10 seconds to see new posts
- **Optimistic updates** for better UX
- **Error handling** in all operations
- **TypeScript strict mode** for type safety

## 🧪 Testing

The project has a complete test suite with **high coverage**:

### Test Types

**Unit Tests**
- ✅ usePosts hook - posts management
- ✅ useLikes hook - likes system
- ✅ Isolated components

**Component Tests**
- ✅ SignupModal - validation and submit
- ✅ CreatePost - form and validations
- ✅ PostCard - rendering and interactions
- ✅ Modals - edit and delete

**Integration Tests**
- ✅ Complete signup flow
- ✅ Create, edit, and delete posts
- ✅ Working like system
- ✅ Search and filters
- ✅ Data persistence

### Testing Technologies

- **Vitest** - Fast test runner
- **React Testing Library** - User-centric testing
- **MSW (Mock Service Worker)** - Realistic API mocking
- **Testing Library User Event** - Interaction simulation

### Coverage

The project maintains high test coverage:
- Critical components (>85%)
- Custom hooks (100%)
- Main application flows (>80%)

## 🚀 Deployment and CI/CD

### Automated Pipeline (GitHub Actions)

The project has CI/CD configured with GitHub Actions that automatically runs:

**On every Push/PR:**
1. ✅ Install dependencies
2. ✅ ESLint (code verification)
3. ✅ TypeScript build (type check)
4. ✅ Tests with coverage
5. ✅ Upload coverage to Codecov

**On Push to Main:**
6. 🚀 Automatic deployment to Vercel

### Configure Secrets on GitHub

To enable automatic deployment, add the secrets to the repository:

```bash
# On GitHub: Settings > Secrets and variables > Actions

VERCEL_TOKEN          # Vercel token (vercel.com/account/tokens)
VERCEL_ORG_ID         # Vercel organization ID
VERCEL_PROJECT_ID     # Vercel project ID
```

### Manual Deployment

**Vercel** (Recommended)
```bash
npm install -g vercel
vercel

# Or for production
vercel --prod
```

**Netlify**
```bash
npm run build
# Upload the dist/ folder
```

**Other Platforms**
- Build: `npm run build`
- Output folder: `dist/`
- Dev command: `npm run dev`

## 📧 Contact

For questions about the challenge:
**Email:** vini.garcia@codeleap.co.uk

---

**Developed with ❤️ for the CodeLeap challenge**

🤖 Generated with Claude Code
