# ⏰ What Time Is It - Award-Winning Time Display

![App Preview](https://images.unsplash.com/photo-1501139083538-0139583c060f?w=1200&h=300&fit=crop&auto=format)

An award-winning time display website that creates a completely unique visual experience on every visit. This application dynamically combines design themes, typography configurations, layout variations, and visual effects from your Cosmic CMS content to generate thousands of possible design combinations while always showing you the current time.

## ✨ Features

- **Infinite Visual Variety**: Each visit generates a unique combination of themes, layouts, and effects
- **Real-Time Clock**: Displays current time in multiple formats (12-hour, 24-hour, minimal)
- **Award-Winning Design**: Professional-grade animations, typography, and visual effects
- **Dynamic Randomization**: Combines 4 design themes × 3 time displays × 3 layouts × 4 visual effects
- **Mobile-First Responsive**: Optimized layouts and typography for all screen sizes
- **Performance Optimized**: Built with Next.js 15, TypeScript, and Tailwind CSS
- **Content-Driven**: Fully powered by Cosmic CMS for easy design updates without code changes

## Clone this Bucket and Code Repository

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Bucket and Code Repository](https://img.shields.io/badge/Clone%20this%20Bucket-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmic-staging.com/projects/new?clone_bucket=687e943d713abc4f2911f9e1&clone_repository=687e9849713abc4f2911fa08)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Build an award winning design website that only shows you the time but each time you visit the site it's a new, amazing looking page. 
Content Structure Strategy
Core Object Types
1. Time Display Configurations

Object Type: "time-displays"
- Title: "Default Time Display" 
- Metafields:
  - Font Family (text)
  - Font Size Range (text - e.g., "120px-200px")
  - Color Palette (repeater with hex codes)
  - Animation Type (select - fade, slide, pulse, etc.)
  - Background Type (select - gradient, image, video, etc.)
Copy
2. Design Themes

Object Type: "design-themes"
- Title: Theme name
- Metafields:
  - CSS Variables (textarea - custom properties)
  - Background Assets (media)
  - Typography Stack (text)
  - Animation Presets (JSON)
  - Color Schemes (repeater)
Copy
3. Layout Variations

Object Type: "layouts"
- Title: Layout name
- Metafields:
  - Component Structure (rich text/HTML)
  - Grid Configuration (text)
  - Positioning Rules (textarea)
  - Responsive Breakpoints (JSON)
Copy
Content Modeling Benefits
Randomization Pool: Store multiple design variations that can be randomly selected
Easy Updates: Non-technical updates to colors, fonts, animations
Version Control: Track which designs perform best
Scalability: Add new themes without code changes
Implementation Concept
Your frontend would:

Fetch all active themes from Cosmic
Randomly select design elements
Apply dynamic styling based on content
Display current time with the randomized design
This approach separates content (design data) from code, making it highly maintainable and allowing for continuous design evolution without deployments.
"

### Code Generation Prompt

> Build a website that shows you the time. Also have it visually be different every time you visit. This site should be at an award winning level of design to really show off, but also have the fun functionality of knowing the time. add to Cosmic config  apiEnvironment: "staging"

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## 🛠️ Technologies Used

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Cosmic CMS** - Headless content management
- **Framer Motion** - Advanced animations and effects

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ or Bun
- A Cosmic account with the time display bucket

### Installation

1. **Clone this repository**
   ```bash
   git clone <repository-url>
   cd what-time-is-it
   ```

2. **Install dependencies**
   ```bash
   bun install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Add your Cosmic credentials:
   ```env
   COSMIC_BUCKET_SLUG=what-time-is-it-production
   COSMIC_READ_KEY=your-read-key
   COSMIC_WRITE_KEY=your-write-key
   ```

4. **Run the development server**
   ```bash
   bun run dev
   ```

5. **Open [http://localhost:3000](http://localhost:3000)** to see the time display

## 📊 Cosmic SDK Examples

### Fetching Design Data

```typescript
// Get all design themes
const themes = await cosmic.objects.find({
  type: 'design-themes'
}).props(['id', 'title', 'slug', 'metadata']).depth(1);

// Get random time display configuration  
const displays = await cosmic.objects.find({
  type: 'time-displays'
}).props(['id', 'title', 'slug', 'metadata']);

// Get layout variations
const layouts = await cosmic.objects.find({
  type: 'layout-variations'  
}).props(['id', 'title', 'slug', 'metadata']);

// Get visual effects
const effects = await cosmic.objects.find({
  type: 'visual-effects'
}).props(['id', 'title', 'slug', 'metadata']);
```

### Random Selection Logic

```typescript
// Randomly combine design elements
const randomDesign = {
  theme: themes[Math.floor(Math.random() * themes.length)],
  display: displays[Math.floor(Math.random() * displays.length)],
  layout: layouts[Math.floor(Math.random() * layouts.length)],
  effect: effects[Math.floor(Math.random() * effects.length)]
};
```

## 🎨 Cosmic CMS Integration

The application uses four main content types in your Cosmic bucket:

### Design Themes
- **Theme Name**: Display name for the design
- **Primary/Secondary Fonts**: Typography stack configuration
- **Color Palette**: JSON object with theme colors
- **Background Style**: Gradient, solid, image, or pattern
- **Background Config**: JSON configuration for background rendering
- **CSS Variables**: Custom CSS properties for advanced styling

### Time Displays  
- **Display Name**: Configuration name
- **Time Format**: 12-hour, 24-hour, or minimal display
- **Font Size Range**: Responsive clamp() values
- **Font Weight**: Typography weight (100-900)
- **Text Alignment**: Center, left, or right alignment
- **Letter Spacing**: Typography spacing adjustments

### Layout Variations
- **Layout Name**: Configuration identifier
- **Positioning Type**: Center, offset, corner, or floating
- **Position Config**: JSON positioning rules
- **Container Styling**: JSON styling configuration
- **Responsive Rules**: Mobile/tablet breakpoint adjustments

### Visual Effects
- **Effect Name**: Animation identifier  
- **Animation Type**: Fade, pulse, glow, slide, rotate, or scale
- **Animation Duration**: Timing configuration
- **Animation Config**: JSON keyframes and timing functions
- **Trigger Type**: Continuous, interval, hover, or page load

## 🚀 Deployment Options

### Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone)

1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard:
   - `COSMIC_BUCKET_SLUG`
   - `COSMIC_READ_KEY` 
   - `COSMIC_WRITE_KEY`
3. Deploy!

### Deploy to Netlify

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start)

1. Connect your GitHub repository to Netlify
2. Add environment variables in Netlify dashboard
3. Build command: `bun run build`
4. Publish directory: `.next`

### Environment Variables

For production, set these environment variables in your hosting platform:

```env
COSMIC_BUCKET_SLUG=what-time-is-it-production
COSMIC_READ_KEY=your-cosmic-read-key
COSMIC_WRITE_KEY=your-cosmic-write-key
```

The application will automatically generate unique time display experiences using your Cosmic content!

<!-- README_END -->