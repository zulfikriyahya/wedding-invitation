## Direktory: ROOT

### File: `./astro.config.mjs`

```javascript
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwind from "@tailwindcss/vite";

export default defineConfig({
  integrations: [react()],
  vite: {
    plugins: [tailwind()],
  },
});
```

---

### File: `./package.json`

```json
{
  "name": "fera-yahya-wedding-astro",
  "type": "module",
  "license": "MIT",
  "author": {
    "name": "Yahya Zulfikri",
    "email": "zulfikriyahya18@gmail.com",
    "url": "https://feyaya.com"
  },
  "version": "1.0.0",
  "scripts": {
    "dev": "astro dev",
    "start": "astro dev",
    "build": "astro build",
    "preview": "astro preview",
    "astro": "astro"
  },
  "dependencies": {
    "@astrojs/react": "^4.4.2",
    "@tailwindcss/vite": "^4.1.18",
    "@types/react": "^19.2.7",
    "@types/react-dom": "^19.2.3",
    "astro": "^5.16.6",
    "lucide-react": "^0.469.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "tailwindcss": "^4.0.0"
  }
}
```

---

### File: `./tsconfig.json`

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

---

## Direktory: src

### File: `./src/App.tsx`

```tsx
import React, { useEffect, useState } from "react";
import Hero from "./components/Hero";
import CoupleProfile from "./components/CoupleProfile";
import EventDetails from "./components/EventDetails";
import Gallery from "./components/Gallery";
import LoveStory from "./components/LoveStory";
import RSVPForm from "./components/RSVPForm";
import Wishes from "./components/Wishes";
import GiftInfo from "./components/GiftInfo";
import MusicPlayer from "./components/MusicPlayer";
import Navbar from "./components/Navbar";
import FloatingPetals from "./components/BirdsAnimation";
import Envelope from "./components/Envelope";
import { Heart, Sparkles, Quote, ChevronUp } from "lucide-react";
import { dbService } from "./services/dbService";
import { WEDDING_CONFIG } from "./constants";

const App: React.FC = () => {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [isOpened, setIsOpened] = useState(false);

  useEffect(() => {
    dbService.initializeDemo();

    // Prevent scrolling if not opened
    if (!isOpened) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    const savedTheme = localStorage.getItem("theme") as "light" | "dark";
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle("dark", savedTheme === "dark");
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setTheme("dark");
      document.documentElement.classList.add("dark");
    }

    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -100px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("reveal-active");
          entry.target.classList.remove("opacity-0");
        }
      });
    }, observerOptions);

    if (isOpened) {
      document.querySelectorAll("section").forEach((section) => {
        section.classList.add(
          "opacity-0",
          "transition-all",
          "duration-[1.5s]",
          "ease-out"
        );
        observer.observe(section);
      });
    }

    return () => observer.disconnect();
  }, [isOpened]);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  const handleOpenInvitation = () => {
    setIsOpened(true);
    // Play music globally
    window.dispatchEvent(new CustomEvent("play-wedding-music"));
    // Trigger scroll to start
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen relative transition-colors duration-[1000ms] bg-secondary dark:bg-darkBg selection:bg-accent/30 selection:text-primary overflow-x-hidden">
      {!isOpened && <Envelope onOpen={handleOpenInvitation} />}

      <FloatingPetals />

      <Hero />

      <main className="space-y-0 relative z-10">
        <CoupleProfile />
        <LoveStory />
        <EventDetails />
        <Gallery />
        <RSVPForm />
        <Wishes />
        <GiftInfo />
      </main>

      <MusicPlayer />
      <Navbar theme={theme} toggleTheme={toggleTheme} />

      {/* Cinematic Final Footer Section */}
      <footer className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-white dark:bg-darkSurface transition-colors duration-1000 px-6">
        <div className="absolute inset-0 z-0 opacity-10 dark:opacity-[0.05] flex items-center justify-center pointer-events-none">
          <Heart className="w-[85vw] h-[85vw] stroke-[0.3] animate-pulse-soft" />
        </div>

        <div className="container mx-auto max-w-4xl relative z-10 flex flex-col items-center gap-12 md:gap-24">
          <button
            onClick={scrollToTop}
            className="group flex flex-col items-center gap-4 hover:scale-105 transition-transform duration-500"
          >
            <div className="w-12 h-12 md:w-16 md:h-16 rounded-full border border-accent/40 flex items-center justify-center text-accentDark dark:text-accent group-hover:bg-accent/10 transition-colors shadow-2xl">
              <ChevronUp className="w-6 h-6 md:w-8 md:h-8 animate-bounce" />
            </div>
            <span className="text-[10px] uppercase tracking-luxury font-bold opacity-40 group-hover:opacity-100 transition-opacity">
              Sampai Jumpa di Hari Bahagia Kami
            </span>
          </button>

          <div className="text-center space-y-8 md:space-y-12">
            <Heart className="w-8 h-8 md:w-12 md:h-12 text-accent/60 fill-current mx-auto animate-pulse" />
            <h2 className="text-6xl sm:text-8xl md:text-[12rem] font-serif italic text-slate-900 dark:text-white leading-[0.85] tracking-tighter drop-shadow-xl">
              {WEDDING_CONFIG.couple.bride.name}{" "}
              <span className="text-accent/30">&</span>{" "}
              {WEDDING_CONFIG.couple.groom.name}
            </h2>
            <div className="flex items-center justify-center gap-4 md:gap-6">
              <div className="h-[1px] w-10 md:w-20 bg-accent/30"></div>
              <p className="text-[12px] md:text-[20px] uppercase tracking-[0.4em] font-black text-accentDark dark:text-accent italic">
                11 • 10 • 2026
              </p>
              <div className="h-[1px] w-10 md:w-20 bg-accent/30"></div>
            </div>
          </div>

          <div className="space-y-12 md:space-y-16 text-center">
            <div className="relative inline-block group px-4">
              <Quote className="absolute -top-10 -left-2 md:-top-16 md:-left-12 w-12 h-12 md:w-24 md:h-24 opacity-[0.06] dark:opacity-[0.12] text-accentDark rotate-180 transition-transform duration-1000" />
              <p className="text-lg md:text-3xl font-serif italic text-slate-500 dark:text-slate-400 leading-relaxed max-w-2xl mx-auto text-balance">
                "Terima kasih atas doa dan restu tulus Anda. Kehadiran Anda
                adalah kado terindah bagi awal babak baru kehidupan kami."
              </p>
            </div>

            <div className="pt-16 md:pt-28 border-t border-slate-100 dark:border-white/5 flex flex-col items-center gap-6 md:gap-10">
              <div className="flex items-center gap-3 opacity-50 transition-opacity hover:opacity-100">
                <p className="text-[9px] md:text-[13px] uppercase tracking-luxury font-black italic">
                  Dibuat dengan penuh cinta untuk hari spesial kami
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
```

---

### File: `./src/components/BirdsAnimation.tsx`

```tsx
import React, { useEffect, useState } from "react";

interface Petal {
  id: number;
  left: string;
  delay: string;
  duration: string;
  size: string;
  rotation: string;
}

const FloatingPetals: React.FC = () => {
  const [petals, setPetals] = useState<Petal[]>([]);

  useEffect(() => {
    const petalCount = 15;
    const newPetals = Array.from({ length: petalCount }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * 10}s`,
      duration: `${10 + Math.random() * 10}s`,
      size: `${10 + Math.random() * 20}px`,
      rotation: `${Math.random() * 360}deg`,
    }));
    setPetals(newPetals);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[1] overflow-hidden">
      {petals.map((p) => (
        <div
          key={p.id}
          className="absolute top-[-50px] bg-accent/20 dark:bg-accent/10 rounded-full blur-[1px]"
          style={{
            left: p.left,
            width: p.size,
            height: p.size,
            opacity: 0.6,
            animation: `fall ${p.duration} linear infinite`,
            animationDelay: p.delay,
            transform: `rotate(${p.rotation})`,
          }}
        >
          <div className="w-full h-full rounded-[100%_0%_100%_0%_/_100%_0%_100%_0%] shadow-inner bg-accent/10"></div>
        </div>
      ))}
      <style>{`
        @keyframes fall {
          0% { transform: translateY(-10vh) translateX(0) rotate(0deg); opacity: 0; }
          10% { opacity: 0.6; }
          90% { opacity: 0.6; }
          100% { transform: translateY(110vh) translateX(100px) rotate(720deg); opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default FloatingPetals;
```

---

### File: `./src/components/CoupleProfile.tsx`

```tsx
import React from "react";
import { Instagram, Heart } from "lucide-react";
import { WEDDING_CONFIG } from "../constants";

const CoupleProfile: React.FC = () => {
  const { bride, groom } = WEDDING_CONFIG.couple;

  return (
    <section
      id="couple"
      className="py-24 md:py-40 bg-white dark:bg-darkBg relative transition-colors duration-1000"
    >
      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        <div className="text-center mb-24 md:mb-32 space-y-6">
          <Heart className="w-6 h-6 text-accentDark/30 dark:text-accent/20 mx-auto mb-6 animate-pulse" />
          <h2 className="text-4xl md:text-7xl font-serif italic text-slate-900 dark:text-white tracking-tight">
            Pasangan Berbahagia
          </h2>
          <div className="w-20 h-[1px] bg-accent/30 mx-auto"></div>
          <p className="max-w-2xl mx-auto text-slate-500 dark:text-slate-400 font-light leading-relaxed italic text-lg md:text-xl text-balance">
            "Membangun istana di dunia, melangkah bersama menuju surga-Nya. Atas
            izin Allah SWT, kami mengikat janji suci."
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-20 md:gap-24 items-start">
          {/* Groom */}
          <div className="flex flex-col items-center md:items-end text-center md:text-right space-y-10 group">
            <div className="relative">
              <div className="absolute -inset-4 md:-inset-6 border border-accent/20 dark:border-accent/10 rounded-full scale-105 group-hover:scale-100 transition-transform duration-1000"></div>
              <img
                src={groom.image}
                className="relative w-56 h-56 md:w-[24rem] md:h-[24rem] rounded-full object-cover transition-all duration-1000 shadow-2xl border-4 border-slate-50 dark:border-darkSurface group-hover:brightness-110"
                alt={groom.name}
              />
            </div>
            <div className="space-y-6">
              <h3 className="text-3xl md:text-6xl font-serif font-medium text-slate-900 dark:text-white tracking-tight">
                {groom.fullName}
              </h3>
              <p className="text-slate-500 dark:text-slate-400 tracking-widest text-[10px] md:text-[12px] uppercase font-medium max-w-xs md:max-w-sm ml-auto text-balance">
                {groom.parents}
              </p>
              <a
                href={`https://instagram.com/${groom.instagram}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-slate-50 dark:bg-white/5 text-slate-400 dark:text-accent/50 hover:text-accentDark dark:hover:text-white transition-all border border-slate-100 dark:border-white/5"
              >
                <Instagram className="w-3 h-3" />
                <span className="text-[9px] font-bold tracking-widest uppercase">
                  @{groom.instagram}
                </span>
              </a>
            </div>
          </div>

          {/* Bride */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-10 group">
            <div className="relative">
              <div className="absolute -inset-4 md:-inset-6 border border-accent/20 dark:border-accent/10 rounded-full scale-105 group-hover:scale-100 transition-transform duration-1000"></div>
              <img
                src={bride.image}
                className="relative w-56 h-56 md:w-[24rem] md:h-[24rem] rounded-full object-cover transition-all duration-1000 shadow-2xl border-4 border-slate-50 dark:border-darkSurface group-hover:brightness-110"
                alt={bride.name}
              />
            </div>
            <div className="space-y-6">
              <h3 className="text-3xl md:text-6xl font-serif font-medium text-slate-900 dark:text-white tracking-tight">
                {bride.fullName}
              </h3>
              <p className="text-slate-500 dark:text-slate-400 tracking-widest text-[10px] md:text-[12px] uppercase font-medium max-w-xs md:max-w-sm text-balance">
                {bride.parents}
              </p>
              <a
                href={`https://instagram.com/${bride.instagram}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-slate-50 dark:bg-white/5 text-slate-400 dark:text-accent/50 hover:text-accentDark dark:hover:text-white transition-all border border-slate-100 dark:border-white/5"
              >
                <Instagram className="w-3 h-3" />
                <span className="text-[9px] font-bold tracking-widest uppercase">
                  @{bride.instagram}
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CoupleProfile;
```

---

### File: `./src/components/Envelope.tsx`

```tsx
import React, { useState, useEffect } from "react";
import { MailOpen, Heart, Sparkles, Music } from "lucide-react";
import { WEDDING_CONFIG } from "../constants";

interface EnvelopeProps {
  onOpen: () => void;
}

const Envelope: React.FC<EnvelopeProps> = ({ onOpen }) => {
  const [guestName, setGuestName] = useState<string>("");
  const [isAnimate, setIsAnimate] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const to = params.get("to");
    if (to) setGuestName(to);

    setTimeout(() => setIsAnimate(true), 300);
  }, []);

  const handleOpenClick = () => {
    setIsExiting(true);
    // Memberikan waktu untuk animasi keluar sebelum unmount
    setTimeout(() => {
      onOpen();
    }, 800);
  };

  return (
    <div
      className={`fixed inset-0 z-[2000] flex items-center justify-center overflow-hidden bg-darkBg transition-all duration-1000 ease-in-out ${
        isExiting ? "opacity-0 scale-110 pointer-events-none" : "opacity-100"
      }`}
    >
      {/* Background Layer with cinematic parallax effect */}
      <div className="absolute inset-0 scale-110">
        <img
          src="https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070&auto=format&fit=crop"
          className="w-full h-full object-cover opacity-30 animate-subtle-zoom"
          alt="Wedding Backdrop"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-darkBg/80 via-darkBg/20 to-darkBg/90"></div>
        <div className="absolute inset-0 backdrop-blur-[2px]"></div>
      </div>

      {/* Floating Ornaments */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[10%] left-[5%] w-32 h-32 bg-accent/5 rounded-full blur-3xl animate-pulse-soft"></div>
        <div className="absolute bottom-[10%] right-[5%] w-48 h-48 bg-accentDark/10 rounded-full blur-3xl animate-pulse-soft [animation-delay:2s]"></div>
      </div>

      <div
        className={`relative z-10 w-full max-w-2xl px-6 text-center transition-all duration-1000 transform ${
          isAnimate ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"
        }`}
      >
        <div className="space-y-12">
          {/* Header Title */}
          <div className="space-y-6">
            <div className="flex items-center justify-center gap-4">
              <div className="h-[1px] w-12 md:w-24 bg-gradient-to-r from-transparent to-accent/40"></div>
              <Sparkles className="w-5 h-5 text-accent/60 animate-spin-slow" />
              <div className="h-[1px] w-12 md:w-24 bg-gradient-to-l from-transparent to-accent/40"></div>
            </div>

            <div className="space-y-2">
              <span className="text-white/40 tracking-[0.5em] text-[10px] md:text-[12px] uppercase font-light block">
                The Wedding of
              </span>
              <h1 className="text-white text-6xl md:text-9xl font-serif italic leading-none tracking-tighter">
                {WEDDING_CONFIG.couple.bride.name}
                <span className="text-accent/30 mx-4 md:mx-8 font-sans not-italic">
                  &
                </span>
                {WEDDING_CONFIG.couple.groom.name}
              </h1>
            </div>
          </div>

          {/* Elegant Guest Card */}
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-accent/20 to-accentDark/20 rounded-[3rem] blur opacity-30 group-hover:opacity-60 transition duration-1000"></div>
            <div className="relative frosted-glass p-10 md:p-16 rounded-[2.8rem] shadow-2xl border border-white/10 space-y-8 overflow-hidden">
              {/* Subtle texture in the card */}
              <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay">
                <img
                  src="https://www.transparenttextures.com/patterns/paper-fibers.png"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="space-y-3">
                <p className="text-[11px] md:text-[13px] uppercase tracking-[0.3em] text-accent/80 font-bold">
                  Kepada Yth. Bapak/Ibu/Sdr/i:
                </p>
                <div className="h-[1px] w-16 bg-gradient-to-r from-transparent via-accent/30 to-transparent mx-auto"></div>
              </div>

              <div className="py-2">
                <h2 className="text-4xl md:text-6xl font-serif italic text-white tracking-tight break-words drop-shadow-sm">
                  {guestName || "Tamu Undangan"}
                </h2>
              </div>

              <div className="pt-2">
                <p className="text-[10px] md:text-[12px] text-white/40 italic font-light max-w-xs mx-auto leading-relaxed">
                  Kami mengundang Anda untuk merayakan kebahagiaan kami dalam
                  ikatan suci pernikahan.
                </p>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="flex flex-col items-center gap-6">
            <button
              onClick={handleOpenClick}
              className="group relative inline-flex items-center gap-4 px-12 py-6 bg-white text-primary rounded-full font-bold uppercase tracking-[0.2em] text-[11px] md:text-[13px] hover:bg-accent hover:text-darkBg transition-all duration-700 shadow-[0_15px_40px_-10px_rgba(255,255,255,0.3)] active:scale-95 overflow-hidden"
            >
              <div className="relative z-10 flex items-center gap-3">
                <MailOpen className="w-5 h-5 group-hover:scale-110 transition-transform duration-500" />
                Buka Undangan
              </div>
              <div className="absolute inset-0 bg-accent translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
            </button>
          </div>
        </div>
      </div>

      {/* Visual Border */}
      <div className="absolute inset-4 md:inset-8 border border-white/5 rounded-[2rem] md:rounded-[4rem] pointer-events-none"></div>

      <style>{`
        .animate-spin-slow {
          animation: spin 8s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default Envelope;
```

---

### File: `./src/components/EventDetails.tsx`

```tsx
import React, { useState } from "react";
import {
  Calendar,
  Clock,
  MapPin,
  ExternalLink,
  CalendarPlus,
  Copy,
  Check,
  ChevronDown,
  Sparkles,
  Heart,
} from "lucide-react";
import { WEDDING_CONFIG } from "../constants";
import { generateGoogleCalendarUrl, downloadICS } from "../utils/calendarUtils";

const EventDetails: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<
    "akad" | "resepsi" | null
  >(null);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(WEDDING_CONFIG.venue.address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const mapUrl = `https://maps.google.com/maps?q=${WEDDING_CONFIG.venue.latitude},${WEDDING_CONFIG.venue.longitude}&t=&z=15&ie=UTF8&iwloc=&output=embed`;

  const handleCalendar = (
    type: "google" | "ics",
    eventType: "akad" | "resepsi"
  ) => {
    const event = {
      title: `${WEDDING_CONFIG.events[eventType].title} ${WEDDING_CONFIG.couple.bride.name} & ${WEDDING_CONFIG.couple.groom.name}`,
      description: `Menghadiri ${WEDDING_CONFIG.events[eventType].title} pernikahan ${WEDDING_CONFIG.couple.bride.name} & ${WEDDING_CONFIG.couple.groom.name}.`,
      location: WEDDING_CONFIG.venue.address,
      startTime: WEDDING_CONFIG.events[eventType].startDateTime,
      endTime: WEDDING_CONFIG.events[eventType].endDateTime,
    };

    if (type === "google") {
      window.open(generateGoogleCalendarUrl(event), "_blank");
    } else {
      downloadICS(event);
    }
    setActiveDropdown(null);
  };

  return (
    <section
      id="event"
      className="py-20 md:py-40 bg-secondary/30 dark:bg-darkBg transition-colors duration-1000 px-4 md:px-6"
    >
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16 md:mb-24 space-y-4 md:space-y-6">
          <div className="flex items-center justify-center gap-4">
            <div className="h-[1px] w-8 md:w-12 bg-accentDark/20 dark:bg-accent/20"></div>
            <Sparkles className="w-5 h-5 md:w-6 md:h-6 text-accentDark dark:text-accent animate-pulse" />
            <div className="h-[1px] w-8 md:w-12 bg-accentDark/20 dark:bg-accent/20"></div>
          </div>
          <h2 className="text-4xl md:text-9xl font-serif italic text-slate-900 dark:text-white tracking-tight">
            The Celebration
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-base md:text-2xl max-w-xl mx-auto italic font-light text-balance px-4">
            Merupakan kehormatan bagi kami jika Anda berkenan hadir.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 md:gap-14 mb-16 md:mb-20">
          {["akad", "resepsi"].map((type) => {
            const ev = WEDDING_CONFIG.events[type as "akad" | "resepsi"];
            return (
              <div
                key={type}
                className="editorial-card relative bg-white dark:bg-darkSurface rounded-[2.5rem] md:rounded-[4rem] p-8 md:p-20 flex flex-col items-center text-center space-y-8 md:space-y-12 group overflow-visible"
              >
                <div className="absolute -top-4 -right-4 md:-top-6 md:-right-6 w-12 h-12 md:w-16 md:h-16 bg-accentDark/10 dark:bg-accent/10 rounded-full flex items-center justify-center text-accentDark dark:text-accent animate-float border border-white/20 dark:border-white/5 backdrop-blur-md z-10">
                  {type === "akad" ? (
                    <Heart className="w-5 h-5 md:w-7 md:h-7 fill-current" />
                  ) : (
                    <Sparkles className="w-5 h-5 md:w-7 md:h-7" />
                  )}
                </div>

                <div className="space-y-2 md:space-y-4">
                  <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-luxury text-accentDark dark:text-accent">
                    Our Sacred Day
                  </span>
                  <h3 className="text-3xl md:text-7xl font-serif italic text-slate-900 dark:text-white leading-tight">
                    {ev.title}
                  </h3>
                </div>

                <div className="space-y-6 md:space-y-8 w-full py-8 md:py-10 border-y border-slate-100 dark:border-white/5">
                  <div className="flex flex-col items-center justify-center gap-3 text-xl md:text-3xl font-serif italic text-slate-700 dark:text-slate-100">
                    <div className="flex items-center gap-3 md:gap-4">
                      <Calendar className="w-5 h-5 md:w-6 md:h-6 text-accentDark dark:text-accent" />
                      <span>
                        {ev.day}, {ev.date}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-center gap-3 md:gap-4 text-[11px] md:text-[12px] uppercase tracking-editorial font-bold text-slate-400 dark:text-slate-500">
                    <Clock className="w-4 h-4 md:w-5 md:h-5 text-accentDark dark:text-accent" />
                    <span>
                      {ev.startTime} — {ev.endTime} WIB
                    </span>
                  </div>
                </div>

                <div className="w-full relative">
                  <button
                    onClick={() =>
                      setActiveDropdown(
                        activeDropdown === type ? null : (type as any)
                      )
                    }
                    className="w-full flex items-center justify-center gap-3 md:gap-5 bg-primary dark:bg-accentDark text-white py-4 md:py-6 rounded-2xl md:rounded-3xl hover:shadow-2xl transition-all active:scale-95 text-[10px] md:text-[11px] font-bold uppercase tracking-editorial"
                  >
                    <CalendarPlus className="w-4 h-4 md:w-5 md:h-5" />
                    Save The Date
                    <ChevronDown
                      className={`w-3 h-3 md:w-4 md:h-4 transition-transform duration-500 ${
                        activeDropdown === type ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {activeDropdown === type && (
                    <div className="absolute top-full left-0 right-0 mt-3 md:mt-4 frosted-glass rounded-[1.5rem] md:rounded-[2rem] shadow-2xl z-[50] overflow-hidden animate-reveal p-2 md:p-3 border border-slate-200 dark:border-white/10">
                      <button
                        onClick={() => handleCalendar("google", type as any)}
                        className="w-full text-left px-6 py-4 md:px-8 md:py-6 hover:bg-slate-50 dark:hover:bg-white/5 flex items-center gap-4 md:gap-5 rounded-xl md:rounded-2xl transition-colors text-slate-800 dark:text-white"
                      >
                        <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-accentDark dark:bg-accent animate-pulse"></div>
                        <span className="font-bold text-[10px] md:text-[11px] uppercase tracking-luxury">
                          Google Calendar
                        </span>
                      </button>
                      <button
                        onClick={() => handleCalendar("ics", type as any)}
                        className="w-full text-left px-6 py-4 md:px-8 md:py-6 hover:bg-slate-50 dark:hover:bg-white/5 flex items-center gap-4 md:gap-5 rounded-xl md:rounded-2xl transition-colors text-slate-800 dark:text-white"
                      >
                        <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-slate-300 dark:bg-slate-600"></div>
                        <span className="font-bold text-[10px] md:text-[11px] uppercase tracking-luxury">
                          Apple / Outlook
                        </span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className="editorial-card rounded-[2.5rem] md:rounded-[4rem] p-8 md:p-20 space-y-12 md:space-y-16">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 md:gap-12">
            <div className="space-y-6">
              <div className="flex items-start md:items-center gap-5 md:gap-8">
                <div className="w-16 h-16 md:w-20 md:h-20 bg-slate-50 dark:bg-white/5 rounded-2xl md:rounded-3xl flex items-center justify-center text-accentDark dark:text-accent flex-shrink-0 border border-slate-100 dark:border-white/10 shadow-lg">
                  <MapPin className="w-8 h-8 md:w-10 md:h-10" />
                </div>
                <div className="space-y-1 md:space-y-2">
                  <h4 className="font-serif italic text-3xl md:text-6xl text-slate-900 dark:text-white leading-tight tracking-tight">
                    {WEDDING_CONFIG.venue.name}
                  </h4>
                  <p className="text-slate-500 dark:text-slate-400 text-base md:text-2xl font-light italic leading-snug">
                    {WEDDING_CONFIG.venue.address}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 md:gap-5 w-full lg:w-auto">
              <button
                onClick={copyToClipboard}
                className="flex items-center justify-center gap-3 md:gap-4 px-6 md:px-10 py-4 md:py-5 rounded-xl md:rounded-[2rem] border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/5 transition-all font-bold text-[10px] md:text-[11px] uppercase tracking-editorial w-full sm:w-1/2 lg:w-auto"
              >
                {copied ? (
                  <Check className="w-4 h-4 md:w-5 md:h-5 text-green-500" />
                ) : (
                  <Copy className="w-4 h-4 md:w-5 md:h-5 text-accentDark dark:text-accent" />
                )}
                {copied ? "Address Copied" : "Copy Address"}
              </button>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${WEDDING_CONFIG.venue.latitude},${WEDDING_CONFIG.venue.longitude}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 md:gap-4 px-6 md:px-12 py-4 md:py-5 bg-primary dark:bg-white text-white dark:text-primary rounded-xl md:rounded-[2rem] hover:shadow-2xl transition-all font-bold text-[10px] md:text-[11px] uppercase tracking-editorial w-full sm:w-1/2 lg:w-auto"
              >
                <ExternalLink className="w-4 h-4 md:w-5 md:h-5" /> Open In Maps
              </a>
            </div>
          </div>

          <div className="rounded-[1.5rem] md:rounded-[3.5rem] overflow-hidden shadow-2xl border border-slate-100 dark:border-white/10 h-[350px] md:h-[600px] relative">
            <iframe
              src={mapUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              className="grayscale-[0.3] contrast-125 dark:opacity-80 transition-all hover:grayscale-0"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
            <div className="absolute inset-0 pointer-events-none border-[6px] md:border-[12px] border-white/5 dark:border-darkSurface/5"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventDetails;
```

---

### File: `./src/components/Gallery.tsx`

```tsx
import React, { useState, useEffect } from "react";
import {
  X,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Sparkles,
  Image as ImageIcon,
} from "lucide-react";
import { GALLERY_IMAGES } from "../constants";

const Gallery: React.FC = () => {
  const [selectedImg, setSelectedImg] = useState<number | null>(null);
  const [isClosing, setIsClosing] = useState(false);

  const openLightbox = (index: number) => {
    setSelectedImg(index);
    setIsClosing(false);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setIsClosing(true);
    setTimeout(() => {
      setSelectedImg(null);
      setIsClosing(false);
      document.body.style.overflow = "unset";
    }, 400);
  };

  const navigate = (direction: "prev" | "next", e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (selectedImg === null) return;
    if (direction === "prev") {
      setSelectedImg(
        selectedImg === 0 ? GALLERY_IMAGES.length - 1 : selectedImg - 1
      );
    } else {
      setSelectedImg(
        selectedImg === GALLERY_IMAGES.length - 1 ? 0 : selectedImg + 1
      );
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImg === null) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") navigate("prev");
      if (e.key === "ArrowRight") navigate("next");
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedImg]);

  return (
    <section
      id="gallery"
      className="py-24 md:py-48 bg-white dark:bg-darkBg transition-colors duration-1000"
    >
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center mb-20 md:mb-32 space-y-4 md:space-y-8">
          <div className="flex items-center justify-center gap-4 opacity-30">
            <div className="h-[1px] w-8 md:w-16 bg-accentDark dark:bg-accent"></div>
            <ImageIcon className="w-5 h-5 md:w-8 md:h-8" />
            <div className="h-[1px] w-8 md:w-16 bg-accentDark dark:bg-accent"></div>
          </div>
          <h2 className="text-5xl md:text-9xl font-serif italic text-slate-900 dark:text-white tracking-tight">
            Our Gallery
          </h2>
          <p className="text-slate-400 dark:text-slate-500 tracking-luxury text-[10px] md:text-[13px] uppercase font-black italic text-balance">
            Momen-momen indah yang terpatri abadi dalam perjalanan cinta kami
          </p>
        </div>

        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 md:gap-10 space-y-6 md:space-y-10">
          {GALLERY_IMAGES.map((src, index) => (
            <div
              key={index}
              className="relative group overflow-hidden rounded-[2rem] md:rounded-[3.5rem] cursor-pointer shadow-xl hover:shadow-accent/20 transition-all duration-700 hover:-translate-y-3 border border-slate-100 dark:border-white/5 bg-slate-50 dark:bg-darkSurface"
              onClick={() => openLightbox(index)}
            >
              <img
                src={src}
                alt={`Wedding Moment ${index + 1}`}
                className="w-full h-auto transform group-hover:scale-105 transition-transform duration-[1.5s] ease-out object-cover grayscale-[0.2] group-hover:grayscale-0"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-primary/10 dark:bg-darkBg/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center backdrop-blur-[1px]">
                <div className="w-14 h-14 md:w-20 md:h-20 bg-white/10 backdrop-blur-2xl rounded-full flex items-center justify-center scale-75 group-hover:scale-100 transition-transform duration-500 border border-white/30">
                  <Maximize2 className="text-white w-6 h-6 md:w-8 md:h-8" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Symmetrical & Cinematic Lightbox */}
      {selectedImg !== null && (
        <div
          className={`fixed inset-0 z-[1000] flex items-center justify-center transition-all duration-500 overflow-hidden ${
            isClosing ? "opacity-0" : "opacity-100"
          }`}
        >
          {/* Deep Immersive Backdrop */}
          <div
            className="absolute inset-0 bg-darkBg/95 backdrop-blur-3xl transition-opacity duration-700"
            onClick={closeLightbox}
          ></div>

          {/* Symmetrical Image Frame - Absolute Center */}
          <div className="relative z-[1010] w-full h-full flex items-center justify-center pointer-events-none">
            <div className="relative flex items-center justify-center max-w-[95vw] max-h-[75vh] md:max-h-[85vh]">
              <img
                src={GALLERY_IMAGES[selectedImg]}
                alt="Lightbox Fullscreen"
                className={`max-w-full max-h-full object-contain rounded-[1.5rem] md:rounded-[4rem] shadow-[0_60px_120px_rgba(0,0,0,0.9)] border border-white/10 transition-all duration-700 pointer-events-auto ${
                  isClosing
                    ? "scale-90 blur-xl translate-y-20"
                    : "scale-100 blur-0 animate-reveal"
                }`}
              />

              {/* Perfectly Centered Arrows - Relative to Screen Edges */}
              <div className="fixed left-4 md:left-12 top-1/2 -translate-y-1/2 pointer-events-auto z-[1020]">
                <button
                  onClick={(e) => navigate("prev", e)}
                  className="w-12 h-12 md:w-24 md:h-24 bg-white/5 hover:bg-white/15 backdrop-blur-2xl border border-white/10 rounded-full flex items-center justify-center text-white/40 hover:text-white transition-all hover:scale-110 active:scale-90 group"
                >
                  <ChevronLeft className="w-6 h-6 md:w-12 md:h-12 transition-transform group-hover:-translate-x-1" />
                </button>
              </div>

              <div className="fixed right-4 md:right-12 top-1/2 -translate-y-1/2 pointer-events-auto z-[1020]">
                <button
                  onClick={(e) => navigate("next", e)}
                  className="w-12 h-12 md:w-24 md:h-24 bg-white/5 hover:bg-white/15 backdrop-blur-2xl border border-white/10 rounded-full flex items-center justify-center text-white/40 hover:text-white transition-all hover:scale-110 active:scale-90 group"
                >
                  <ChevronRight className="w-6 h-6 md:w-12 md:h-12 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          </div>

          {/* Independent UI Overlays (Symmetrical) */}
          <div className="absolute top-6 md:top-12 right-6 md:right-12 z-[1030]">
            <button
              onClick={closeLightbox}
              className="w-12 h-12 md:w-20 md:h-20 rounded-full bg-white/5 hover:bg-white/20 flex items-center justify-center text-white/60 hover:text-white transition-all hover:rotate-90 border border-white/10 active:scale-95"
            >
              <X className="w-6 h-6 md:w-10 md:h-10" />
            </button>
          </div>

          {/* Symmetrical Bottom Caption - Pinned to Viewport, not Image */}
          <div className="absolute bottom-8 md:bottom-16 left-0 right-0 z-[1030] flex flex-col items-center pointer-events-none">
            <div className="frosted-glass px-8 py-4 md:px-14 md:py-6 rounded-full border border-white/10 shadow-2xl flex items-center gap-6 md:gap-10 animate-reveal [animation-delay:400ms]">
              <div className="flex items-center gap-4">
                <div className="h-[1px] w-6 md:w-12 bg-white/20"></div>
                <p className="font-serif italic text-base md:text-4xl text-white tracking-[0.2em] md:tracking-[0.4em] uppercase">
                  Moment{" "}
                  <span className="font-sans font-black text-accent">
                    {selectedImg + 1}
                  </span>{" "}
                  / {GALLERY_IMAGES.length}
                </p>
                <div className="h-[1px] w-6 md:w-12 bg-white/20"></div>
              </div>
              <Sparkles className="w-4 h-4 md:w-6 md:h-6 text-accent/50 animate-pulse hidden md:block" />
            </div>
            <div className="mt-4 md:mt-8 flex items-center gap-2 opacity-30">
              <span className="text-[7px] md:text-[10px] text-white uppercase tracking-luxury font-bold italic">
                The Wedding of Fey & Yaya
              </span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery;
```

---

### File: `./src/components/GiftInfo.tsx`

```tsx
import React, { useState } from "react";
import { Gift, Copy, Check, MapPin, CreditCard, Sparkles } from "lucide-react";
import { BANK_ACCOUNTS, WEDDING_CONFIG } from "../constants";

const GiftInfo: React.FC = () => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <section
      id="gift"
      className="py-16 md:py-40 bg-white dark:bg-darkBg transition-colors duration-1000"
    >
      <div className="container mx-auto px-4 md:px-6 max-w-6xl">
        <div className="text-center mb-12 md:mb-24 space-y-4 md:space-y-6">
          <div className="w-12 h-12 md:w-20 md:h-20 bg-slate-50 dark:bg-white/5 text-accentDark dark:text-accent rounded-xl md:rounded-[2rem] flex items-center justify-center mx-auto mb-6 md:mb-12 border border-slate-100 dark:border-white/5 shadow-md">
            <Gift className="w-6 h-6 md:w-10 md:h-10" />
          </div>
          <h2 className="text-4xl md:text-9xl font-serif italic text-slate-900 dark:text-white tracking-tight">
            Kado Pernikahan
          </h2>
          <div className="w-16 h-[1px] bg-accent/30 mx-auto"></div>
          <p className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto leading-relaxed italic text-balance font-light text-base md:text-2xl">
            Doa restu Anda adalah karunia terindah bagi kami. Jika bermaksud
            memberikan tanda kasih, dapat melalui:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-14 mb-10 md:mb-20">
          {BANK_ACCOUNTS.map((acc, idx) => (
            <div
              key={idx}
              className="editorial-card p-8 md:p-20 rounded-[1.5rem] md:rounded-[4.5rem] border border-slate-100 dark:border-white/5 space-y-6 md:space-y-12 relative overflow-hidden group shadow-sm hover:shadow-lg transition-all"
            >
              <CreditCard className="absolute -top-10 -right-10 md:-top-16 md:-right-16 w-32 h-32 md:w-64 md:h-64 text-accentDark/5 dark:text-accent/5 rotate-12 group-hover:scale-110 transition-transform duration-[3s] pointer-events-none" />

              <div className="relative z-10 space-y-6 md:space-y-12 text-center md:text-left">
                <div className="space-y-3 md:space-y-6">
                  <div className="flex items-center justify-center md:justify-start gap-2.5">
                    <div className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse"></div>
                    <p className="text-[9px] md:text-[12px] font-bold text-accentDark dark:text-accent uppercase tracking-luxury">
                      {acc.bank}
                    </p>
                  </div>
                  <p className="text-2xl md:text-7xl font-serif text-slate-900 dark:text-white tracking-tighter leading-none break-all">
                    {acc.number}
                  </p>
                  <p className="text-slate-400 dark:text-slate-500 font-medium tracking-editorial text-[10px] md:text-[14px] uppercase italic">
                    A/N {acc.name}
                  </p>
                </div>

                <button
                  onClick={() => copyToClipboard(acc.number, `bank-${idx}`)}
                  className={`inline-flex items-center gap-2.5 md:gap-5 px-6 py-3.5 md:px-12 md:py-6 rounded-full transition-all text-[9px] md:text-[12px] font-bold uppercase tracking-editorial shadow-md w-full md:w-auto justify-center ${
                    copiedId === `bank-${idx}`
                      ? "bg-green-500 text-white"
                      : "bg-primary dark:bg-white text-white dark:text-primary active:scale-95"
                  }`}
                >
                  {copiedId === `bank-${idx}` ? (
                    <Check className="w-3.5 h-3.5 md:w-5 md:h-5" />
                  ) : (
                    <Copy className="w-3.5 h-3.5 md:w-5 md:h-5" />
                  )}
                  {copiedId === `bank-${idx}` ? "Berhasil" : "Salin Nomor"}
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="editorial-card p-6 md:p-20 rounded-[1.5rem] md:rounded-[5rem] flex flex-col md:flex-row items-center gap-6 md:gap-14 text-center md:text-left transition-all group duration-1000 relative overflow-hidden border border-slate-100 dark:border-white/5 shadow-md">
          <div className="absolute inset-0 bg-gradient-to-r from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>

          <div className="w-16 h-16 md:w-28 md:h-28 bg-slate-50 dark:bg-white/5 text-accentDark dark:text-accent rounded-full flex items-center justify-center flex-shrink-0 animate-float border border-slate-100 dark:border-white/10 shadow-sm">
            <MapPin className="w-6 h-6 md:w-12 md:h-12" />
          </div>

          <div className="flex-grow space-y-1.5 md:space-y-4 relative z-10">
            <div className="flex items-center justify-center md:justify-start gap-2.5 text-accentDark dark:text-accent">
              <Sparkles className="w-3.5 h-3.5 md:w-5 md:h-5" />
              <h4 className="font-serif italic text-xl md:text-5xl tracking-tight">
                Kirim Kado Fisik
              </h4>
            </div>
            <p className="text-slate-500 dark:text-slate-400 text-sm md:text-2xl font-light leading-relaxed italic text-balance">
              {WEDDING_CONFIG.venue.address}
            </p>
          </div>

          <button
            onClick={() =>
              copyToClipboard(WEDDING_CONFIG.venue.address, "address-gift")
            }
            className={`inline-flex items-center gap-3 px-8 py-3.5 md:px-14 md:py-6 rounded-xl md:rounded-[2.5rem] transition-all font-bold text-[9px] md:text-[12px] uppercase tracking-luxury shadow-md w-full md:w-auto justify-center relative z-10 ${
              copiedId === "address-gift"
                ? "bg-green-500 text-white"
                : "bg-primary dark:bg-white text-white dark:text-primary active:scale-95"
            }`}
          >
            {copiedId === "address-gift" ? (
              <Check className="w-4 h-4 md:w-6 md:h-6" />
            ) : (
              <Copy className="w-4 h-4 md:w-6 md:h-6" />
            )}
            Salin Alamat
          </button>
        </div>
      </div>
    </section>
  );
};

export default GiftInfo;
```

---

### File: `./src/components/Hero.tsx`

```tsx
import React, { useState, useEffect } from "react";
import { ChevronDown, Sparkles } from "lucide-react";
import { WEDDING_CONFIG } from "../constants";

const Hero: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [guestName, setGuestName] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setGuestName(params.get("to"));

    const timer = setInterval(() => {
      const distance =
        WEDDING_CONFIG.events.akad.startDateTime.getTime() -
        new Date().getTime();
      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor(
            (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          ),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      }
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleScrollToContent = () => {
    // Hanya scroll, tidak memicu musik lagi karena sudah dilakukan di Envelope
    document.getElementById("couple")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=2069&auto=format&fit=crop"
          className="w-full h-full object-cover animate-subtle-zoom"
          alt="Wedding Backdrop"
        />
        {/* Overlay yang selalu memberikan kegelapan sedikit agar teks putih di atasnya terbaca */}
        <div className="absolute inset-0 bg-slate-950/40 dark:bg-slate-950/60 backdrop-blur-[0.5px]"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/40 via-transparent to-slate-950/80"></div>
      </div>

      <div className="z-10 container mx-auto px-6 flex flex-col items-center text-center">
        <div className="animate-reveal [animation-delay:200ms] space-y-4 md:space-y-10 w-full">
          <div className="flex items-center justify-center gap-3 md:gap-4">
            <div className="h-[1px] w-6 md:w-20 bg-white/30"></div>
            <span className="text-white/80 tracking-luxury text-[8px] md:text-[12px] uppercase font-light">
              The Wedding Celebration
            </span>
            <div className="h-[1px] w-6 md:w-20 bg-white/30"></div>
          </div>

          <h1 className="text-white text-5xl sm:text-7xl md:text-[9rem] font-serif italic leading-tight md:leading-none tracking-tight break-words">
            {WEDDING_CONFIG.couple.bride.name}
            <span className="text-accent/30 mx-2 md:mx-6">&</span>
            {WEDDING_CONFIG.couple.groom.name}
          </h1>

          <div className="space-y-3 md:space-y-6">
            <p className="text-white font-serif italic text-xl sm:text-2xl md:text-5xl tracking-widest opacity-90">
              {WEDDING_CONFIG.events.akad.date}
            </p>
            <div className="flex items-center justify-center gap-3 md:gap-4">
              <Sparkles className="w-3 h-3 md:w-4 md:h-4 text-accent/40 animate-pulse" />
              <p className="text-accent/70 text-[9px] md:text-[13px] uppercase tracking-widest font-medium">
                Jakarta, Indonesia
              </p>
              <Sparkles className="w-3 h-3 md:w-4 md:h-4 text-accent/40 animate-pulse" />
            </div>
          </div>
        </div>

        {/* Improved Countdown Section with Theme Awareness */}
        <div className="mt-8 md:mt-16 animate-reveal [animation-delay:600ms] flex items-center justify-center gap-4 md:gap-14 frosted-glass px-6 md:px-10 py-5 md:py-8 rounded-[1.5rem] md:rounded-[2.2rem] shadow-2xl border border-white/40 dark:border-white/10">
          {Object.entries(timeLeft).map(([label, value]) => (
            <div
              key={label}
              className="flex flex-col items-center min-w-[50px] md:min-w-[80px]"
            >
              <span className="text-2xl md:text-6xl font-serif font-bold text-slate-900 dark:text-white leading-none tracking-tighter">
                {String(value).padStart(2, "0")}
              </span>
              <span className="text-[7px] md:text-[11px] uppercase tracking-[0.2em] text-accentDark/80 dark:text-accent/60 font-black mt-1 md:mt-3">
                {label}
              </span>
            </div>
          ))}
        </div>

        <button
          onClick={handleScrollToContent}
          className="mt-12 md:mt-20 group flex flex-col items-center gap-3 md:gap-4 text-white/40 hover:text-white transition-all duration-500"
        >
          <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:border-accent group-hover:bg-accent/10 transition-all shadow-lg backdrop-blur-sm">
            <ChevronDown className="w-4 h-4 md:w-5 md:h-5 animate-bounce" />
          </div>
          <span className="text-[8px] md:text-[9px] uppercase tracking-luxury font-bold opacity-50 group-hover:opacity-100">
            Lihat Detail
          </span>
        </button>
      </div>
    </section>
  );
};

export default Hero;
```

---

### File: `./src/components/LoveStory.tsx`

```tsx
import React from "react";
import { Heart, Sparkles } from "lucide-react";
import { LOVE_STORY } from "../constants";

const LoveStory: React.FC = () => {
  return (
    <section
      id="story"
      className="py-24 md:py-40 bg-slate-50 dark:bg-darkBg relative overflow-hidden transition-colors duration-1000"
    >
      <div className="container mx-auto px-6 max-w-5xl relative z-10">
        <div className="text-center mb-24 md:mb-32 space-y-6">
          <Sparkles className="w-6 h-6 text-accentDark dark:text-accent/30 mx-auto mb-4 animate-pulse" />
          <h2 className="text-5xl md:text-8xl font-serif italic text-slate-900 dark:text-white tracking-tight">
            Kisah Kami
          </h2>
          <div className="w-20 h-[1px] bg-accent/20 mx-auto"></div>
          <p className="text-slate-500 dark:text-slate-400 text-[11px] uppercase tracking-[0.5em] font-bold">
            Perjalanan dua hati menjadi satu tujuan
          </p>
        </div>

        <div className="relative">
          {/* Subtle Vertical Line */}
          <div className="absolute left-1/2 -translate-x-1/2 h-full w-[1px] bg-slate-200 dark:bg-white/10 hidden md:block"></div>

          <div className="space-y-16 md:space-y-24">
            {LOVE_STORY.map((story, index) => (
              <div
                key={index}
                className={`relative flex flex-col md:flex-row items-center gap-12 ${
                  index % 2 === 0 ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* Center Indicator */}
                <div className="absolute left-1/2 -translate-x-1/2 hidden md:flex items-center justify-center w-6 h-6 bg-white dark:bg-darkSurface rounded-full border-2 border-accent/20 dark:border-accent shadow-sm z-10 transition-colors duration-1000">
                  <div className="w-1.5 h-1.5 bg-accentDark dark:bg-accent rounded-full animate-pulse"></div>
                </div>

                <div
                  className={`w-full md:w-[42%] p-10 md:p-14 rounded-[3rem] editorial-card shadow-2xl ${
                    index % 2 === 0 ? "md:text-right" : "md:text-left"
                  }`}
                >
                  <span className="text-[11px] font-bold tracking-[0.4em] text-accentDark dark:text-accent uppercase mb-6 block">
                    {story.date}
                  </span>
                  <h3 className="text-3xl md:text-4xl font-serif font-bold text-slate-800 dark:text-slate-100 mb-5 italic tracking-tight">
                    {story.title}
                  </h3>
                  <p className="text-slate-500 dark:text-slate-400 leading-relaxed font-light text-base md:text-lg italic">
                    {story.desc}
                  </p>
                  <div
                    className={`mt-8 flex ${
                      index % 2 === 0 ? "justify-end" : "justify-start"
                    }`}
                  >
                    <Heart className="w-4 h-4 text-accent/20" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Decorative large text background */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 text-[20rem] font-serif italic text-primary/5 dark:text-white/5 whitespace-nowrap pointer-events-none -z-0 -rotate-12 translate-x-[-20%]">
        Our Story Our Story Our Story
      </div>
    </section>
  );
};

export default LoveStory;
```

---

### File: `./src/components/MusicPlayer.tsx`

```tsx
import React, { useEffect, useRef } from "react";

const MusicPlayer: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const handlePlay = () => {
      if (audioRef.current) {
        audioRef.current.play().catch((err) => {
          console.warn(
            "Autoplay dicegah oleh browser, membutuhkan interaksi pengguna.",
            err
          );
        });
      }
    };

    // Musik hanya akan diputar melalui event kustom ini
    window.addEventListener("play-wedding-music", handlePlay);

    return () => {
      window.removeEventListener("play-wedding-music", handlePlay);
    };
  }, []);

  return (
    <audio
      ref={audioRef}
      src="https://www.bensound.com/bensound-music/bensound-love.mp3"
      loop
      preload="auto"
      className="hidden"
    />
  );
};

export default MusicPlayer;
```

---

### File: `./src/components/Navbar.tsx`

```tsx
import React, { useState, useEffect, useRef } from "react";
import {
  Calendar,
  Image as ImageIcon,
  MessageCircle,
  Send,
  User,
  Home,
  Moon,
  Sun,
} from "lucide-react";

interface NavbarProps {
  theme: "light" | "dark";
  toggleTheme: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ theme, toggleTheme }) => {
  const [isVisible, setIsVisible] = useState(true);
  const timeoutRef = useRef<number | null>(null);

  const resetTimer = () => {
    setIsVisible(true);
    if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    timeoutRef.current = window.setTimeout(() => {
      if (window.scrollY > 100) {
        setIsVisible(false);
      }
    }, 3000);
  };

  useEffect(() => {
    const events = ["mousemove", "scroll", "touchstart", "keydown"];
    events.forEach((event) => window.addEventListener(event, resetTimer));

    resetTimer();

    return () => {
      events.forEach((event) => window.removeEventListener(event, resetTimer));
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleAction = () => {
    window.dispatchEvent(new CustomEvent("play-wedding-music"));
    resetTimer();
  };

  const navItems = [
    { icon: Home, label: "Home", href: "#" },
    { icon: User, label: "Couple", href: "#couple" },
    { icon: Calendar, label: "Events", href: "#event" },
    { icon: ImageIcon, label: "Gallery", href: "#gallery" },
    { icon: Send, label: "RSVP", href: "#rsvp" },
    { icon: MessageCircle, label: "Wishes", href: "#wishes" },
  ];

  return (
    <nav
      className={`fixed bottom-4 md:bottom-8 left-1/2 -translate-x-1/2 z-[100] w-[95%] md:w-fit px-2 transition-all duration-700 ease-in-out pointer-events-none ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-24 opacity-0"
      }`}
    >
      <div className="bg-white/60 dark:bg-darkSurface/60 backdrop-blur-2xl border border-white/40 dark:border-white/10 rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.2)] flex items-center justify-between md:justify-center gap-1 p-1.5 md:p-2 pointer-events-auto transition-colors duration-1000">
        {navItems.map((item) => (
          <a
            key={item.label}
            href={item.href}
            className="p-3 md:p-4 rounded-full text-slate-600 dark:text-slate-300 hover:text-accent dark:hover:text-accent hover:bg-white/80 dark:hover:bg-white/10 transition-all group relative"
            title={item.label}
            onClick={handleAction}
          >
            <item.icon className="w-5 h-5 md:w-6 md:h-6" />
            <span className="absolute -top-12 left-1/2 -translate-x-1/2 bg-slate-900 dark:bg-accent text-white dark:text-slate-900 text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-all whitespace-nowrap hidden md:block shadow-xl">
              {item.label}
            </span>
          </a>
        ))}
        <div className="w-[1px] h-8 bg-slate-200 dark:bg-white/10 mx-2"></div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleTheme();
            handleAction();
          }}
          className="p-3 md:p-4 rounded-full text-slate-600 dark:text-slate-300 hover:text-accent dark:hover:text-accent hover:bg-white/80 dark:hover:bg-white/10 transition-all group relative"
          aria-label="Toggle theme"
        >
          {theme === "light" ? (
            <Moon className="w-5 h-5 md:w-6 md:h-6" />
          ) : (
            <Sun className="w-5 h-5 md:w-6 md:h-6" />
          )}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
```

---

### File: `./src/components/RSVPForm.tsx`

```tsx
import React, { useState } from "react";
import {
  Send,
  CheckCircle2,
  Heart,
  Users,
  MapPin,
  Sparkles,
} from "lucide-react";
import { dbService } from "../services/dbService";
import { AttendanceStatus } from "../types";

const RSVPForm: React.FC = () => {
  const [formData, setFormData] = useState({
    guest_name: "",
    phone: "",
    attendance: AttendanceStatus.HADIR,
    guest_count: 1,
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.guest_name) return;
    setIsSubmitting(true);
    try {
      await dbService.saveRSVP(formData);
      setSubmitted(true);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <section className="py-24 bg-slate-950 text-white text-center">
        <div className="container mx-auto px-6">
          <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-6 animate-reveal">
            <CheckCircle2 className="w-8 h-8 text-accent" />
          </div>
          <h3 className="text-3xl md:text-6xl font-serif italic mb-4 animate-reveal">
            Terima Kasih
          </h3>
          <p className="text-white/70 font-light max-w-sm mx-auto animate-reveal [animation-delay:200ms] text-base md:text-lg">
            Konfirmasi kehadiran Anda telah kami terima. Sampai jumpa di hari
            bahagia kami!
          </p>
        </div>
      </section>
    );
  }

  return (
    <section
      id="rsvp"
      className="py-16 md:py-40 bg-white dark:bg-darkBg transition-colors duration-1000"
    >
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        <div className="text-center mb-12 md:mb-24 space-y-3">
          <Heart className="w-5 h-5 text-accentDark dark:text-accent/30 mx-auto mb-2 animate-pulse" />
          <h2 className="text-4xl md:text-8xl font-serif italic text-slate-900 dark:text-white tracking-tight">
            Reservasi
          </h2>
          <p className="text-slate-400 dark:text-slate-500 tracking-luxury text-[9px] md:text-[10px] uppercase font-bold">
            Mohon konfirmasi kehadiran Anda
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 md:gap-14 items-stretch">
          {/* Form Card */}
          <div className="lg:col-span-5 space-y-6">
            <div className="editorial-card h-full p-6 md:p-14 rounded-[1.5rem] md:rounded-[3.5rem] relative overflow-hidden group shadow-lg">
              <div className="absolute top-0 right-0 w-32 h-32 bg-accentDark/5 dark:bg-accent/5 rounded-full -mr-16 -mt-16 group-hover:scale-110 transition-transform duration-1000"></div>

              <div className="relative z-10 space-y-8 md:space-y-12">
                <div className="flex items-center gap-4 border-b border-slate-50 dark:border-white/5 pb-4 md:pb-10">
                  <div className="w-10 h-10 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-slate-50 dark:bg-white/5 flex items-center justify-center text-accentDark dark:text-accent border border-slate-100 dark:border-white/10">
                    <Users className="w-5 h-5 md:w-8 md:h-8" />
                  </div>
                  <div>
                    <h3 className="text-lg md:text-2xl font-serif italic text-slate-900 dark:text-white leading-none">
                      Konfirmasi
                    </h3>
                    <p className="text-[8px] md:text-[9px] uppercase tracking-editorial text-slate-400 mt-1.5 font-bold">
                      Lengkapi data Anda
                    </p>
                  </div>
                </div>

                <form
                  onSubmit={handleSubmit}
                  className="space-y-6 md:space-y-10"
                >
                  <div className="space-y-6 md:space-y-8">
                    <div className="relative group/input">
                      <input
                        required
                        type="text"
                        className="w-full bg-transparent border-b border-slate-200 dark:border-white/10 py-2 md:py-5 focus:border-accentDark dark:focus:border-accent outline-none transition-all text-base md:text-xl font-serif italic text-slate-900 dark:text-white placeholder:text-slate-200"
                        placeholder="Nama Tamu"
                        value={formData.guest_name}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            guest_name: e.target.value,
                          })
                        }
                      />
                      <label className="absolute -top-3.5 left-0 text-[7px] md:text-[9px] uppercase tracking-editorial text-slate-400 font-bold group-focus-within/input:text-accentDark transition-colors">
                        Nama
                      </label>
                    </div>

                    <div className="relative group/input">
                      <input
                        type="text"
                        className="w-full bg-transparent border-b border-slate-200 dark:border-white/10 py-2 md:py-5 focus:border-accentDark dark:focus:border-accent outline-none transition-all text-base md:text-xl font-serif italic text-slate-900 dark:text-white placeholder:text-slate-200"
                        placeholder="WhatsApp / Phone"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                      />
                      <label className="absolute -top-3.5 left-0 text-[7px] md:text-[9px] uppercase tracking-editorial text-slate-400 font-bold group-focus-within/input:text-accentDark transition-colors">
                        Kontak
                      </label>
                    </div>
                  </div>

                  <div className="space-y-3 md:space-y-6">
                    <p className="text-[8px] md:text-[9px] uppercase tracking-editorial text-slate-400 font-bold mb-1">
                      Status Kehadiran
                    </p>
                    <div className="grid grid-cols-1 gap-2">
                      {[
                        AttendanceStatus.HADIR,
                        AttendanceStatus.TIDAK_HADIR,
                        AttendanceStatus.RAGU,
                      ].map((status) => (
                        <button
                          key={status}
                          type="button"
                          onClick={() =>
                            setFormData({ ...formData, attendance: status })
                          }
                          className={`px-5 py-3.5 md:py-5 rounded-lg md:rounded-2xl border transition-all text-[9px] md:text-[11px] font-bold uppercase tracking-editorial flex items-center justify-between group ${
                            formData.attendance === status
                              ? "bg-primary dark:bg-white text-white dark:text-primary border-primary dark:border-white shadow-md"
                              : "border-slate-100 dark:border-white/5 text-slate-400 hover:bg-slate-50 dark:hover:bg-white/5"
                          }`}
                        >
                          {status.replace("_", " ")}
                          {formData.attendance === status && (
                            <CheckCircle2 className="w-3.5 h-3.5 md:w-5 md:h-5" />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    disabled={isSubmitting}
                    type="submit"
                    className="w-full py-3.5 md:py-6 bg-primary dark:bg-accentDark text-white rounded-xl md:rounded-3xl font-bold uppercase tracking-luxury text-[9px] md:text-[11px] hover:shadow-xl transition-all duration-700 flex items-center justify-center gap-3 disabled:opacity-50 active:scale-95 group shadow-sm"
                  >
                    {isSubmitting ? "Mengirim..." : "Kirim Sekarang"}
                    <Send className="w-3.5 h-3.5 md:w-5 md:h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* Decorative Info Card - Responsive Optimization */}
          <div className="lg:col-span-7">
            <div className="editorial-card h-full p-8 md:p-20 rounded-[2rem] md:rounded-[4rem] flex flex-col justify-center space-y-10 md:space-y-16 relative overflow-hidden group shadow-lg border border-slate-100 dark:border-white/5">
              <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-transparent opacity-50"></div>

              <div className="relative z-10 text-center lg:text-left space-y-6 md:space-y-12">
                <div className="inline-flex items-center gap-2.5 bg-slate-50 dark:bg-white/5 px-4 py-1.5 md:px-6 md:py-3 rounded-full border border-slate-100 dark:border-white/10">
                  <Sparkles className="w-3.5 h-3.5 md:w-5 md:h-5 text-accentDark dark:text-accent animate-pulse" />
                  <span className="text-[7px] md:text-[10px] uppercase tracking-editorial font-bold text-slate-500">
                    Love & Gratitude
                  </span>
                </div>

                <h3 className="text-3xl md:text-8xl font-serif italic text-slate-900 dark:text-white leading-tight tracking-tight text-balance">
                  Lengkapi{" "}
                  <span className="text-accentDark dark:text-accent">
                    kebahagiaan
                  </span>{" "}
                  kami dengan kehadiran Anda.
                </h3>

                <p className="text-slate-600 dark:text-slate-400 text-base md:text-2xl font-light leading-relaxed italic max-w-2xl mx-auto lg:mx-0 text-balance">
                  Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila
                  Bapak/Ibu/Saudara/i berkenan hadir untuk memberikan doa restu.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-10 pt-6 md:pt-10 border-t border-slate-50 dark:border-white/5">
                  <div className="space-y-1 md:space-y-4">
                    <div className="flex items-center justify-center lg:justify-start gap-2.5 text-accentDark dark:text-accent opacity-60">
                      <MapPin className="w-4 h-4 md:w-6 md:h-6" />
                      <span className="text-[8px] md:text-[11px] uppercase tracking-editorial font-bold">
                        Venue
                      </span>
                    </div>
                    <p className="text-slate-800 dark:text-slate-200 font-serif italic text-xl md:text-3xl">
                      Royal Azure Ballroom
                    </p>
                  </div>
                  <div className="space-y-1 md:space-y-4">
                    <div className="flex items-center justify-center lg:justify-start gap-2.5 text-accentDark dark:text-accent opacity-60">
                      <Heart className="w-4 h-4 md:w-6 md:h-6" />
                      <span className="text-[8px] md:text-[11px] uppercase tracking-editorial font-bold">
                        Dress Code
                      </span>
                    </div>
                    <p className="text-slate-800 dark:text-slate-200 font-serif italic text-xl md:text-3xl">
                      Batik / Formal
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RSVPForm;
```

---

### File: `./src/components/Wishes.tsx`

```tsx
import React, { useState, useEffect, useMemo } from "react";
import { dbService } from "../services/dbService";
// import { Wish } from '../types';
import type { Wish } from "../types";
import {
  MessageSquare,
  Quote,
  Heart,
  Send,
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from "lucide-react";

const Wishes: React.FC = () => {
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const wishesPerPage = 6;

  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);

  useEffect(() => {
    loadWishes();
  }, []);

  const loadWishes = async () => {
    const data = await dbService.getWishes();
    setWishes(data);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    setIsSending(true);
    try {
      await dbService.saveWish({ name, message });
      setName("");
      setMessage("");
      await loadWishes();
      setCurrentPage(1);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSending(false);
    }
  };

  const totalPages = Math.ceil(wishes.length / wishesPerPage);

  const currentWishes = useMemo(() => {
    const start = (currentPage - 1) * wishesPerPage;
    return wishes.slice(start, start + wishesPerPage);
  }, [wishes, currentPage]);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    const header = document.getElementById("wishes-header");
    if (header) {
      header.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = window.innerWidth < 768 ? 3 : 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage < maxVisiblePages - 1) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <section
      id="wishes"
      className="py-24 md:py-48 bg-secondary/30 dark:bg-darkBg transition-colors duration-1000"
    >
      <div className="container mx-auto px-6 max-w-7xl">
        <div
          id="wishes-header"
          className="text-center mb-20 md:mb-32 space-y-6 md:space-y-10"
        >
          <div className="flex items-center justify-center gap-4 opacity-40">
            <div className="h-[1px] w-12 md:w-24 bg-accentDark dark:bg-accent"></div>
            <Sparkles className="w-6 h-6 md:w-10 md:h-10 text-accentDark dark:text-accent animate-pulse" />
            <div className="h-[1px] w-12 md:w-24 bg-accentDark dark:bg-accent"></div>
          </div>
          <h2 className="text-5xl md:text-[10rem] font-serif italic text-slate-900 dark:text-white tracking-tighter leading-none">
            Prayers & Wishes
          </h2>
          <p className="text-slate-400 dark:text-slate-500 tracking-luxury text-[10px] md:text-[14px] uppercase font-black italic text-balance">
            Untaian doa dan harapan tulus dari orang-orang tersayang
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-10 md:gap-24 items-start">
          {/* Form Section - Editorial Design */}
          <div className="lg:col-span-4 lg:sticky lg:top-32">
            <div className="frosted-glass p-8 md:p-14 rounded-[2.5rem] md:rounded-[4rem] shadow-2xl relative overflow-hidden group border border-slate-200/50 dark:border-white/5">
              <div className="absolute -top-20 -right-20 w-64 h-64 bg-accent/5 rounded-full blur-3xl group-hover:scale-125 transition-transform duration-[3s]"></div>

              <div className="relative z-10 space-y-10 md:space-y-16">
                <div className="space-y-4">
                  <span className="text-[10px] md:text-[12px] font-black uppercase tracking-luxury text-accentDark dark:text-accent">
                    Guest Book
                  </span>
                  <h3 className="text-3xl md:text-5xl font-serif italic text-slate-900 dark:text-white">
                    Kirim Ucapan
                  </h3>
                </div>

                <form
                  onSubmit={handleSubmit}
                  className="space-y-8 md:space-y-14"
                >
                  <div className="space-y-8 md:space-y-12">
                    <div className="relative group/input">
                      <input
                        required
                        type="text"
                        className="w-full bg-transparent border-b-2 border-slate-100 dark:border-white/5 py-3 md:py-6 focus:border-accentDark dark:focus:border-accent outline-none transition-all text-lg md:text-2xl font-serif italic text-slate-900 dark:text-white placeholder:text-slate-200 dark:placeholder:text-slate-800"
                        placeholder="Nama Lengkap"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                      <label className="absolute -top-4 left-0 text-[8px] md:text-[10px] uppercase tracking-widest text-slate-400 font-black">
                        Your Name
                      </label>
                    </div>
                    <div className="relative group/input">
                      <textarea
                        required
                        className="w-full bg-transparent border-b-2 border-slate-100 dark:border-white/5 py-3 md:py-6 focus:border-accentDark dark:focus:border-accent outline-none transition-all text-lg md:text-2xl font-serif italic h-32 md:h-52 resize-none text-slate-900 dark:text-white leading-relaxed placeholder:text-slate-200 dark:placeholder:text-slate-800"
                        placeholder="Tuliskan harapan terbaik Anda..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                      />
                      <label className="absolute -top-4 left-0 text-[8px] md:text-[10px] uppercase tracking-widest text-slate-400 font-black">
                        Your Message
                      </label>
                    </div>
                  </div>
                  <button
                    disabled={isSending}
                    type="submit"
                    className="w-full py-5 md:py-8 bg-primary dark:bg-accentDark text-white rounded-2xl md:rounded-[3rem] font-black uppercase tracking-luxury text-[10px] md:text-[13px] hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 flex items-center justify-center gap-4 disabled:opacity-50 active:scale-95 group/btn shadow-xl"
                  >
                    {isSending ? "Sending..." : "Post Message"}
                    <Send className="w-4 h-4 md:w-6 md:h-6 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* List Section - High-End Grid */}
          <div className="lg:col-span-8 space-y-12 md:space-y-20">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-10">
              {currentWishes.map((wish) => (
                <div
                  key={wish.id}
                  className="editorial-card p-8 md:p-14 rounded-[2.5rem] md:rounded-[4rem] group hover:-translate-y-2 transition-all duration-700 flex flex-col shadow-xl hover:shadow-2xl border border-slate-50 dark:border-white/5 bg-white dark:bg-darkSurface"
                >
                  <div className="space-y-6 md:space-y-10 flex-grow">
                    <div className="flex justify-between items-start">
                      <div className="w-12 h-12 md:w-16 md:h-16 bg-slate-50 dark:bg-white/5 rounded-2xl md:rounded-3xl flex items-center justify-center text-accentDark/20 dark:text-accent/20 border border-slate-100 dark:border-white/10">
                        <Quote className="w-6 h-6 md:w-8 md:h-8" />
                      </div>
                      <Heart className="w-4 h-4 md:w-6 md:h-6 text-accent/10 dark:text-accent/20 group-hover:scale-125 transition-transform duration-700" />
                    </div>
                    <p className="text-slate-700 dark:text-slate-200 text-lg md:text-3xl font-serif italic leading-[1.4] text-balance">
                      "{wish.message}"
                    </p>
                  </div>

                  <div className="mt-8 md:mt-16 flex items-center gap-4 md:gap-6 border-t border-slate-50 dark:border-white/5 pt-6 md:pt-10">
                    <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl md:rounded-3xl bg-gradient-to-br from-slate-50 to-slate-100 dark:from-white/5 dark:to-white/10 flex items-center justify-center text-[12px] md:text-[18px] font-black text-accentDark dark:text-accent border border-slate-100 dark:border-white/10 shadow-inner">
                      {wish.name.charAt(0)}
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="text-[10px] md:text-[14px] font-black uppercase tracking-widest text-slate-900 dark:text-slate-100 truncate">
                        {wish.name}
                      </span>
                      <span className="text-[8px] md:text-[10px] text-slate-400 dark:text-slate-500 uppercase tracking-widest font-bold mt-1">
                        {new Date(wish.created_at).toLocaleDateString("id-ID", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Luxurious Pagination */}
            {totalPages > 1 && (
              <div className="flex flex-col items-center gap-8 md:gap-12">
                <div className="flex items-center justify-center gap-3 md:gap-6">
                  <button
                    onClick={() => paginate(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="w-12 h-12 md:w-20 md:h-20 rounded-full border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-400 hover:border-accentDark hover:text-accentDark hover:bg-white dark:hover:bg-white/5 transition-all disabled:opacity-10 shadow-lg active:scale-90"
                  >
                    <ChevronLeft className="w-6 h-6 md:w-10 md:h-10" />
                  </button>

                  <div className="flex gap-2 md:gap-4 px-4 py-2 bg-white/50 dark:bg-white/5 rounded-full backdrop-blur-xl border border-white/20 dark:border-white/10 shadow-inner">
                    {getPageNumbers().map((pageNum) => (
                      <button
                        key={pageNum}
                        onClick={() => paginate(pageNum)}
                        className={`w-10 h-10 md:w-16 md:h-16 rounded-full font-serif text-lg md:text-3xl transition-all duration-700 ${
                          currentPage === pageNum
                            ? "bg-primary dark:bg-accentDark text-white scale-110 shadow-2xl z-10"
                            : "text-slate-400 hover:text-slate-900 dark:hover:text-white"
                        }`}
                      >
                        {pageNum}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={() =>
                      paginate(Math.min(totalPages, currentPage + 1))
                    }
                    disabled={currentPage === totalPages}
                    className="w-12 h-12 md:w-20 md:h-20 rounded-full border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-400 hover:border-accentDark hover:text-accentDark hover:bg-white dark:hover:bg-white/5 transition-all disabled:opacity-10 shadow-lg active:scale-90"
                  >
                    <ChevronRight className="w-6 h-6 md:w-10 md:h-10" />
                  </button>
                </div>

                <div className="flex items-center gap-4 opacity-30">
                  <div className="h-[1px] w-8 bg-slate-400"></div>
                  <span className="text-[10px] md:text-[12px] uppercase tracking-luxury font-black text-slate-500 italic">
                    Page {currentPage} of {totalPages}
                  </span>
                  <div className="h-[1px] w-8 bg-slate-400"></div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Wishes;
```

---

### File: `./src/constants.tsx`

```tsx
import type { WeddingConfig } from "./types";

export const WEDDING_CONFIG: WeddingConfig = {
  couple: {
    bride: {
      name: "Fey",
      fullName: "Fera Oktapia",
      parents: "Putri ke 1 dari Bapak Adam & Ibu Siti Hawa",
      instagram: "fera_oktapia",
      image: "https://placehold.co/600x800?text=Fey+Portrait",
    },
    groom: {
      name: "Yaya",
      fullName: "Yahya Zulfikri",
      parents: "Putra ke 7 dari Bapak Mahdi & Ibu Syaiyah",
      instagram: "yahya_zulfikri",
      image: "https://placehold.co/600x800?text=Yaya+Portrait",
    },
  },
  venue: {
    name: "The Royal Azure Ballroom",
    address: "Jl. Elok No. 77, Jakarta Selatan, DKI Jakarta",
    latitude: -6.2088,
    longitude: 106.8456,
  },
  events: {
    akad: {
      title: "Janji Suci",
      day: "Minggu",
      date: "11 Oktober 2026",
      startTime: "08:00",
      endTime: "10:00",
      startDateTime: new Date("2026-10-11T08:00:00+07:00"),
      endDateTime: new Date("2026-10-11T10:00:00+07:00"),
    },
    resepsi: {
      title: "Perayaan Cinta",
      day: "Minggu",
      date: "11 Oktober 2026",
      startTime: "11:00",
      endTime: "14:00",
      startDateTime: new Date("2026-10-11T11:00:00+07:00"),
      endDateTime: new Date("2026-10-11T14:00:00+07:00"),
    },
  },
};

export const LOVE_STORY = [
  {
    date: "Musim Gugur, 2020",
    title: "Pertemuan Pertama",
    desc: "Berawal dari sebuah diskusi kecil, dua jiwa yang berbeda menemukan keselarasan dalam pandangan hidup.",
  },
  {
    date: "Maret, 2022",
    title: "Sebuah Komitmen",
    desc: "Memutuskan untuk saling menguatkan, menjadikan setiap tantangan sebagai jembatan menuju kedewasaan bersama.",
  },
  {
    date: "Januari, 2025",
    title: "Langkah Terakhir",
    desc: "Di bawah restu kedua orang tua, kami memantapkan hati untuk melangkah ke jenjang yang lebih suci.",
  },
];

export const BANK_ACCOUNTS = [
  { bank: "Bank BCA", number: "1234567890", name: "Fera Oktapia" },
  { bank: "Bank Mandiri", number: "0987654321", name: "Yahya Zulfikri" },
];

export const GALLERY_IMAGES = [
  "https://placehold.co/800x1200?text=Moment+1",
  "https://placehold.co/1200x800?text=Moment+2",
  "https://placehold.co/800x800?text=Moment+3",
  "https://placehold.co/800x1200?text=Moment+4",
  "https://placehold.co/1200x800?text=Moment+5",
  "https://placehold.co/800x1200?text=Moment+6",
  "https://placehold.co/1200x800?text=Moment+7",
  "https://placehold.co/800x1200?text=Moment+8",
];
```

---

### File: `./src/layouts/Layout.astro`

```astro
---
import "../styles/global.css"; // Pastikan CSS diimport di sini

interface Props {
  title: string;
  description?: string;
}

const { title, description } = Astro.props;
---

<!doctype html>
<html lang="id">
  <head>
    <meta charset="UTF-8" />
    <meta name="description" content={description} />
    <meta name="viewport" content="width=device-width" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <title>{title}</title>

    <!-- Font Import -->
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400;1,600&family=Outfit:wght@100;200;300;400;500;600&display=swap"
      rel="stylesheet"
    />
  </head>
  <!-- Pastikan class CSS ada di body -->
  <body class="bg-secondary dark:bg-darkBg text-slate-800 dark:text-slate-100">

    <!-- INI BAGIAN TERPENTING: -->
    <slot />

  </body>
</html>
```

---

### File: `./src/pages/index.astro`

```astro
---
import Layout from "../layouts/Layout.astro";
import App from "../App";
---

<Layout title="The Wedding of Fera & Yahya">
  <!--
    Kita memuat App sebagai "client:only" karena logika amplop, tema,
    dan musik sangat bergantung pada API browser (window/document)
    dan interaksi langsung.
  -->
  <App client:only="react" />
</Layout>
```

---

### File: `./src/services/dbService.ts`

```ts
// // import { RSVP, Wish, AttendanceStatus } from '../types';
// import { AttendanceStatus } from "../types";
// import type { RSVP, Wish } from "../types";
// Pisahkan AttendanceStatus (karena dia Enum/Nilai)
import { AttendanceStatus } from "../types";

// Import RSVP dan Wish sebagai Type (karena dia Interface)
import type { RSVP, Wish } from "../types";

const RSVP_KEY = "wedding_rsvp";
const WISHES_KEY = "wedding_wishes";

const generateAuthenticWishes = () => {
  const femaleFirst = [
    "Siti",
    "Maya",
    "Laras",
    "Putri",
    "Rina",
    "Indah",
    "Mega",
    "Amira",
    "Vina",
    "Siska",
    "Adinda",
    "Aulia",
    "Nia",
    "Fitri",
    "Dewi",
    "Lestari",
    "Wati",
    "Ayu",
  ];
  const femaleLast = [
    "Lestari",
    "Sari",
    "Utami",
    "Rahayu",
    "Aminah",
    "Fitriani",
    "Wahyuni",
    "Kusuma",
    "Permata",
    "Puspita",
    "Anggraini",
  ];

  const maleFirst = [
    "Rizky",
    "Bambang",
    "Dimas",
    "Hendra",
    "Fajar",
    "Bagas",
    "Eko",
    "Joko",
    "Agus",
    "Arif",
    "Taufik",
    "Guntur",
    "Sultan",
    "Doni",
    "Reza",
    "Saputra",
    "Budi",
    "Hidayat",
  ];
  const maleLast = [
    "Saputra",
    "Pratama",
    "Hidayat",
    "Purnomo",
    "Setiawan",
    "Ramadhan",
    "Nugroho",
    "Wijaya",
    "Kusuma",
    "Gunawan",
    "Susanto",
  ];

  const templates = [
    "Selamat ya Fey & Yaya! Semoga menjadi keluarga yang sakinah, mawaddah, warahmah. Amin.",
    "Happy wedding guys! Akhirnya pelaminan juga. Lancar-lancar ya kehidupan barunya.",
    "Barakallahu lakuma wa baraka 'alaikuma wa jama'a bainakuma fii khair. Selamat ya!",
    "Selamat menempuh hidup baru. Semoga cinta kalian abadi sampai kakek nenek.",
    "Cieee yang udah halal! Selamat ya Yaya, jagain Fey baik-baik ya bro.",
    "Terharu banget liat kalian berdua. Dari jaman kuliah sampai sekarang akhirnya nikah. Selamat!",
    "Selamat menempuh bahtera rumah tangga. Semoga cepat dikasih momongan yang lucu-lucu.",
    "Wishing you a lifetime of love and happiness. Selamat Fey & Yaya!",
    "Maaf banget nggak bisa hadir langsung karena masih di luar kota, tapi doa terbaik dari kami sekeluarga.",
    "Mantap bosku! Akhirnya pecah telor juga. Bahagia terus ya buat kalian.",
    "Semoga Allah memberkahi pernikahan kalian dan menyatukan dalam kebaikan selalu.",
    "Selamat ya! Ikut seneng denger kabarnya. Semoga jadi keluarga yang harmonis.",
    "Congrats on your wedding! Stay in love forever and ever.",
    "Selamat menempuh petualangan baru bersama. Saling sabar dan saling dukung ya!",
    "Happy for you both! Semoga rumah tangganya penuh berkah dan kebahagiaan.",
    "Selamat ya Fey sayang, cantik banget hari ini. Semoga bahagia terus sama Yaya.",
    "Akhirnya janji suci terucap. Selamat membangun surga di dunia bersama ya.",
    "Selamat Bro Yaya! Jangan lupa traktirannya kalau ketemu haha. Bahagia terus ya!",
    "Semoga menjadi pasangan yang selalu menginspirasi. Selamat menempuh hidup baru.",
    "Doa terbaik untuk Fey & Yaya. Semoga setiap langkah kalian diberkahi Tuhan.",
  ];

  const wishes: Wish[] = [];
  const now = Date.now();
  const threeMonths = 90 * 24 * 60 * 60 * 1000;

  for (let i = 0; i < 165; i++) {
    const isFemale = Math.random() > 0.5;
    let name = "";

    if (isFemale) {
      const first = femaleFirst[Math.floor(Math.random() * femaleFirst.length)];
      const last = femaleLast[Math.floor(Math.random() * femaleLast.length)];
      name = `${first} ${last}`;
    } else {
      const first = maleFirst[Math.floor(Math.random() * maleFirst.length)];
      const last = maleLast[Math.floor(Math.random() * maleLast.length)];
      name = `${first} ${last}`;
    }

    const message = templates[Math.floor(Math.random() * templates.length)];
    const timestamp = new Date(
      now - Math.floor(Math.random() * threeMonths)
    ).toISOString();

    wishes.push({
      id: Math.random() + i,
      name,
      message,
      created_at: timestamp,
    });
  }
  return wishes;
};

export const dbService = {
  async initializeDemo() {
    const existing = localStorage.getItem(WISHES_KEY);
    if (!existing || JSON.parse(existing).length < 20) {
      const allWishes = generateAuthenticWishes();
      localStorage.setItem(WISHES_KEY, JSON.stringify(allWishes));
      return allWishes;
    }
    return JSON.parse(existing);
  },

  async saveRSVP(data: Omit<RSVP, "id" | "created_at">): Promise<RSVP> {
    const existing = JSON.parse(localStorage.getItem(RSVP_KEY) || "[]");
    const newRSVP: RSVP = {
      ...data,
      id: Date.now(),
      created_at: new Date().toISOString(),
    };
    localStorage.setItem(RSVP_KEY, JSON.stringify([...existing, newRSVP]));
    return newRSVP;
  },

  async getWishes(): Promise<Wish[]> {
    let wishesStr = localStorage.getItem(WISHES_KEY);
    let wishes: Wish[] = [];

    if (!wishesStr || JSON.parse(wishesStr).length < 5) {
      wishes = generateAuthenticWishes();
      localStorage.setItem(WISHES_KEY, JSON.stringify(wishes));
    } else {
      wishes = JSON.parse(wishesStr);
    }

    return wishes.sort(
      (a: Wish, b: Wish) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );
  },

  async saveWish(data: { name: string; message: string }): Promise<Wish> {
    const wishes = await this.getWishes();
    const newWish: Wish = {
      ...data,
      id: Date.now(),
      created_at: new Date().toISOString(),
    };
    localStorage.setItem(WISHES_KEY, JSON.stringify([...wishes, newWish]));
    return newWish;
  },
};
```

---

### File: `./src/styles/global.css`

```css
@import "tailwindcss";

@theme {
  /* Colors */
  --color-primary: #0f172a;
  --color-secondary: #fafaf9;
  --color-accent: #7dd3fc;
  --color-accentDark: #075985;
  --color-darkBg: #020617;
  --color-darkSurface: #0f172a;

  /* Fonts */
  --font-serif: "Cormorant Garamond", serif;
  --font-sans: "Outfit", sans-serif;

  /* Animations definitions linked to keyframes below */
  --animate-subtle-zoom: subtleZoom 20s infinite alternate;
  --animate-reveal: reveal 1.2s cubic-bezier(0.22, 1, 0.36, 1) forwards;
  --animate-float: float 6s ease-in-out infinite;
  --animate-pulse-soft: pulseSoft 4s ease-in-out infinite;

  /* Keyframes definitions */
  @keyframes subtleZoom {
    0% {
      transform: scale(1);
    }
    100% {
      transform: scale(1.08);
    }
  }
  @keyframes reveal {
    0% {
      opacity: 0;
      transform: translateY(20px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }
  @keyframes pulseSoft {
    0%,
    100% {
      opacity: 0.8;
    }
    50% {
      opacity: 0.3;
    }
  }
  @keyframes float {
    0%,
    100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-10px);
    } /* Contoh animasi float standar */
  }
}

/* Custom Utilities / CSS Lanjutan */
@layer utilities {
  .text-balance {
    text-wrap: balance;
  }

  .tracking-luxury {
    letter-spacing: 0.4em;
  }

  .tracking-editorial {
    letter-spacing: 0.15em;
  }
}

/* Base Styles */
@layer base {
  body {
    transition-property: color, background-color, border-color,
      text-decoration-color, fill, stroke;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 800ms;
    transition-timing-function: ease-out;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    line-height: 1.625;
  }

  /* Dark mode override */
  :root:has(.dark) body {
    color: #f1f5f9; /* slate-100 */
  }
}

/* Custom Classes */
.grain::before {
  content: "";
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url("https://grainy-gradients.vercel.app/noise.svg");
  opacity: 0.015;
  pointer-events: none;
  z-index: 9999;
}

:root:has(.dark) .grain::before {
  opacity: 0.03;
}

.editorial-card {
  background: white;
  transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
  border: 1px solid rgba(15, 23, 42, 0.05);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.01);
}

:root:has(.dark) .editorial-card {
  background: rgba(15, 23, 42, 0.9);
  border: 1px solid rgba(255, 255, 255, 0.06);
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
}

.frosted-glass {
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(20px) saturate(160%);
  -webkit-backdrop-filter: blur(20px) saturate(160%);
  border: 1px solid rgba(255, 255, 255, 0.3);
}

:root:has(.dark) .frosted-glass {
  background: rgba(15, 23, 42, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.reveal-active {
  animation: reveal 1.2s cubic-bezier(0.22, 1, 0.36, 1) forwards;
}
```

---

### File: `./src/types.ts`

```ts
export enum AttendanceStatus {
  HADIR = "hadir",
  TIDAK_HADIR = "tidak_hadir",
  RAGU = "ragu",
}

export interface RSVP {
  id: number;
  guest_name: string;
  email?: string;
  phone?: string;
  attendance: AttendanceStatus;
  guest_count: number;
  message?: string;
  created_at: string;
}

export interface Wish {
  id: number;
  name: string;
  message: string;
  created_at: string;
}

export interface WeddingConfig {
  couple: {
    bride: {
      name: string;
      fullName: string;
      parents: string;
      instagram: string;
      image: string;
    };
    groom: {
      name: string;
      fullName: string;
      parents: string;
      instagram: string;
      image: string;
    };
  };
  venue: {
    name: string;
    address: string;
    latitude: number;
    longitude: number;
  };
  events: {
    akad: WeddingEvent;
    resepsi: WeddingEvent;
  };
}

export interface WeddingEvent {
  title: string;
  day: string;
  date: string;
  startTime: string;
  endTime: string;
  startDateTime: Date;
  endDateTime: Date;
}
```

---

### File: `./src/utils/calendarUtils.ts`

```ts
export const generateGoogleCalendarUrl = (event: {
  title: string;
  description: string;
  location: string;
  startTime: Date;
  endTime: Date;
}) => {
  const formatDate = (date: Date) =>
    date.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
  const baseUrl = "https://calendar.google.com/calendar/render";
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: event.title,
    dates: `${formatDate(event.startTime)}/${formatDate(event.endTime)}`,
    details: event.description,
    location: event.location,
    sf: "true",
    output: "xml",
  });
  return `${baseUrl}?${params.toString()}`;
};

export const downloadICS = (event: {
  title: string;
  description: string;
  location: string;
  startTime: Date;
  endTime: Date;
}) => {
  const formatDate = (date: Date) =>
    date.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";

  const icsContent = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Fera & Yahya Wedding//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `DTSTART:${formatDate(event.startTime)}`,
    `DTEND:${formatDate(event.endTime)}`,
    `DTSTAMP:${formatDate(new Date())}`,
    `UID:${Date.now()}@ferayahya.com`,
    `SUMMARY:${event.title}`,
    `DESCRIPTION:${event.description.replace(/\n/g, "\\n")}`,
    `LOCATION:${event.location}`,
    "STATUS:CONFIRMED",
    "SEQUENCE:0",
    "BEGIN:VALARM",
    "TRIGGER:-PT1H",
    "ACTION:DISPLAY",
    "DESCRIPTION:Reminder",
    "END:VALARM",
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");

  const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", `${event.title.replace(/\s+/g, "_")}.ics`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
```

---
