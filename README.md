# 🌌 Lumina — Digital Asset Management & Cloud Gallery Platform

[![Next.js](https://img.shields.io/badge/Next.js-14.2-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Cloudinary](https://img.shields.io/badge/Cloudinary-CDN-blueviolet?style=for-the-badge&logo=cloudinary)](https://cloudinary.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-11.5-purple?style=for-the-badge&logo=framer)](https://www.framer.com/motion/)
[![Live Demo](https://img.shields.io/badge/Live_Demo-lumina--cloud--gallery.vercel.app-000000?style=for-the-badge&logo=vercel)](https://lumina-cloud-gallery.vercel.app)

Lumina is a production-grade **Digital Asset Management & Cloud Gallery Platform** built with Next.js 14, TypeScript, Tailwind CSS, Cloudinary, and Framer Motion. It offers high-performance cloud photo streaming, tag-based curation, and asset metadata inspection.

> 🌐 **Live Web Application**: <a href="https://lumina-cloud-gallery.vercel.app" target="_blank" rel="noopener noreferrer">https://lumina-cloud-gallery.vercel.app</a>

---

## ✨ Key Features & Design Highlights

- 📸 **Cloud Photo Streaming**: Fast media delivery powered by Cloudinary CDN with automatic format optimization and responsive image loading.
- 🏷️ **Tag-Based Media Curation**: Instant category filter pills (`All`, `Nature`, `Architecture`, `Cyberpunk`, `Minimalist`) and real-time search indexing.
- 🔍 **Interactive Asset Inspection Modal**: Click any photo to view technical EXIF metadata (width, height, format, creation date, storage engine), copy asset share URLs, and trigger downloads.
- 💖 **Curated Favorites Vault**: Add or remove assets from a personal curated collection with persistent state tracking.
- 📁 **Organized Album Folders**: Dedicated collection views categorized by theme and topic tags.
- 🎨 **Modern Dark Glassmorphism**: Soft rounded pill buttons (`rounded-full`), translucent header/sidebar navigation, glowing radial background accents, and responsive masonry gallery grids.

---

## 🛠️ Technology Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Cloud Media Provider**: [Cloudinary](https://cloudinary.com/) (`next-cloudinary`)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)

---

## 📂 Project Structure

```
lumina-cloud-gallery/
├── public/                 # Favicons & static assets
├── src/
│   ├── app/
│   │   ├── albums/         # Folder routes & album collection view
│   │   ├── favourites/     # Favorites curated collection page
│   │   ├── components/
│   │   │   ├── Navbar.tsx            # Translucent glassmorphism header & search
│   │   │   ├── Side_Nav.tsx          # Responsive library sidebar
│   │   │   ├── Cloudinary-image.tsx  # Gallery image card component
│   │   │   ├── ImageDetailModal.tsx  # EXIF metadata detail modal
│   │   │   ├── Upload_btn.tsx        # Media upload button
│   │   │   └── Get_data.tsx          # Cloudinary fetcher & sample fallback data
│   │   ├── globals.css               # Glassmorphism & design system tokens
│   │   ├── layout.tsx                # OpenGraph & metadata setup
│   │   └── page.tsx                  # Main gallery masonry grid & tag filter
│   ├── components/
│   │   └── button.tsx                # Rounded pill button primitive
│   └── lib/
│       └── utils.ts                  # Tailwind class merge utility
├── package.json
└── README.md
```

---

## 🚀 Quick Start Guide

```bash
# 1. Install dependencies
npm install

# 2. Run development server
npm run dev

# 3. Build for production
npm run build
```
