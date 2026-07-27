# 🌌 Lumina — Digital Asset Management & Cloud Gallery Platform

[![Next.js](https://img.shields.io/badge/Next.js-14.2-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Cloudinary](https://img.shields.io/badge/Cloudinary-CDN-blueviolet?style=for-the-badge&logo=cloudinary)](https://cloudinary.com/)
[![Lucide Icons](https://img.shields.io/badge/Lucide_Icons-0.428-pink?style=for-the-badge&logo=lucide)](https://lucide.dev/)
[![Live Demo](https://img.shields.io/badge/Live_Demo-lumina--cloud--gallery.vercel.app-000000?style=for-the-badge&logo=vercel)](https://lumina-cloud-gallery.vercel.app)

**Lumina** is a Digital Asset Management (DAM) & Cloud Gallery Platform built with **Next.js 14 (App Router)**, **TypeScript**, **Tailwind CSS**, and **Cloudinary CDN**. It provides cloud photo streaming, real-time tag-based curation, album folder management, light/dark theme modes, and EXIF metadata inspection.

> 🌐 **Live Web Application**: <a href="https://lumina-cloud-gallery.vercel.app" target="_blank" rel="noopener noreferrer">https://lumina-cloud-gallery.vercel.app</a>

---

## 🖼️ Application Interface Gallery

### 1. Main Gallery Grid & Search Interface
![Lumina Main Gallery Interface](public/hero-preview.png)

### 2. EXIF Metadata & Album Assignment Modal
![Lumina Asset Detail Modal](public/asset-detail-modal.png)

### 3. Dedicated Album Collection Folders
![Lumina Album Collections](public/album-collections.png)

### 4. Cloud-Synced Favorites Vault
![Lumina Favorites Vault](public/favorites-vault.png)

---

## ✨ Core Features & Technical Highlights

- ☁️ **Cloudinary API Integration**: Asset uploads, album assignments, favorite toggles, and asset deletions driven via Cloudinary Server Actions and API endpoints.
- ⚡ **Synchronous Server Actions**: Operations await API execution with visual status indicators and feedback toasts.
- 🎨 **Adaptive Light & Dark Theme System**: Supports light and dark theme modes with high-contrast typography, glassmorphism UI elements, and stage preview backgrounds.
- 🏷️ **Tag-Based Curation & Dynamic Albums**: Multi-album asset management with tag reassignment, folder cover previews, and asset count indexing.
- 💖 **Cloud-Synced Favorites**: Asset favorite status managed via Cloudinary `"favorite"` tags.
- 📥 **Direct Media Downloads**: High-speed browser Blob downloads for full-resolution assets.
- 🚀 **10MB Upload Payload Support**: Server Action payload limit configured up to 10MB to accommodate high-resolution images.
- 🔄 **Cache Invalidation**: Automatic `revalidatePath` calls maintain view consistency across route transitions.

---

## 🛠️ Technology Stack

| Layer | Technology | Description |
| :--- | :--- | :--- |
| **Framework** | Next.js 14 (App Router) | React framework with Server Components & Server Actions |
| **Language** | TypeScript 5.0 | Type safety and end-to-end typing |
| **Cloud Storage & CDN** | Cloudinary (`cloudinary` v2) | Media transformation, CDN delivery, search, and folder indexing |
| **Styling** | Tailwind CSS | Design tokens, responsive utility classes, and glassmorphism |
| **Icons** | Lucide React | Modern UI icons |

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
├── public/                     # Screenshots & public media
│   ├── hero-preview.png        # Main gallery grid screenshot
│   ├── asset-detail-modal.png  # EXIF metadata detail modal screenshot
│   ├── album-collections.png   # Album folder view screenshot
│   ├── favorites-vault.png     # Favorites collection screenshot
│   └── site.webmanifest
├── src/
│   ├── app/
│   │   ├── albums/             # Album collections & folder details
│   │   │   ├── [album]/        # Dynamic tag-filtered album route
│   │   │   └── page.tsx        # Album management & folder grid
│   │   ├── favourites/         # Favorites curated vault route
│   │   ├── components/
│   │   │   ├── Navbar.tsx            # Header with theme toggle
│   │   │   ├── Side_Nav.tsx          # Navigation sidebar
│   │   │   ├── CloudinaryImage.tsx   # Responsive image card primitive
│   │   │   ├── ImageDetailModal.tsx  # EXIF metadata & album move modal
│   │   │   ├── MediaContext.tsx      # Media state provider & Cloudinary sync
│   │   │   ├── FavoritesContext.tsx  # Cloudinary tag-driven favorites provider
│   │   │   ├── ThemeContext.tsx      # Light/Dark mode state provider
│   │   │   ├── upload_btn.tsx        # Cloudinary upload component
│   │   │   └── Get_data.tsx          # Cloudinary server actions
│   │   ├── globals.css               # Design system tokens & utilities
│   │   ├── layout.tsx                # Context providers & OpenGraph metadata
│   │   └── page.tsx                  # Main gallery masonry grid & search bar
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
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build for Production
```bash
npm run build
npm run start
```
