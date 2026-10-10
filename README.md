# বাজার দর (BazarDor) 🛒

**প্রতিদিনের বাজার দাম এক নজরে** - বাংলাদেশের সকল বাজারের আজকের পণ্যের দাম, দামের পরিবর্তন এবং ট্রেন্ড এক জায়গায়। স্মার্ট কেনাকাটা করুন।

## 📖 Project Description

BazarDor (বাজার দর) is a modern, responsive web application built with Next.js (App Router) that provides real-time market prices for daily commodities in Bangladesh. Users can browse products by category, view price trends (risers/fallers), and see detailed price breakdowns across different markets. The application features a clean Bengali interface with Hind Siliguri typography, making it accessible to local users.

## 🛠️ Technologies Used

- **Framework**: Next.js (App Router, Turbopack)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Typography**: Hind Siliguri (Google Fonts)
- **Authentication**: BetterAuth (Email/Password + Social Login with Google & GitHub)
- **Database**: MongoDB Atlas
- **Notifications**: React Hot Toast
- **Icons**: Lucide React / Heroicons
- **API Integration**: Primary & Fallback API endpoints with automatic failover
- **Deployment**: Vercel (Production Live)

## ✨ Key Features

1. **🏠 Responsive Homepage** - Hero section with CTA, price ticker (marquee), top 6 price risers, top 6 price fallers, and complete product grid with Bengali numerals
2. **📂 Category Pages** - Dynamic category filtering with sort controls (Default, Price Low to High, Price High to Low), skeleton loading states, and empty state handling
3. **📦 Product Detail Pages** - Protected routes showing product summary, price statistics (Min/Max/Avg), and market-wise price breakdowns
4. **🔐 Authentication System** - Sign In/Sign Up with email/password, Google & GitHub OAuth, toast notifications, and protected routes
5. **👤 User Profile** - Profile view with avatar, update information feature via BetterAuth, and sign out functionality
6. **🎨 Design System** - Complete UI component library with design tokens, Hind Siliguri typography, Bengali numeral support, and WCAG AA accessible components
7. **🔄 API Failover** - Automatic fallback from primary to secondary API endpoint on network/server errors
8. **♿ Accessibility** - Semantic HTML, ARIA labels, focus management, keyboard navigation, and screen reader support

## 🚀 Getting Started

### Prerequisites

- Node.js 20.9+ 
- npm/yarn/pnpm
- MongoDB Atlas account
- Google Cloud Console account (for Google OAuth)
- GitHub account (for GitHub OAuth)
- Vercel account (for deployment)

### Installation

```bash
# Clone the repository
git clone https://github.com/jotika-meaw/Assignment_7_PH
cd Assignment_7_PH

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Add your API keys and BetterAuth credentials (see detailed guides below)

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔧 Detailed Setup Guides

### 1. MongoDB Atlas Setup

1. Go to [MongoDB Atlas](https://cloud.mongodb.com)
2. Create a free cluster (M0 tier)
3. Create a database user: **Database Access → Add New Database User**
   - Username: `bazardor-user` (or your choice)
   - Password: Generate secure password → **SAVE IT**
   - Privileges: "Read and write to any database"
4. Configure network access: **Network Access → Add IP Address → Allow Access from Anywhere (0.0.0.0/0)**
5. Get connection string: **Database → Connect → Drivers → Node.js 6.7+**
6. Format: `mongodb+srv://<username>:<password>@<cluster>.mongodb.net/bazardor?retryWrites=true&w=majority`

### 2. BetterAuth Secret Generation

```bash
# Generate a secure 32+ character secret
openssl rand -base64 32
```

### 3. Google OAuth Setup (Google Cloud Console)

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create/Select project → **APIs & Services → Credentials**
3. **Create Credentials → OAuth client ID**
4. Application type: **Web application**
5. Name: **BazarDor Web Client**
6. **Authorized JavaScript origins:**
   - `http://localhost:3000` (development)
   - `https://your-vercel-app.vercel.app` (production)
7. **Authorized redirect URIs:**
   - `http://localhost:3000/api/auth/callback/google` (development)
   - `https://your-vercel-app.vercel.app/api/auth/callback/google` (production)
8. Copy **Client ID** and **Client Secret**

### 4. GitHub OAuth Setup (GitHub Developer Settings)

1. Go to [GitHub Developer Settings](https://github.com/settings/developers)
2. **New OAuth App**
3. Fill in:
   - Application name: **BazarDor**
   - Homepage URL: `https://your-vercel-app.vercel.app` (or `http://localhost:3000` for dev)
   - Authorization callback URL: `https://your-vercel-app.vercel.app/api/auth/callback/github` (or `http://localhost:3000/api/auth/callback/github`)
4. **Register application**
5. **Generate Client Secret** → Copy **Client ID** and **Client Secret**

---

## 📋 Environment Variables

Create `.env.local` with:

```env
# API Configuration
NEXT_PUBLIC_API_URL_1=https://api.api-store.workers.dev/api/bazardor
NEXT_PUBLIC_API_URL_2=https://api.abcz.workers.dev/api/bazardor

# MongoDB Atlas
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/bazardor?retryWrites=true&w=majority

# BetterAuth Configuration
BETTER_AUTH_SECRET=your-generated-secret-here
BETTER_AUTH_URL=http://localhost:3000

# Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# GitHub OAuth
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret
```

---

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── api/auth/          # Authentication API routes
│   ├── category/[slug]/   # Category pages
│   ├── product/[slug]/    # Product detail pages (protected)
│   ├── signin/            # Sign in page
│   ├── signup/            # Sign up page
│   ├── profile/           # User profile pages
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   ├── loading.tsx        # Global loading UI
│   └── not-found.tsx      # 404 page
├── components/
│   ├── ui/                # Reusable UI components
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Card.tsx
│   │   ├── Badge.tsx
│   │   └── Skeleton.tsx
│   ├── layout/            # Layout components
│   │   ├── Navbar.tsx
│   │   ├── PriceTicker.tsx
│   │   └── Footer.tsx
│   └── home/              # Home-specific components
│       ├── Hero.tsx
│       └── ProductCard.tsx
├── lib/
│   ├── api.ts             # API client with failover
│   ├── auth.ts            # BetterAuth configuration
│   ├── design-tokens.ts   # Design system tokens
│   └── utils.ts           # Utility functions
├── types/
│   └── index.ts           # TypeScript definitions
└── styles/
    └── globals.css        # Global styles & Tailwind
```

---

## 🌐 API Endpoints

| Endpoint | Description |
|----------|-------------|
| `GET /products` | All products |
| `GET /products?category={slug}` | Products by category |
| `GET /products/{id}` | Single product |
| `GET /categories` | All categories |
| `GET /categories/{slug}` | Category with products |

**Primary API**: `https://api.api-store.workers.dev/api/bazardor`  
**Fallback API**: `https://api.abcz.workers.dev/api/bazardor`

---

## 🎨 Design Tokens

The project uses a comprehensive design system defined in `src/lib/design-tokens.ts` including:

- **Colors**: Primary, Accent, Success, Danger, Warning, Neutral scales
- **Typography**: Hind Siliguri font with responsive sizing
- **Spacing**: Consistent spacing scale
- **Border Radius**: Rounded corners
- **Shadows**: Elevation levels
- **Animations**: Marquee, fade-in, slide-up, pulse
- **Breakpoints**: Mobile, Tablet, Desktop, Large Desktop

---

## ♿ Accessibility Features

- Semantic HTML5 elements (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`)
- ARIA labels and roles for dynamic content
- Focus-visible outlines for keyboard navigation
- WCAG AA color contrast compliance
- Screen reader compatible price ticker (aria-live)
- Bengali language support (`lang="bn"`)

---

## 📱 Responsive Breakpoints

- **Mobile**: < 640px (1 column grid)
- **Tablet**: 640px - 1024px (2 column grid)
- **Desktop**: 1024px - 1280px (3 column grid)
- **Large Desktop**: > 1280px (4 column grid)

---

## 🔐 Authentication Flow

1. User visits `/signin` or `/signup`
2. Email/password or social login (Google/GitHub)
3. BetterAuth creates session in MongoDB Atlas
4. Protected routes (`/product/[slug]`, `/profile`, `/profile/update`) check session via middleware
5. Unauthenticated users redirected to `/signin` with `callbackUrl` and toast notification
6. Profile update via BetterAuth's `updateUser` API
7. Sign out clears session cookie

---

## 🚀 Vercel Deployment

### Automatic Deployment (Recommended)

1. Push to GitHub
2. Go to [Vercel Dashboard](https://vercel.com/dashboard)
3. **Add New Project** → Import from GitHub
4. Select repository → **Deploy**
5. Add environment variables in Vercel project settings:
   - `MONGODB_URI`
   - `BETTER_AUTH_SECRET`
   - `BETTER_AUTH_URL` (your Vercel production URL)
   - `GOOGLE_CLIENT_ID`
   - `GOOGLE_CLIENT_SECRET`
   - `GITHUB_CLIENT_ID`
   - `GITHUB_CLIENT_SECRET`
   - `NEXT_PUBLIC_API_URL_1`
   - `NEXT_PUBLIC_API_URL_2`
6. Update OAuth redirect URIs in Google/GitHub consoles with production URL
7. Redeploy

### Manual Deployment via CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy to production
vercel --prod

# Add environment variables
vercel env add MONGODB_URI production
vercel env add BETTER_AUTH_SECRET production
# ... repeat for all variables
```

---

## 🔄 Vercel Environment Variables

All environment variables must be added in **Vercel Dashboard → Project → Settings → Environment Variables** for Production, Preview, and Development environments.

### Required Variables:

| Variable | Description | Example |
|----------|-------------|---------|
| `MONGODB_URI` | MongoDB Atlas connection string | `mongodb+srv://...` |
| `BETTER_AUTH_SECRET` | 32+ char secret for session encryption | `openssl rand -base64 32` |
| `BETTER_AUTH_URL` | Production URL | `https://your-app.vercel.app` |
| `GOOGLE_CLIENT_ID` | Google OAuth Client ID | `123456789-abc.apps.googleusercontent.com` |
| `GOOGLE_CLIENT_SECRET` | Google OAuth Client Secret | `GOCSPX-...` |
| `GITHUB_CLIENT_ID` | GitHub OAuth Client ID | `Ov23li...` |
| `GITHUB_CLIENT_SECRET` | GitHub OAuth Client Secret | `github_pat_...` |
| `NEXT_PUBLIC_API_URL_1` | Primary API endpoint | `https://api.api-store.workers.dev/api/bazardor` |
| `NEXT_PUBLIC_API_URL_2` | Fallback API endpoint | `https://api.abcz.workers.dev/api/bazardor` |

---

## 🧪 Quality Assurance

Run all checks:

```bash
# TypeScript type checking
npm run typecheck

# ESLint linting
npm run lint

# Unit tests
npm run test

# Production build
npm run build

# All checks together
npm run verify
```

---

## 📄 License

This project is created for educational purposes (Programming Hero Assignment 7).

---

## 🔗 Links

- **Live Demo**: [https://bazardor-ruby.vercel.app](https://bazardor-ruby.vercel.app)
- **Repository**: [https://github.com/jotika-meaw/Assignment_7_PH](https://github.com/jotika-meaw/Assignment_7_PH)

---

## 📝 Changelog

### v1.0.0 (2026-10-10)
- Initial release
- Next.js 16.4.0 with App Router
- BetterAuth with MongoDB Atlas adapter
- Email/Password authentication
- Google OAuth integration
- GitHub OAuth integration
- Protected routes with middleware
- User profile management
- Bengali language support
- Responsive design with Tailwind CSS
- API failover support
- Vercel deployment ready

---

Made with ❤️ for Bangladesh's smart shoppers