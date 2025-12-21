# Wedding Invitation Website

A modern, elegant wedding invitation website built with Astro, React, and Tailwind CSS. Features a beautiful dark mode, interactive components, and a seamless user experience.

## Features

### Core Functionality

- **Digital Invitation Envelope**: Animated opening experience with guest personalization
- **Countdown Timer**: Real-time countdown to the wedding ceremony
- **Dual Event Details**: Separate sections for Akad (ceremony) and Resepsi (reception)
- **Interactive Gallery**: Responsive photo gallery with lightbox viewer
- **RSVP System**: Guest confirmation with attendance tracking
- **Guest Book**: Message wall with pagination for wedding wishes
- **Gift Information**: Bank account details and physical address with copy-to-clipboard
- **Theme Toggle**: Seamless light/dark mode switching with system preference detection

### User Experience

- **Smooth Animations**: Intersection Observer-based reveal animations
- **Background Music**: Auto-playing wedding music (user-triggered)
- **Floating Petals**: Ambient particle animation throughout the site
- **Responsive Design**: Fully optimized for mobile, tablet, and desktop
- **Auto-hide Navigation**: Context-aware navigation bar with smart visibility
- **Guest Personalization**: URL parameter support for personalized invitations

### Technical Features

- **Local Storage Persistence**: Theme preferences and demo data storage
- **Calendar Integration**: Google Calendar and ICS file download support
- **Map Integration**: Embedded Google Maps with custom styling
- **Type Safety**: Full TypeScript implementation
- **SEO Optimized**: Proper meta tags and semantic HTML

## Project Information

- **Name**: wedding
- **Version**: 1.0.0
- **License**: MIT
- **Author**: Yahya Zulfikri
- **Email**: zulfikriyahya18@gmail.com
- **Website**: https://feyaya.com
- **Package Manager**: Yarn 4.10.3

## Tech Stack

- **Framework**: Astro 5.16.6
- **UI Library**: React 19.2.3
- **Styling**: Tailwind CSS v4.1.18
- **Icons**: Lucide React 0.562.0
- **Language**: TypeScript 5.9.3
- **Build Tool**: Vite 7.3.0
- **Package Manager**: Yarn 4.10.3

## Project Structure

```
├── src/
│   ├── components/         # React components
│   │   ├── BirdsAnimation.tsx
│   │   ├── CoupleProfile.tsx
│   │   ├── Envelope.tsx
│   │   ├── EventDetails.tsx
│   │   ├── Gallery.tsx
│   │   ├── GiftInfo.tsx
│   │   ├── Hero.tsx
│   │   ├── LoveStory.tsx
│   │   ├── MusicPlayer.tsx
│   │   ├── Navbar.tsx
│   │   ├── RSVPForm.tsx
│   │   └── Wishes.tsx
│   ├── layouts/           # Astro layouts
│   │   └── Layout.astro
│   ├── pages/             # Astro pages
│   │   └── index.astro
│   ├── services/          # Business logic
│   │   └── dbService.ts
│   ├── styles/            # Global styles
│   │   └── global.css
│   ├── utils/             # Helper functions
│   │   └── calendarUtils.ts
│   ├── App.tsx            # Main React app
│   ├── constants.tsx      # Configuration constants
│   └── types.ts           # TypeScript definitions
├── astro.config.mjs       # Astro configuration
├── package.json           # Dependencies
├── tsconfig.json          # TypeScript configuration
└── .editorconfig          # Editor configuration
```

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- Yarn 4.x

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd wedding-invitation
```

2. Install dependencies:

```bash
yarn install
```

3. Start the development server:

```bash
yarn dev
# or
yarn start
```

The site will be available at `http://localhost:4321`

### Build for Production

```bash
yarn build
```

The built files will be in the `dist/` directory.

**Note**: The build configuration includes rollup warning suppressions for `isRemoteAllowed` and `matchHostname` to avoid unnecessary console warnings during the build process.

### Preview Production Build

```bash
yarn preview
```

### Available Scripts

- `yarn dev` - Start development server
- `yarn start` - Alternative command for development server
- `yarn build` - Build for production
- `yarn preview` - Preview production build locally
- `yarn astro` - Run Astro CLI commands

## Build Configuration

The project uses custom Vite configuration with:

- Tailwind CSS Vite plugin
- Rollup warning suppressions for common Vite warnings
- Optimized build settings for production

### Peer Dependencies

The `package.json` includes custom peer dependency rules:

```json
"peerDependencyRules": {
  "allowAny": ["react", "react-dom", "vite"],
  "ignoreMissing": ["vite"]
}
```

This configuration resolves compatibility issues between Astro, React 19, and Vite 7.

## Configuration

### Wedding Information

Edit `src/constants.tsx` to customize the wedding details:

```typescript
export const WEDDING_CONFIG: WeddingConfig = {
  couple: {
    bride: {
      name: "Fey",
      fullName: "Fera Oktapia",
      parents: "Putri ke 1 dari Bapak Adam & Ibu Siti Hawa",
      instagram: "fera_oktapia",
      image: "URL_TO_IMAGE",
    },
    groom: {
      // Similar structure
    },
  },
  venue: {
    name: "The Royal Azure Ballroom",
    address: "Full venue address",
    latitude: -6.2088,
    longitude: 106.8456,
  },
  events: {
    akad: {
      title: "Janji Suci",
      // Event details
    },
    resepsi: {
      // Event details
    },
  },
};
```

### Gallery Images

Update the `GALLERY_IMAGES` array in `src/constants.tsx`:

```typescript
export const GALLERY_IMAGES = [
  "https://your-image-url-1.jpg",
  "https://your-image-url-2.jpg",
  // Add more images
];
```

### Bank Accounts

Modify `BANK_ACCOUNTS` in `src/constants.tsx`:

```typescript
export const BANK_ACCOUNTS = [
  { bank: "Bank BCA", number: "1234567890", name: "Account Name" },
  // Add more accounts
];
```

### Background Music

Replace the audio source in `src/components/MusicPlayer.tsx`:

```typescript
<audio ref={audioRef} src="https://your-music-url.mp3" loop preload="auto" />
```

## Personalization

### Guest-Specific Invitations

Share personalized invitation links:

```
https://your-domain.com/?to=John+Doe
```

The guest name will appear in the envelope and throughout the site.

### Dark Mode Implementation

The project includes a sophisticated dark mode system:

1. **Tailwind CSS v4 Override**: Uses custom variant to enable class-based dark mode

```css
@variant dark (&:where(.dark, .dark *));
```

2. **FOUC Prevention**: Inline script in layout prevents flash of unstyled content

```javascript
const theme = (() => {
  if (typeof localStorage !== "undefined" && localStorage.getItem("theme")) {
    return localStorage.getItem("theme");
  }
  if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    return "dark";
  }
  return "light";
})();
```

3. **Persistent State**: Theme preference saved to localStorage
4. **System Preference Detection**: Respects user's OS theme setting
5. **Smooth Transitions**: 1000ms duration for all color transitions

### Color Customization

The color scheme can be modified in `src/styles/global.css`:

```css
@theme {
  --color-primary: #0f172a;
  --color-secondary: #fafaf9;
  --color-accent: #7dd3fc;
  --color-accentDark: #075985;
  --color-darkBg: #020617;
  --color-darkSurface: #0f172a;
}
```

### Custom Animations

The project includes several custom animations:

```css
@theme {
  /* Animations */
  --animate-subtle-zoom: subtleZoom 20s infinite alternate;
  --animate-reveal: reveal 1.2s cubic-bezier(0.22, 1, 0.36, 1) forwards;
  --animate-float: float 6s ease-in-out infinite;
  --animate-pulse-soft: pulseSoft 4s ease-in-out infinite;
  --animate-spin-slow: spin 8s linear infinite;
}
```

**Usage in components**:

- `subtleZoom`: Background images with slow zoom effect
- `reveal`: Fade-in and slide-up animation for sections
- `float`: Gentle floating motion for decorative elements
- `pulse-soft`: Subtle pulsing for icons and accents
- `spin-slow`: Slow rotation for loading states

### Intersection Observer

Sections use Intersection Observer for scroll-based reveal animations:

```typescript
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("reveal-active");
      entry.target.classList.remove("opacity-0");
    }
  });
}, observerOptions);
```

## Data Storage

This project uses browser LocalStorage for:

- RSVP submissions
- Guest wishes/messages
- Theme preferences
- Demo data generation

### Demo Data

The application includes an automatic demo data generator that creates 165 authentic-looking wedding wishes with:

- Indonesian names (male and female)
- Realistic congratulatory messages in Bahasa Indonesia
- Randomized timestamps spanning 3 months
- Automatic initialization on first load

For production use, consider integrating a backend service or database.

### Data Structure

**RSVP Data** (`wedding_rsvp` key):

```typescript
{
  id: number;
  guest_name: string;
  phone?: string;
  attendance: "hadir" | "tidak_hadir" | "ragu";
  guest_count: number;
  message?: string;
  created_at: string;
}
```

**Wishes Data** (`wedding_wishes` key):

```typescript
{
  id: number;
  name: string;
  message: string;
  created_at: string;
}
```

## Astro Configuration

The project uses a custom Astro configuration with:

```javascript
export default defineConfig({
  integrations: [react()],
  vite: {
    plugins: [tailwind()],
    build: {
      rollupOptions: {
        onwarn(warning, warn) {
          // Suppress isRemoteAllowed and matchHostname warnings
          if (
            warning.message.includes("isRemoteAllowed") ||
            warning.message.includes("matchHostname")
          ) {
            return;
          }
          warn(warning);
        },
      },
    },
  },
});
```

### Client-Side Rendering

The main App component uses `client:only="react"` directive because:

- Envelope animation logic depends on browser APIs (window/document)
- Theme switching requires immediate DOM manipulation
- Music player needs user interaction detection
- All interactive features require client-side JavaScript

## TypeScript Configuration

The project uses strict TypeScript configuration:

```json
{
  "extends": "astro/tsconfigs/strict",
  "compilerOptions": {
    "jsx": "react-jsx",
    "jsxImportSource": "react",
    "types": ["@types/react", "@types/react-dom"],
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "esModuleInterop": true,
    "skipLibCheck": true
  }
}
```

### Type Imports

The project uses proper TypeScript type imports to separate type-only imports from value imports:

```typescript
// Enum (value import)
import { AttendanceStatus } from "../types";

// Interface (type import)
import type { RSVP, Wish } from "../types";
```

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Deployment

This Astro project can be deployed to various platforms:

### Vercel

```bash
yarn build
# Deploy dist folder to Vercel
```

### Netlify

```bash
yarn build
# Deploy dist folder to Netlify
```

### Static Hosting

The build output in `dist/` can be served from any static file hosting service.

## Performance Optimizations

- Lazy loading images with native `loading="lazy"`
- Intersection Observer for animations (only animate when visible)
- Debounced scroll events for navbar visibility
- Optimized font loading with preconnect
- Efficient component rendering with React memoization
- CSS-based animations (no JavaScript overhead)

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Accessibility

- Semantic HTML structure
- Keyboard navigation support
- ARIA labels where appropriate
- Color contrast compliance (WCAG AA)
- Focus indicators for interactive elements
- Reduced motion support (respects prefers-reduced-motion)

## Known Issues

- Music autoplay may be blocked by browser policies (requires user interaction)
- LocalStorage has 5-10MB limit per domain
- Some animations may not work on older browsers

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.

## Support

For issues or questions, please open an issue in the GitHub repository.

## Acknowledgments

- Built with Astro and React
- Icons by Lucide
- Fonts from Google Fonts (Cormorant Garamond, Outfit)
- Inspired by modern editorial design principles
- Background textures from transparenttextures.com

---

Made with love for Fera & Yahya's special day.
