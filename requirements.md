# Senior Software Developer Portfolio - Technical Requirements

## Project Overview
A modern, responsive portfolio website based on the Drake template design, built with cutting-edge technologies and Domain Driven Design principles for a senior software developer.

## 🎯 Design Reference
**Template**: Drake Portfolio (https://wpriverthemes.com/HTML/drake/index.html)
**Style**: Modern, minimal, bold with strong personal branding
**Target**: Senior Software Developer showcasing technical expertise

---

## 🏗️ Architecture & Technology Stack

### Frontend Stack (Latest 2025)
- **Framework**: React 19 with Concurrent Features
- **Build Tool**: Vite 6.x (fastest bundler)
- **Language**: TypeScript 5.5+
- **Styling**: Tailwind CSS 4.x + CSS Variables
- **UI Components**: shadcn/ui (Radix UI + Tailwind)
- **Animations**: Framer Motion 11.x
- **State Management**: Zustand 4.x (lightweight, TypeScript-first)
- **Data Fetching**: TanStack Query v5 (React Query)
- **Form Handling**: React Hook Form 7.x + Zod validation
- **Icons**: Lucide React + Custom SVGs
- **Font**: Inter + JetBrains Mono (code snippets)

### Backend Stack (NestJS - Required for Contact Form & CMS)
- **Framework**: NestJS 10.x (Node.js)
- **Language**: TypeScript 5.5+
- **Database**: PostgreSQL 16 + Prisma ORM
- **Authentication**: JWT + Passport.js
- **File Upload**: Cloudinary integration
- **Validation**: Class-validator + Class-transformer
- **Documentation**: Swagger/OpenAPI 3.0

### DevOps & Deployment
- **Frontend**: Vercel (optimal for React/Vite)
- **Backend**: Render (NestJS deployment)
- **Database**: Supabase/PlanetScale
- **CDN**: Cloudinary (images/assets)
- **Domain**: Custom domain with SSL
- **CI/CD**: GitHub Actions (auto-deploy to Vercel & Render)

---

## 🏛️ Domain Driven Design Architecture

### Core Domains

#### 1. **Portfolio Domain** (Core)
```
├── entities/
│   ├── Project.ts
│   ├── Skill.ts
│   ├── Experience.ts
│   └── Education.ts
├── value-objects/
│   ├── TechnologyStack.ts
│   ├── ProjectCategory.ts
│   └── SkillLevel.ts
├── repositories/
│   └── IPortfolioRepository.ts
├── services/
│   └── PortfolioService.ts
└── aggregates/
    └── DeveloperProfile.ts
```

#### 2. **Contact Domain** (Supporting)
```
├── entities/
│   ├── ContactMessage.ts
│   └── ContactForm.ts
├── services/
│   ├── EmailService.ts
│   └── ContactService.ts
└── repositories/
    └── IContactRepository.ts
```

#### 3. **Content Domain** (Supporting)
```
├── entities/
│   ├── Testimonial.ts
│   └── Service.ts
├── services/
│   └── ContentService.ts
└── repositories/
    └── IContentRepository.ts
```

#### 4. **Infrastructure Domain** (Generic)
```
├── entities/
│   └── FileUpload.ts
├── services/
│   ├── FileService.ts
│   └── DatabaseService.ts
└── value-objects/
    └── FileMetadata.ts
```

---

## 🎨 UI/UX Requirements (Based on Drake Template)

### Design System (Drake Template Exact Colors)
- **Color Palette**: 
  - Primary: `#28e98c` (Drake Green - default)
  - Dark Background: `#1f1f1f` (Dark Gray)
  - Light Background: `#ffffff` (White)
  - Text Primary: `#000000` (Black)
  - Text Secondary: `#999999` (Gray)
  - Alternative Colors: `#e4af12`, `#fe6f1d`, `#14c5fd`, `#1338f3`, `#f31313` (switchable)
- **Typography**: Inter (all weights: 100-900) from Google Fonts
- **Font Sizes**: 16px base, 24px headings, 14px small, 12px micro
- **Spacing**: 8px grid system
- **Border Radius**: 8px, 12px, 16px
- **Shadows**: Soft, layered shadows

### Component Library
```
├── atoms/
│   ├── Button.tsx
│   ├── Input.tsx
│   ├── Badge.tsx
│   ├── Avatar.tsx
│   └── Icon.tsx
├── molecules/
│   ├── SkillBar.tsx
│   ├── ProjectCard.tsx
│   ├── TestimonialCard.tsx
│   ├── ServiceCard.tsx
│   └── ContactForm.tsx
├── organisms/
│   ├── Navigation.tsx
│   ├── Hero.tsx
│   ├── About.tsx
│   ├── Resume.tsx
│   ├── Services.tsx
│   ├── Skills.tsx
│   ├── Portfolio.tsx
│   ├── Testimonials.tsx
│   └── Contact.tsx
└── templates/
    └── PortfolioLayout.tsx
```

---

## 📱 Responsive Design Requirements

### Breakpoints (Tailwind CSS 4.x)
- **Mobile**: `sm: 640px`
- **Tablet**: `md: 768px`
- **Desktop**: `lg: 1024px`
- **Large**: `xl: 1280px`
- **Extra Large**: `2xl: 1536px`

### Layout Behavior
- **Mobile-first approach**
- **Fluid typography** (clamp() CSS functions)
- **Responsive images** (next/image optimization)
- **Touch-friendly interactions** (44px minimum tap targets)

---

## 🧩 Features & Functionality

### 1. Header/Navigation
- **Fixed navigation** with scroll detection
- **Logo** (custom SVG)
- **Menu items**: Home, About, Resume, Services, Skills, Portfolio, Testimonials, Contact
- **Mobile hamburger menu** with smooth animation
- **Smooth scroll** to sections
- **Active section highlighting**

### 2. Hero Section (Introduce)
- **Profile image** with border animation
- **Animated text**: Name, title, tagline
- **Statistics counters**: Years of experience, projects completed
- **CTA button**: "Hire Me" with hover effects
- **Background**: Subtle gradient or pattern
- **Scroll indicator**: Animated down arrow

### 3. About Section
- **Personal story** (rich text editor in admin)
- **Professional photo**
- **Key highlights** (bullet points)
- **Download CV** button (PDF generation)
- **Social links** with hover animations

### 4. Resume Section
- **Timeline component** (vertical/horizontal responsive)
- **Experience entries**: Company, role, duration, description
- **Education entries**: Institution, degree, duration
- **Interactive timeline** with hover states
- **Icons** for companies/institutions

### 5. Services Section
- **Service cards** with icons
- **Project counters** per service
- **Hover animations** (lift, glow effects)
- **Modal/drawer** for service details

### 6. Skills Section
- **Skill bars** with animated progress
- **Technology icons** (custom/branded)
- **Skill categories**: Frontend, Backend, Tools, etc.
- **Interactive filtering**

### 7. Portfolio Section
- **Project grid** (masonry layout)
- **Project cards** with image, title, technologies, links
- **Filtering** by technology/category
- **Modal/lightbox** for project details
- **Live demo** and GitHub links
- **Image lazy loading**

### 8. Testimonials Section
- **Testimonial cards** with client photos
- **Carousel/slider** with navigation
- **Star ratings**
- **Client company logos**
- **Auto-play** with pause on hover

### 9. Contact Section
- **Contact form** with validation
- **File upload** for attachments
- **Success/error notifications**
- **Contact information** (email, location)
- **Social media links**

---

## 🔧 Technical Features

### Performance
- **Lighthouse score**: 95+ across all metrics
- **Core Web Vitals**: LCP < 2.5s, FID < 100ms, CLS < 0.1
- **Image optimization**: WebP/AVIF format
- **Code splitting**: Route-based chunks
- **Tree shaking**: Remove unused code
- **Prefetching**: Critical resources

### SEO
- **Meta tags**: Dynamic title, description, OG tags
- **JSON-LD**: Structured data for person/organization
- **Sitemap**: Auto-generated XML sitemap
- **Robots.txt**: Search engine directives
- **Canonical URLs**: Prevent duplicate content

### Accessibility (WCAG 2.1 AA)
- **Semantic HTML**: Proper heading hierarchy
- **ARIA labels**: Screen reader support
- **Keyboard navigation**: Tab order, focus management
- **Color contrast**: 4.5:1 minimum ratio
- **Alt text**: All images described
- **Focus indicators**: Visible focus states

### Security
- **HTTPS**: SSL certificate
- **Content Security Policy**: XSS prevention
- **Rate limiting**: API endpoint protection
- **Input validation**: Frontend + backend
- **SQL injection**: Parameterized queries
- **CORS**: Proper domain restrictions

---

## 📊 Backend Requirements (NestJS API)

### Required for:
1. **Contact form submissions**
2. **File uploads** (CV, attachments)
3. **Content management** (admin panel)

### API Endpoints
```
POST /api/contact           # Contact form submission
POST /api/upload           # File upload
GET  /api/portfolio        # Portfolio data
GET  /api/testimonials     # Testimonials
GET  /api/services         # Services
```

### Database Schema (Prisma)
```prisma
model Contact {
  id        String   @id @default(cuid())
  name      String
  email     String
  phone     String?
  subject   String
  budget    String?
  message   String
  attachment String?
  createdAt DateTime @default(now())
  status    ContactStatus @default(UNREAD)
}

model Project {
  id          String   @id @default(cuid())
  title       String
  description String
  image       String
  liveUrl     String?
  githubUrl   String?
  technologies String[]
  category    ProjectCategory
  featured    Boolean  @default(false)
  createdAt   DateTime @default(now())
}

model Testimonial {
  id       String @id @default(cuid())
  name     String
  company  String
  position String
  content  String
  rating   Int
  image    String?
  featured Boolean @default(false)
}
```

---

## 📱 Progressive Web App (PWA)
- **Service Worker**: Offline functionality
- **App Manifest**: Install prompt
- **Push Notifications**: Contact form submissions
- **Offline Pages**: Cached portfolio content
- **Background Sync**: Form submissions when online

---

## 🧪 Testing Strategy

### Frontend Testing
- **Unit Tests**: Vitest + Testing Library
- **Component Tests**: Storybook
- **E2E Tests**: Playwright
- **Visual Tests**: Chromatic
- **Performance Tests**: Lighthouse CI

### Backend Testing
- **Unit Tests**: Jest + Supertest
- **Integration Tests**: Test database
- **API Tests**: Postman/Newman
- **Load Tests**: Artillery

---

## 🚀 Deployment & DevOps

### CI/CD Pipeline
```yaml
# GitHub Actions Workflow
name: Deploy Portfolio

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  frontend:
    name: Deploy Frontend to Vercel
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      - name: Install dependencies
        run: npm ci
      - name: Build frontend
        run: npm run build
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}

  backend:
    name: Deploy Backend to Render
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Deploy to Render
        uses: johnbeynon/render-deploy-action@v0.0.8
        with:
          service-id: ${{ secrets.RENDER_SERVICE_ID }}
          api-key: ${{ secrets.RENDER_API_KEY }}
```

### Monitoring
- **Error Tracking**: Sentry
- **Performance**: Lighthouse CI
- **Uptime**: Better Stack
- **Logs**: Structured logging with Winston

---

## 📋 Content Management

### Static Content (Git-based)
- **Portfolio projects**: JSON/Markdown files
- **Skills**: JSON configuration
- **Experience/Education**: JSON data
- **Services**: JSON configuration

### Dynamic Content (Database)
- **Contact messages**
- **Testimonials** (admin can add/edit)
- **File uploads**

### Admin Panel (Optional Phase 2)
- **React Admin** dashboard
- **Authentication**: JWT tokens
- **CRUD operations**: Testimonials, projects
- **File management**: Upload/delete assets
- **Contact dashboard**: View contact submissions

---

## 🎯 Success Metrics

### Performance KPIs
- **Page Load Speed**: < 2 seconds
- **Lighthouse Score**: 95+
- **Contact Form Conversion**: Quality submissions
- **Bounce Rate**: < 40%
- **SEO Ranking**: Top 10 for relevant keywords

### Professional KPIs
- **Job Interview Requests**: Quality leads from recruiters
- **Technical Credibility**: Peer recognition and feedback
- **Portfolio Engagement**: Time spent on portfolio sections
- **Professional Network Growth**: LinkedIn connections and endorsements

---

## 📅 Development Phases

### Phase 1: Core Portfolio (4 weeks)
- ✅ Project setup (Vite + React 19 + TypeScript)
- ✅ Design system implementation
- ✅ Static sections (Hero, About, Resume, Services, Skills)
- ✅ Responsive design
- ✅ Performance optimization

### Phase 2: Interactive Features (3 weeks)
- ✅ Portfolio gallery with filtering
- ✅ Contact form with validation
- ✅ Animations and transitions
- ✅ SEO optimization
- ✅ PWA features

### Phase 3: Backend Integration (2 weeks)
- ✅ NestJS API setup
- ✅ Database schema
- ✅ Contact form processing
- ✅ File upload functionality

### Phase 4: Advanced Features (2 weeks)
- ✅ Admin panel (basic)
- ✅ Testing suite
- ✅ CI/CD deployment automation
- ✅ Performance monitoring

---

## 🔧 Development Environment Setup

### Prerequisites
```bash
Node.js 20+
npm/yarn/pnpm
Git
VS Code + Extensions
Docker (for local database)
```

### Recommended VS Code Extensions
- TypeScript Hero
- Tailwind CSS IntelliSense
- ES7+ React/Redux/React-Native snippets
- Prettier - Code formatter
- ESLint
- Auto Rename Tag
- Bracket Pair Colorizer
- GitLens

---

## 📝 Conclusion

This portfolio will showcase:
- **Technical Excellence**: Modern stack, best practices
- **Design Sophistication**: Beautiful, accessible UI
- **Performance**: Lightning-fast loading
- **Scalability**: Domain-driven architecture
- **Maintainability**: TypeScript, testing, documentation

The Drake template provides an excellent foundation for a senior developer portfolio that balances visual appeal with technical credibility.

---

**Backend Required**: ✅ YES (Simplified)
- Contact form processing
- File uploads (CV, attachments)
- Content management
- Portfolio showcase

**Recommended Tech Stack**: React 19 + Vite 6 + TypeScript + Tailwind + shadcn/ui + NestJS + PostgreSQL + Prisma

**Deployment**: GitHub Actions → Vercel (Frontend) + Render (Backend)

Would you like me to proceed with the implementation?
