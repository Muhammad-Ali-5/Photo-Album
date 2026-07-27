# 🌌 Lumina — Digital Asset Management & Cloud Gallery Platform

[![Next.js](https://img.shields.io/badge/Next.js-14.2-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Cloudinary](https://img.shields.io/badge/Cloudinary-CDN-blueviolet?style=for-the-badge&logo=cloudinary)](https://cloudinary.com/)
[![Lucide Icons](https://img.shields.io/badge/Lucide_Icons-0.428-pink?style=for-the-badge&logo=lucide)](https://lucide.dev/)
[![License](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)](LICENSE)

Lumina is an enterprise-grade **Digital Asset Management (DAM) & Cloud Gallery Platform** built with **Next.js 14 App Router**, **TypeScript**, **Tailwind CSS**, and **Cloudinary CDN**. It provides high-performance cloud photo streaming, real-time tag-based curation, album folder management, theme responsiveness, and direct EXIF metadata inspection.

---

## ✨ Core Features & Technical Highlights

- ☁️ **100% Live Cloudinary API Persistence**: Zero reliance on `localStorage` or cookies for media state. All asset uploads, album assignments, favorite toggles, and deletions are driven live by Cloudinary Server Actions and APIs.
- ⚡ **Synchronous Server Actions & Real-Time Feedback**: Every mutating operation awaits Cloudinary API completion, providing visual loading spinners and explicit success/error feedback toasts.
- 🎨 **Adaptive Light & Dark Theme System**: Fully responsive design supporting dynamic light and dark theme modes with high-contrast typography, theme-aware glassmorphism, and stage preview backgrounds.
- 🏷️ **Tag-Based Media Curation & Dynamic Albums**: Move assets seamlessly between albums. Tag reassignment automatically strips former album tags on Cloudinary while updating album folder card counts and covers live.
- 💖 **Cloud-Synced Favorites Vault**: Toggle asset favorites in real-time. Favorite status is derived live from Cloudinary `"favorite"` asset tags and persists across browser refreshes and devices.
- 📥 **Direct Full-Resolution Blob Downloads**: High-speed direct browser downloads via Blob fetching without redirecting to external tabs.
- 🚀 **10MB Upload Payload Support**: Configured Next.js Server Action body limits up to 10MB to accommodate high-resolution RAW and 4K photographs.
- 🔄 **Instant Router Cache Invalidation**: Automatic `revalidatePath` execution on server actions guarantees zero stale cached views across route navigation.

---

## 🛠️ Technology Stack

| Layer | Technology | Description |
| :--- | :--- | :--- |
| **Framework** | Next.js 14 (App Router) | React framework with Server Components & Server Actions |
| **Language** | TypeScript 5.0 | Strict type safety and end-to-end typing |
| **Cloud Storage & CDN** | Cloudinary (`cloudinary` v2) | Media transformation, CDN delivery, search, and folder indexing |
| **Styling** | Tailwind CSS & Vanilla CSS | Design tokens, responsive utility classes, and glassmorphism |
| **Icons** | Lucide React | Modern, lightweight UI icons |

---

## 🔑 Environment Configuration

Create a `.env` file in the root directory and configure your Cloudinary API credentials:

```env
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="your_cloud_name"
NEXT_PUBLIC_CLOUDINARY_API_KEY="your_api_key"
CLOUDINARY_API_SECRET="your_api_secret"
CLOUDINARY_URL="cloudinary://your_api_key:your_api_secret@your_cloud_name"
```

---

## 📂 Project Architecture

```
lumina-cloud-gallery/
├── public/                     # Favicons, logo assets & public media
├── src/
│   ├── app/
│   │   ├── albums/             # Album collections & folder details
│   │   │   ├── [album]/        # Dynamic tag-filtered album route
│   │   │   └── page.tsx        # Album management & folder grid
│   │   ├── favourites/         # Favorites curated vault route
│   │   ├── components/
│   │   │   ├── Navbar.tsx            # Header with search & theme toggle
│   │   │   ├── Side_Nav.tsx          # Navigation sidebar
│   │   │   ├── CloudinaryImage.tsx   # Responsive image card primitive
│   │   │   ├── ImageDetailModal.tsx  # EXIF metadata, download, album move modal
│   │   │   ├── MediaContext.tsx      # Media state provider & Cloudinary sync
│   │   │   ├── FavoritesContext.tsx  # Cloudinary tag-driven favorites provider
│   │   │   ├── ThemeContext.tsx      # Light/Dark mode state provider
│   │   │   ├── upload_btn.tsx        # Cloudinary upload component
│   │   │   ├── Get_data.tsx          # Cloudinary server actions
│   │   │   └── sampleData.ts         # Fallback data definitions
│   │   ├── globals.css               # Design system tokens & utility utilities
│   │   ├── layout.tsx                # Context providers & OpenGraph metadata
│   │   └── page.tsx                  # Main gallery masonry grid & category filters
│   ├── components/
│   │   ├── button.tsx                # Button UI component
│   │   └── ui/                       # Dialog & input primitives
│   └── lib/
│       └── utils.ts                  # Class merge utilities
├── next.config.mjs             # Next.js configuration & server action limits
├── package.json
└── README.md
```

---

## 🚀 Quick Start Guide

### 1. Clone & Install Dependencies
```bash
git clone https://github.com/m-ali-swe/lumina-cloud-gallery.git
cd lumina-cloud-gallery
npm install
```

### 2. Configure Environment
Populate your Cloudinary credentials in `.env` as shown in [Environment Configuration](#-environment-configuration).

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser to launch Lumina.

### 4. Build for Production
```bash
npm run build
npm run start
```

---

## 📜 License

This project is licensed under the [MIT License](LICENSE).
