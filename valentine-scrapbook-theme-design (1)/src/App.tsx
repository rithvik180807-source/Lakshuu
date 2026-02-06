import { useState, useEffect, useRef } from "react";

/* ═══════════════════════════════════════════════════
   🖼️  HOW TO USE YOUR OWN IMAGES:
   
   1. Put your image files in the "src/images/" folder
   2. Name them:
      - header.jpg  (or .png, .webp) — the large top background
      - photo1.jpg  (or .png, .webp) — left polaroid photo
      - photo2.jpg  (or .png, .webp) — right polaroid photo
   3. Update the import lines below to match your file names
   
   Example: If your files are "mycouple.jpg", "date1.png", "date2.png":
      import headerImg from "./images/mycouple.jpg";
      import photo1Img from "./images/date1.png";
      import photo2Img from "./images/date2.png";
   ═══════════════════════════════════════════════════ */

// 🔽 CHANGE THESE IMPORTS to point to your own image files:
import headerImg from "./images/Headerr.jpeg";
import photo1Img from "./images/Hug.jpeg";
import photo2Img from "./images/kiss.jpeg";

const IMAGES = {
  header: headerImg,
  photo1: photo1Img,
  photo2: photo2Img,
};

/* You can also change the text below the main title */
const SUBTITLE_TEXT = "2 years together";
const PHOTO1_CAPTION = "quiet moments";
const PHOTO2_CAPTION = "always together";

/* ═══════════════════════════════════════════════════ */

/* ───────── Intersection observer hook ───────── */
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

/* ───────── Tiny heart SVG ───────── */
function Heart({ className = "", size = 16 }: { className?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="#c41e3a" className={className}>
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
  );
}

/* ───────── Floating particle hearts (very subtle) ───────── */
function FloatingParticles() {
  const particles = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    left: 10 + Math.random() * 80,
    top: 10 + Math.random() * 80,
    delay: Math.random() * 6,
    duration: 5 + Math.random() * 4,
    size: 6 + Math.random() * 8,
    opacity: 0.06 + Math.random() * 0.08,
  }));
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute animate-float"
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            opacity: p.opacity,
          }}
        >
          <Heart size={p.size} />
        </div>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   MAIN APP
   ═══════════════════════════════════════════════════ */
export function App() {
  const [loaded, setLoaded] = useState(false);
  const centerRef = useInView(0.2);
  const photosRef = useInView(0.15);
  const titleRef = useInView(0.3);
  const bottomRef = useInView(0.3);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 300);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0a] relative">
      <FloatingParticles />

      {/* ═══════ OUTER BLACK FRAME ═══════ */}
      <div className="max-w-[900px] mx-auto px-4 sm:px-6 py-8 sm:py-12 relative z-10">

        {/* ─── TOP: Faded B&W couple scene that blurs into the paper ─── */}
        <div
          className={`relative w-full overflow-hidden transition-all duration-[2000ms] header-blur-fade ${loaded ? "opacity-100" : "opacity-0"
            }`}
          style={{ aspectRatio: "16 / 10" }}
        >
          <div className="absolute inset-0 vignette">
            <img
              src={IMAGES.header}
              alt="Couple intimate moment"
              className="w-full h-full object-cover grayscale brightness-[0.55] contrast-110"
            />
          </div>
          {/* Blur layer at the bottom of the image */}
          <div className="header-blur-layer" />
        </div>

        {/* ─── PAPER BODY (seamlessly merged from the blurred header) ─── */}
        <div
          ref={centerRef.ref}
          className={`relative z-10 transition-all duration-1000 ${centerRef.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
        >

          {/* Paper body */}
          <div className="bg-[#f0ebe2] paper-texture relative px-6 sm:px-12 md:px-20 py-8 sm:py-14">

            {/* Grain / texture overlay */}
            <div className="absolute inset-0 grain-overlay opacity-30 pointer-events-none" />

            {/* ── Two rectangular photos side-by-side ── */}
            <div
              ref={photosRef.ref}
              className={`flex flex-col sm:flex-row items-center justify-center gap-5 sm:gap-8 mb-10 sm:mb-14 transition-all duration-1000 delay-300 ${photosRef.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
            >
              {/* Photo 1 — quiet & close */}
              <div className="polaroid-shadow bg-white p-2 pb-8 sm:p-3 sm:pb-10 transform -rotate-2 hover:rotate-0 transition-transform duration-500 animate-sway" style={{ animationDelay: "0s" }}>
                <div className="w-44 h-56 sm:w-52 sm:h-64 overflow-hidden relative">
                  <img
                    src={IMAGES.photo1}
                    alt="Quiet close moment"
                    className="w-full h-full object-cover grayscale"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/10" />
                </div>
                <p className="font-script text-valentine text-sm sm:text-base text-center mt-2 sm:mt-3 opacity-70">
                  {PHOTO1_CAPTION}
                </p>
              </div>

              {/* Photo 2 — casual warmth */}
              <div className="polaroid-shadow bg-white p-2 pb-8 sm:p-3 sm:pb-10 transform rotate-2 hover:rotate-0 transition-transform duration-500 animate-sway" style={{ animationDelay: "1s" }}>
                <div className="w-44 h-56 sm:w-52 sm:h-64 overflow-hidden relative">
                  <img
                    src={IMAGES.photo2}
                    alt="Casual warm moment"
                    className="w-full h-full object-cover grayscale"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/10" />
                </div>
                <p className="font-script text-valentine text-sm sm:text-base text-center mt-2 sm:mt-3 opacity-70">
                  {PHOTO2_CAPTION}
                </p>
              </div>
            </div>

            {/* ── Main handwritten red title ── */}
            <div
              ref={titleRef.ref}
              className={`relative text-center my-6 sm:my-10 transition-all duration-1000 delay-500 ${titleRef.visible ? "opacity-100 scale-100" : "opacity-0 scale-95"
                }`}
            >
              {/* Subtle shadow/glow behind text */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-80 h-24 bg-valentine/5 rounded-full blur-3xl" />
              </div>

              <h1
                className="font-script text-valentine relative z-10 leading-tight"
                style={{ fontSize: "clamp(2.8rem, 8vw, 5.5rem)" }}
              >
                Happy Valentine&apos;s Day
              </h1>

              {/* Small decorative hearts around the title */}
              <Heart className="absolute -top-2 -left-2 sm:left-4 opacity-20 animate-heartbeat" size={14} />
              <Heart className="absolute -bottom-1 -right-1 sm:right-6 opacity-15 animate-heartbeat" size={12} />
            </div>

            {/* ── "2 years together" + red line ── */}
            <div
              ref={bottomRef.ref}
              className={`text-center mt-8 sm:mt-12 mb-4 transition-all duration-1000 delay-700 ${bottomRef.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                }`}
            >
              <p className="font-serif text-[#3a3a3a] text-sm sm:text-base tracking-[0.25em] uppercase">
                {SUBTITLE_TEXT}
              </p>
              <div className="flex justify-center mt-4">
                <div
                  className={`h-[1.5px] bg-valentine/60 ${bottomRef.visible ? "animate-draw-line" : "w-0"
                    }`}
                />
              </div>
              {/* Tiny heart underneath */}
              <div className="mt-5 flex justify-center">
                <Heart className="opacity-25 animate-heartbeat" size={10} />
              </div>
            </div>
          </div>

          {/* Torn bottom edge */}
          <div className="torn-bottom h-10 bg-[#f0ebe2]" />
        </div>

        {/* ─── BOTTOM BLACK SPACE ─── */}
        <div className="mt-8 sm:mt-12 text-center">
          <p className="font-elegant text-[#444] text-xs sm:text-sm tracking-[0.3em] uppercase">
            made with love
          </p>
          <div className="mt-3 flex justify-center gap-2">
            {[0, 1, 2].map((i) => (
              <Heart key={i} size={8} className={i === 1 ? "opacity-40" : "opacity-15"} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
