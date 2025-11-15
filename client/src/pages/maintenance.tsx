import { Clock, Palette } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { SiGithub, SiDiscord, SiX } from "react-icons/si";

type ThemeName = "default" | "matrix" | "vaporwave" | "sunset";

interface Theme {
  name: ThemeName;
  label: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
  };
}

const themes: Theme[] = [
  {
    name: "default",
    label: "Cyberpunk",
    colors: {
      primary: "#a855f7",
      secondary: "#ff006e",
      accent: "#00d4ff",
    },
  },
  {
    name: "matrix",
    label: "Matrix",
    colors: {
      primary: "#00ff41",
      secondary: "#ccff00",
      accent: "#00e5cc",
    },
  },
  {
    name: "vaporwave",
    label: "Vaporwave",
    colors: {
      primary: "#ff71ce",
      secondary: "#01cdfe",
      accent: "#b967ff",
    },
  },
  {
    name: "sunset",
    label: "Sunset",
    colors: {
      primary: "#ff6b00",
      secondary: "#ff1053",
      accent: "#ff8c00",
    },
  },
];

export default function MaintenancePage() {
  const particles = Array.from({ length: 60 }, (_, i) => ({
    id: i,
    size: Math.random() * 4 + 2,
    left: Math.random() * 100,
    delay: Math.random() * 20,
    duration: Math.random() * 10 + 15,
  }));

  const targetEndTime = new Date();
  targetEndTime.setHours(targetEndTime.getHours() + 2);

  const [timeRemaining, setTimeRemaining] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [currentTheme, setCurrentTheme] = useState<ThemeName>("default");
  const [showThemePicker, setShowThemePicker] = useState(false);
  const themePickerRef = useRef<HTMLDivElement>(null);
  const themeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const savedTheme = localStorage.getItem("maintenance-theme") as ThemeName;
    if (savedTheme && themes.find(t => t.name === savedTheme)) {
      setCurrentTheme(savedTheme);
      document.documentElement.setAttribute("data-theme", savedTheme);
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      
      if (showThemePicker && 
          themePickerRef.current && 
          themeButtonRef.current &&
          !themePickerRef.current.contains(target) && 
          !themeButtonRef.current.contains(target)) {
        setShowThemePicker(false);
      }
    };

    if (showThemePicker) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [showThemePicker]);

  const handleThemeChange = (themeName: ThemeName) => {
    setCurrentTheme(themeName);
    document.documentElement.setAttribute("data-theme", themeName);
    localStorage.setItem("maintenance-theme", themeName);
    setShowThemePicker(false);
  };

  useEffect(() => {
    const calculateTimeRemaining = () => {
      const now = new Date().getTime();
      const end = targetEndTime.getTime();
      const difference = end - now;

      if (difference <= 0) {
        setTimeRemaining({ hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / (1000 * 60)) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      setTimeRemaining({ hours, minutes, seconds });
    };

    calculateTimeRemaining();
    const interval = setInterval(calculateTimeRemaining, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div 
      className="relative min-h-screen w-full overflow-hidden flex items-center justify-center"
      style={{ 
        background: `linear-gradient(to bottom, hsl(var(--background) / 0.95) 0%, hsl(var(--card) / 0.9) 50%, hsl(var(--background) / 0.95) 100%)`,
        fontFamily: 'Space Grotesk, sans-serif'
      }}
      data-testid="maintenance-page"
    >
      {/* Theme Switcher Button - Top Right */}
      <button
        ref={themeButtonRef}
        onClick={() => setShowThemePicker(!showThemePicker)}
        className="fixed top-6 right-6 z-50 p-3 rounded-full transition-all duration-300 hover:scale-110"
        style={{
          background: `hsl(var(--background) / 0.6)`,
          backdropFilter: 'blur(10px)',
          border: `1px solid hsl(var(--primary) / 0.3)`,
          boxShadow: `0 0 20px hsl(var(--primary) / 0.2)`,
        }}
        data-testid="theme-toggle-button"
        aria-label="Change theme"
      >
        <Palette className="w-5 h-5" style={{ color: 'hsl(var(--primary))' }} />
      </button>

      {/* Theme Picker Panel */}
      {showThemePicker && (
        <div
          ref={themePickerRef}
          className="fixed top-20 right-6 z-50 p-4 rounded-2xl animate-fade-in"
          style={{
            background: `hsl(var(--background) / 0.8)`,
            backdropFilter: 'blur(20px)',
            border: `1px solid hsl(var(--primary) / 0.3)`,
            boxShadow: `0 0 40px hsl(var(--primary) / 0.2)`,
          }}
          data-testid="theme-picker"
        >
          <div className="mb-3">
            <p className="text-sm font-medium" style={{ color: 'hsl(var(--foreground))' }}>Choose Theme</p>
          </div>
          <div className="flex flex-col gap-2">
            {themes.map((theme) => (
              <button
                key={theme.name}
                onClick={() => handleThemeChange(theme.name)}
                className="flex items-center gap-3 p-3 rounded-lg transition-all duration-200 hover:scale-105"
                style={{
                  background: currentTheme === theme.name 
                    ? `hsl(var(--primary) / 0.15)` 
                    : `hsl(var(--foreground) / 0.04)`,
                  border: currentTheme === theme.name
                    ? `1px solid hsl(var(--primary) / 0.5)`
                    : `1px solid hsl(var(--foreground) / 0.1)`,
                }}
                data-testid={`theme-option-${theme.name}`}
              >
                <div className="flex gap-1">
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{ background: theme.colors.primary }}
                  />
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{ background: theme.colors.secondary }}
                  />
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{ background: theme.colors.accent }}
                  />
                </div>
                <span className="text-sm font-medium" style={{ color: 'hsl(var(--foreground))' }}>
                  {theme.label}
                </span>
                {currentTheme === theme.name && (
                  <span className="ml-auto text-lg" style={{ color: 'hsl(var(--primary))' }}>✓</span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Animated Background Particles */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full animate-drift-down"
          style={{
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            left: `${particle.left}%`,
            background: `radial-gradient(circle, hsl(var(--accent) / 0.8) 0%, hsl(var(--primary) / 0.4) 50%, transparent 70%)`,
            boxShadow: `0 0 10px hsl(var(--accent) / 0.5)`,
            animationDelay: `${particle.delay}s`,
            animationDuration: `${particle.duration}s`,
          }}
        />
      ))}

      {/* Geometric Background Shapes */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Large Circle - Top Right */}
        <div
          className="absolute -top-20 -right-20 w-96 h-96 rounded-full opacity-20 animate-pulse-glow"
          style={{
            background: `radial-gradient(circle, hsl(var(--primary) / 0.3) 0%, transparent 70%)`,
            filter: 'blur(40px)',
          }}
        />

        {/* Medium Circle - Bottom Left */}
        <div
          className="absolute -bottom-32 -left-32 w-80 h-80 rounded-full opacity-15 animate-float-slow"
          style={{
            background: `radial-gradient(circle, hsl(var(--accent) / 0.3) 0%, transparent 70%)`,
            filter: 'blur(50px)',
          }}
        />

        {/* Hexagon Shape - Center Right */}
        <div
          className="absolute top-1/4 right-20 opacity-10 animate-float"
          style={{
            width: '200px',
            height: '200px',
            background: `linear-gradient(135deg, hsl(var(--secondary) / 0.2) 0%, hsl(var(--primary) / 0.2) 100%)`,
            clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)',
            filter: 'blur(30px)',
          }}
        />

        {/* Cyberpunk Light Streaks */}
        <div
          className="absolute top-0 left-1/4 w-1 h-64 opacity-30 animate-pulse-glow"
          style={{
            background: `linear-gradient(to bottom, transparent 0%, hsl(var(--accent) / 0.6) 50%, transparent 100%)`,
            transform: 'rotate(25deg)',
            filter: 'blur(2px)',
          }}
        />
        <div
          className="absolute bottom-0 right-1/3 w-1 h-80 opacity-25 animate-pulse-glow"
          style={{
            background: `linear-gradient(to bottom, transparent 0%, hsl(var(--secondary) / 0.6) 50%, transparent 100%)`,
            transform: 'rotate(-20deg)',
            filter: 'blur(2px)',
            animationDelay: '1s',
          }}
        />
      </div>

      {/* Main Content - Glassmorphism Card */}
      <div 
        className="relative z-10 w-full max-w-2xl mx-4 px-8 py-12 md:px-16 md:py-16 rounded-3xl animate-fade-in"
        style={{
          background: 'hsl(var(--background) / 0.4)',
          backdropFilter: 'blur(20px)',
          border: `1px solid hsl(var(--primary) / 0.3)`,
          boxShadow: `
            0 0 80px hsl(var(--primary) / 0.15),
            0 0 40px hsl(var(--accent) / 0.1),
            inset 0 0 60px hsl(var(--primary) / 0.03)
          `,
        }}
        data-testid="glassmorphism-card"
      >
        <div className="flex flex-col items-center gap-8 md:gap-12 text-center">
          {/* Bold Neon Gradient Headline */}
          <h1
            className="text-5xl md:text-7xl font-extrabold leading-tight"
            style={{
              background: `linear-gradient(135deg, hsl(var(--accent)) 0%, hsl(var(--secondary)) 50%, hsl(var(--primary)) 100%)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              textShadow: `0 0 40px hsl(var(--accent) / 0.3)`,
              filter: `drop-shadow(0 0 20px hsl(var(--primary) / 0.4))`,
            }}
            data-testid="headline"
          >
            We're Under Maintenance
          </h1>

          {/* Elegant Subtext */}
          <p
            className="text-xl md:text-2xl font-light tracking-wide"
            style={{
              color: 'hsl(var(--foreground) / 0.8)',
              textShadow: `0 0 20px hsl(var(--foreground) / 0.2)`,
            }}
            data-testid="subtext"
          >
            We'll be back shortly
          </p>

          {/* Countdown Timer */}
          <div className="flex flex-col items-center gap-4" data-testid="countdown-timer">
            <div className="flex items-center gap-2">
              <Clock 
                className="w-5 h-5"
                style={{
                  color: 'hsl(var(--accent))',
                  filter: `drop-shadow(0 0 8px hsl(var(--accent) / 0.6))`,
                }}
              />
              <span
                className="text-xs md:text-sm font-medium tracking-widest uppercase"
                style={{
                  color: 'hsl(var(--muted-foreground))',
                  textShadow: `0 0 10px hsl(var(--muted-foreground) / 0.5)`,
                }}
              >
                Estimated Time Remaining
              </span>
            </div>
            
            <div className="flex items-center gap-2 md:gap-4">
              {/* Hours */}
              <div 
                className="flex flex-col items-center px-4 py-3 md:px-6 md:py-4 rounded-2xl"
                style={{
                  background: `hsl(var(--accent) / 0.05)`,
                  border: `1px solid hsl(var(--accent) / 0.2)`,
                  boxShadow: `0 0 20px hsl(var(--accent) / 0.1), inset 0 0 20px hsl(var(--accent) / 0.05)`,
                }}
              >
                <span
                  className="text-3xl md:text-5xl font-bold tabular-nums"
                  style={{
                    background: `linear-gradient(135deg, hsl(var(--accent)) 0%, hsl(var(--primary)) 100%)`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    filter: `drop-shadow(0 0 10px hsl(var(--accent) / 0.5))`,
                  }}
                  data-testid="countdown-hours"
                >
                  {String(timeRemaining.hours).padStart(2, '0')}
                </span>
                <span
                  className="text-xs md:text-sm font-light mt-1"
                  style={{
                    color: 'hsl(var(--muted-foreground))',
                  }}
                >
                  Hours
                </span>
              </div>

              {/* Separator */}
              <span
                className="text-2xl md:text-4xl font-bold"
                style={{
                  color: 'hsl(var(--secondary))',
                  filter: `drop-shadow(0 0 10px hsl(var(--secondary) / 0.5))`,
                }}
              >
                :
              </span>

              {/* Minutes */}
              <div 
                className="flex flex-col items-center px-4 py-3 md:px-6 md:py-4 rounded-2xl"
                style={{
                  background: `hsl(var(--secondary) / 0.05)`,
                  border: `1px solid hsl(var(--secondary) / 0.2)`,
                  boxShadow: `0 0 20px hsl(var(--secondary) / 0.1), inset 0 0 20px hsl(var(--secondary) / 0.05)`,
                }}
              >
                <span
                  className="text-3xl md:text-5xl font-bold tabular-nums"
                  style={{
                    background: `linear-gradient(135deg, hsl(var(--secondary)) 0%, hsl(var(--primary)) 100%)`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    filter: `drop-shadow(0 0 10px hsl(var(--secondary) / 0.5))`,
                  }}
                  data-testid="countdown-minutes"
                >
                  {String(timeRemaining.minutes).padStart(2, '0')}
                </span>
                <span
                  className="text-xs md:text-sm font-light mt-1"
                  style={{
                    color: 'hsl(var(--muted-foreground))',
                  }}
                >
                  Minutes
                </span>
              </div>

              {/* Separator */}
              <span
                className="text-2xl md:text-4xl font-bold"
                style={{
                  color: 'hsl(var(--primary))',
                  filter: `drop-shadow(0 0 10px hsl(var(--primary) / 0.5))`,
                }}
              >
                :
              </span>

              {/* Seconds */}
              <div 
                className="flex flex-col items-center px-4 py-3 md:px-6 md:py-4 rounded-2xl"
                style={{
                  background: `hsl(var(--primary) / 0.05)`,
                  border: `1px solid hsl(var(--primary) / 0.2)`,
                  boxShadow: `0 0 20px hsl(var(--primary) / 0.1), inset 0 0 20px hsl(var(--primary) / 0.05)`,
                }}
              >
                <span
                  className="text-3xl md:text-5xl font-bold tabular-nums"
                  style={{
                    background: `linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--accent)) 100%)`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    filter: `drop-shadow(0 0 10px hsl(var(--primary) / 0.5))`,
                  }}
                  data-testid="countdown-seconds"
                >
                  {String(timeRemaining.seconds).padStart(2, '0')}
                </span>
                <span
                  className="text-xs md:text-sm font-light mt-1"
                  style={{
                    color: 'hsl(var(--muted-foreground))',
                  }}
                >
                  Seconds
                </span>
              </div>
            </div>
          </div>

          {/* Additional Status Text */}
          <p
            className="text-sm md:text-base font-light opacity-70"
            style={{
              color: 'hsl(var(--muted-foreground))',
            }}
            data-testid="status-text"
          >
            Our team is working hard to bring you an improved experience
          </p>

          {/* Social Media Links */}
          <div className="flex flex-col items-center gap-4 mt-8" data-testid="social-links">
            <span
              className="text-xs md:text-sm font-medium tracking-widest uppercase"
              style={{
                color: 'hsl(var(--muted-foreground))',
              }}
            >
              Stay Connected
            </span>
            <div className="flex items-center gap-6">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative"
                data-testid="social-link-github"
              >
                <div
                  className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: 'radial-gradient(circle, hsl(var(--accent) / 0.3) 0%, transparent 70%)',
                    filter: 'blur(15px)',
                  }}
                />
                <SiGithub
                  className="w-7 h-7 md:w-8 md:h-8 relative z-10 transition-all duration-300"
                  style={{
                    color: 'hsl(var(--muted-foreground))',
                    filter: 'drop-shadow(0 0 0px transparent)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = 'hsl(var(--accent))';
                    e.currentTarget.style.filter = 'drop-shadow(0 0 15px hsl(var(--accent) / 0.8))';
                    e.currentTarget.style.transform = 'scale(1.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = 'hsl(var(--muted-foreground))';
                    e.currentTarget.style.filter = 'drop-shadow(0 0 0px transparent)';
                    e.currentTarget.style.transform = 'scale(1)';
                  }}
                />
              </a>

              <a
                href="https://discord.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative"
                data-testid="social-link-discord"
              >
                <div
                  className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: 'radial-gradient(circle, hsl(var(--primary) / 0.3) 0%, transparent 70%)',
                    filter: 'blur(15px)',
                  }}
                />
                <SiDiscord
                  className="w-7 h-7 md:w-8 md:h-8 relative z-10 transition-all duration-300"
                  style={{
                    color: 'hsl(var(--muted-foreground))',
                    filter: 'drop-shadow(0 0 0px transparent)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = 'hsl(var(--primary))';
                    e.currentTarget.style.filter = 'drop-shadow(0 0 15px hsl(var(--primary) / 0.8))';
                    e.currentTarget.style.transform = 'scale(1.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = 'hsl(var(--muted-foreground))';
                    e.currentTarget.style.filter = 'drop-shadow(0 0 0px transparent)';
                    e.currentTarget.style.transform = 'scale(1)';
                  }}
                />
              </a>

              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative"
                data-testid="social-link-x"
              >
                <div
                  className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: 'radial-gradient(circle, hsl(var(--secondary) / 0.3) 0%, transparent 70%)',
                    filter: 'blur(15px)',
                  }}
                />
                <SiX
                  className="w-7 h-7 md:w-8 md:h-8 relative z-10 transition-all duration-300"
                  style={{
                    color: 'hsl(var(--muted-foreground))',
                    filter: 'drop-shadow(0 0 0px transparent)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#ff006e';
                    e.currentTarget.style.filter = 'drop-shadow(0 0 15px hsl(var(--secondary) / 0.8))';
                    e.currentTarget.style.transform = 'scale(1.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = 'hsl(var(--muted-foreground))';
                    e.currentTarget.style.filter = 'drop-shadow(0 0 0px transparent)';
                    e.currentTarget.style.transform = 'scale(1)';
                  }}
                />
              </a>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
