import { Loader2 } from "lucide-react";

export default function MaintenancePage() {
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    size: Math.random() * 4 + 2,
    left: Math.random() * 100,
    delay: Math.random() * 20,
    duration: Math.random() * 10 + 15,
  }));

  return (
    <div 
      className="relative min-h-screen w-full overflow-hidden flex items-center justify-center"
      style={{ 
        background: 'linear-gradient(to bottom, #0a0f1a 0%, #0d1219 50%, #0a0f1a 100%)',
        fontFamily: 'Space Grotesk, sans-serif'
      }}
      data-testid="maintenance-page"
    >
      {/* Animated Background Particles */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full animate-drift-up"
          style={{
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            left: `${particle.left}%`,
            background: 'radial-gradient(circle, rgba(0, 212, 255, 0.8) 0%, rgba(168, 85, 247, 0.4) 50%, transparent 70%)',
            boxShadow: '0 0 10px rgba(0, 212, 255, 0.5)',
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
            background: 'radial-gradient(circle, rgba(168, 85, 247, 0.3) 0%, transparent 70%)',
            filter: 'blur(40px)',
          }}
        />

        {/* Medium Circle - Bottom Left */}
        <div
          className="absolute -bottom-32 -left-32 w-80 h-80 rounded-full opacity-15 animate-float-slow"
          style={{
            background: 'radial-gradient(circle, rgba(0, 212, 255, 0.3) 0%, transparent 70%)',
            filter: 'blur(50px)',
          }}
        />

        {/* Hexagon Shape - Center Right */}
        <div
          className="absolute top-1/4 right-20 opacity-10 animate-float"
          style={{
            width: '200px',
            height: '200px',
            background: 'linear-gradient(135deg, rgba(255, 0, 110, 0.2) 0%, rgba(168, 85, 247, 0.2) 100%)',
            clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)',
            filter: 'blur(30px)',
          }}
        />

        {/* Cyberpunk Light Streaks */}
        <div
          className="absolute top-0 left-1/4 w-1 h-64 opacity-30 animate-pulse-glow"
          style={{
            background: 'linear-gradient(to bottom, transparent 0%, rgba(0, 212, 255, 0.6) 50%, transparent 100%)',
            transform: 'rotate(25deg)',
            filter: 'blur(2px)',
          }}
        />
        <div
          className="absolute bottom-0 right-1/3 w-1 h-80 opacity-25 animate-pulse-glow"
          style={{
            background: 'linear-gradient(to bottom, transparent 0%, rgba(255, 0, 110, 0.6) 50%, transparent 100%)',
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
          background: 'rgba(15, 23, 42, 0.4)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(168, 85, 247, 0.3)',
          boxShadow: `
            0 0 80px rgba(168, 85, 247, 0.15),
            0 0 40px rgba(0, 212, 255, 0.1),
            inset 0 0 60px rgba(168, 85, 247, 0.03)
          `,
        }}
        data-testid="glassmorphism-card"
      >
        <div className="flex flex-col items-center gap-8 md:gap-12 text-center">
          {/* Animated Progress Indicator */}
          <div 
            className="relative"
            data-testid="progress-indicator"
          >
            <div
              className="absolute inset-0 rounded-full animate-pulse-glow"
              style={{
                background: 'radial-gradient(circle, rgba(0, 212, 255, 0.3) 0%, transparent 70%)',
                filter: 'blur(20px)',
              }}
            />
            <Loader2 
              className="w-16 h-16 animate-spin relative z-10"
              style={{
                color: '#00d4ff',
                filter: 'drop-shadow(0 0 10px rgba(0, 212, 255, 0.8)) drop-shadow(0 0 20px rgba(168, 85, 247, 0.5))',
              }}
            />
          </div>

          {/* Bold Neon Gradient Headline */}
          <h1
            className="text-5xl md:text-7xl font-extrabold leading-tight"
            style={{
              background: 'linear-gradient(135deg, #00d4ff 0%, #ff006e 50%, #a855f7 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              textShadow: '0 0 40px rgba(0, 212, 255, 0.3)',
              filter: 'drop-shadow(0 0 20px rgba(168, 85, 247, 0.4))',
            }}
            data-testid="headline"
          >
            We're Under Maintenance
          </h1>

          {/* Elegant Subtext */}
          <p
            className="text-xl md:text-2xl font-light tracking-wide"
            style={{
              color: '#cbd5e1',
              textShadow: '0 0 20px rgba(203, 213, 225, 0.3)',
            }}
            data-testid="subtext"
          >
            We'll be back shortly
          </p>

          {/* Additional Status Text */}
          <p
            className="text-sm md:text-base font-light opacity-70"
            style={{
              color: '#94a3b8',
            }}
            data-testid="status-text"
          >
            Our team is working hard to bring you an improved experience
          </p>
        </div>
      </div>

      {/* Rotating Ring Decoration */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none animate-rotate-slow"
        style={{
          width: '600px',
          height: '600px',
          border: '1px solid rgba(168, 85, 247, 0.1)',
          borderRadius: '50%',
          boxShadow: '0 0 60px rgba(168, 85, 247, 0.1)',
        }}
      />
    </div>
  );
}
