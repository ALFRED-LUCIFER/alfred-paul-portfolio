# Alfred Paul Portfolio 🚀

A modern, responsive portfolio website showcasing my journey as a Team Leader in AI Engineering with over 11 years of experience in full-stack development.

## ✨ Features

- **🎨 Modern Design**: Clean, professional dark theme with Drake signature colors
- **📱 Fully Responsive**: Optimized for all devices and screen sizes
- **⚡ High Performance**: Built with React 19 and Vite for lightning-fast loading
- **🎭 Smooth Animations**: Powered by Framer Motion for engaging user experience
- **🌟 Real Testimonials**: LinkedIn recommendations from industry leaders
- **🎯 Interactive UI**: Modern components with hover effects and transitions
- **♿ Accessible**: WCAG compliant with proper contrast ratios

## 🛠️ Tech Stack

### Frontend
- **React 19** - Latest React with concurrent features
- **TypeScript 5.8+** - Type safety and better developer experience
- **Vite 7.x** - Ultra-fast build tool and dev server
- **Tailwind CSS 4.x** - Utility-first CSS framework
- **Framer Motion** - Production-ready motion library
- **Lucide React** - Beautiful & consistent icons

### Development
- **pnpm** - Fast, disk space efficient package manager
- **Turborepo** - High-performance build system for monorepos
- **ESLint & Prettier** - Code quality and formatting
- **PostCSS** - CSS processing and optimization

### Styling
- **CSS Variables** - Dynamic theming system
- **HSL Color Format** - Consistent color management
- **Custom Components** - Reusable UI components
- **Responsive Design** - Mobile-first approach

## 📂 Project Structure

```
portfolio/
├── apps/
│   └── web/                # Main portfolio application
│       ├── src/
│       │   ├── components/ # React components
│       │   ├── styles/     # CSS and styling
│       │   └── assets/     # Static assets
│       └── public/
│           └── images/     # Profile images
├── packages/              # Shared packages (if any)
├── docs/                  # Documentation
└── package.json          # Root package.json
```

## 🚀 Getting Started

### Prerequisites
- **Node.js** 18+ 
- **pnpm** 8+ (recommended) or npm/yarn

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd portfolio
```

2. **Install dependencies**
```bash
pnpm install
```

3. **Start development server**
```bash
pnpm dev
```

4. **Open in browser**
   - Navigate to `http://localhost:5173` (or the port shown in terminal)

### Build for Production

```bash
# Build the project
pnpm build

# Preview production build
pnpm preview
```

## 🎨 Design System

### Color Palette
- **Primary**: `#28e98c` (Drake Signature Green)
- **Background**: `#2a2f3a` (Rich Dark Gray)
- **Foreground**: `#ffffff` (Pure White)
- **Accent Colors**: Gold, Orange, Blue variants

### Typography
- **Primary Font**: Inter (Clean, modern sans-serif)
- **Mono Font**: JetBrains Mono (Code snippets)
- **Responsive**: Scales from mobile to desktop

## 📱 Sections

1. **Hero** - Introduction with professional photo and key stats
2. **About** - Professional journey and achievements  
3. **Resume** - Experience, education, and skills timeline
4. **Services** - Technical expertise and offerings
5. **Skills** - Technology stack and proficiency levels
6. **Portfolio** - Featured projects and case studies
7. **Testimonials** - Real LinkedIn recommendations
8. **Contact** - Professional contact information

## 🔧 Development

### Scripts
```bash
# Development
pnpm dev          # Start dev server
pnpm build        # Build for production  
pnpm preview      # Preview production build
pnpm lint         # Run ESLint
pnpm type-check   # TypeScript checking
```

### Image Setup
Place your professional photos in:
- `apps/web/public/images/alfred-paul-profile.jpg` (Hero section)
- `apps/web/public/images/alfred-paul-about.jpg` (About section)

Convert HEIC images to JPG format for web compatibility.

## 🌟 Key Achievements

- ✅ **Real Professional Data**: LinkedIn testimonials and actual experience
- ✅ **Performance Optimized**: Fast loading and smooth animations
- ✅ **Mobile-First Design**: Perfect on all devices
- ✅ **Accessibility**: WCAG compliant design
- ✅ **SEO Ready**: Optimized meta tags and structure
- ✅ **Modern Stack**: Latest technologies and best practices

## 🚀 Deployment

The portfolio is ready for deployment on:
- **Vercel** (Recommended for React apps)
- **Netlify** 
- **GitHub Pages**
- **AWS S3 + CloudFront**

### Vercel Deployment
1. Connect your GitHub repository to Vercel
2. Set build command: `pnpm build`
3. Set output directory: `apps/web/dist`
4. Deploy! 🎉

## 📞 Contact

**Alfred Paul**  
Team Leader AI Engineering  
📧 [Your Email]  
🔗 [LinkedIn Profile]  
🐙 [GitHub Profile]  

## 📄 License

This project is personal portfolio code. Feel free to use as inspiration for your own portfolio!

---

*Built with ❤️ and lots of ☕ by Alfred Paul*
