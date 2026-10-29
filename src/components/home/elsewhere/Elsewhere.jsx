import Image from "next/image";
import Link from "next/link";

const socialCards = [
  {
    id: "youtube",
    title: "Portraits",
    category: "YOUTUBE",
    mediaType: "video",
    mediaSrc: "/reel1.mp4",
    watermarkSrc: "/youtube.png",
    bg: "bg-[#233838]",
    offsetClass: "lg:translate-y-0",
    href: "https://youtube.com",
    icon: (
      <svg className="w-4 h-4 text-white drop-shadow-sm" viewBox="0 0 24 24" fill="currentColor">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
  {
    id: "ruchi-on-reels",
    title: "Ruchi On Reels",
    category: "INSTAGRAM",
    mediaType: "video",
    mediaSrc: "/reel2.mp4",
    watermarkSrc: "/instagram.png",
    bg: "bg-[#aecfbf]",
    offsetClass: "lg:translate-y-[40px]",
    href: "https://instagram.com",
    icon: (
      <svg className="w-4 h-4 text-white drop-shadow-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    ),
  },
  {
    id: "facebook",
    title: "Facebook",
    category: "FACEBOOK",
    mediaType: "image",
    mediaSrc: "/reel3.png",
    watermarkSrc: "/facebook.png",
    bg: "bg-[#ede9e2]",
    offsetClass: "lg:translate-y-0",
    href: "https://facebook.com",
    icon: (
      <svg className="w-4 h-4 text-white drop-shadow-sm" viewBox="0 0 24 24" fill="currentColor">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    id: "linkedin",
    title: "LinkedIn",
    category: "LINKEDIN",
    mediaType: "video",
    mediaSrc: "/reel4.mp4",
    watermarkSrc: "/linkdin.png",
    bg: "bg-[#1c2825]",
    offsetClass: "lg:translate-y-[40px]",
    href: "https://linkedin.com",
    icon: (
      <svg className="w-4 h-4 text-white drop-shadow-sm" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
      </svg>
    ),
  },
  {
    id: "instagram",
    title: "Instagram",
    category: "INSTAGRAM",
    mediaType: "video",
    mediaSrc: "/reel5.mp4",
    watermarkSrc: "/instagram.png",
    bg: "bg-[#d8e4c6]",
    offsetClass: "lg:translate-y-0",
    href: "https://instagram.com",
    icon: (
      <svg className="w-4 h-4 text-white drop-shadow-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    ),
  },
];

export default function Elsewhere() {
  return (
    <section
      id="elsewhere"
      className="w-full bg-[#F4F2EE] py-16 sm:py-20 lg:py-24 overflow-hidden"
    >
      <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-[60px] xl:px-[75px]">
        {/* Top Header Row */}
        <div className="flex flex-col lg:flex-row items-start justify-between gap-8 lg:gap-14 mb-10 sm:mb-14">
          {/* Left: Tag & Main Heading */}
          <div className="flex flex-col items-start max-w-[560px]">
            <p className="text-[11.5px] uppercase tracking-[0.14em] font-medium text-[#777a78] mb-3 sm:mb-4">
              ELSEWHERE
            </p>
            <h2 className="text-[36px] sm:text-[44px] lg:text-[50px] font-bold leading-[1.08] tracking-tight text-[#1c1f1d]">
              <span className="block">Follow along,</span>
              <span className="block mt-0.5 text-[#9ea19d]">
                off the page.
              </span>
            </h2>
          </div>

          {/* Right: Subtitle Copy */}
          <div className="flex flex-col items-start lg:items-start lg:pt-6 max-w-[420px]">
            <p className="text-[13.5px] sm:text-[14px] text-[#6b726f] leading-[1.5]">
              Portraits on YouTube, reels on Instagram, and the day-to-day on
              Facebook, LinkedIn and Instagram. A quick look here ; the full feeds
              are a tap away.
            </p>
          </div>
        </div>

        {/* 5 Cards Row: Horizontal snap carousel on mobile, High/Low staggered on desktop matching Figma */}
        <div className="flex overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden pb-4 snap-x snap-mandatory lg:overflow-visible lg:flex-nowrap lg:justify-between lg:pb-0 gap-4 sm:gap-6 lg:gap-4 xl:gap-6 items-start w-full">
          {socialCards.map((card) => (
            <a
              key={card.id}
              href={card.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`snap-start w-[200px] sm:w-[220px] flex-none flex flex-col justify-between group focus:outline-none select-none transition-transform duration-300 ${card.offsetClass}`}
            >
              {/* Media Card Box: Exact Figma specs 220px x 220px, Radius 8px */}
              <div
                className={`relative w-[220px] h-[220px] ${card.bg} rounded-[8px] p-4 flex flex-col justify-between overflow-hidden shadow-sm`}
              >
                {/* Background Grain Texture Overlay */}
                <div
                  className="absolute inset-0 pointer-events-none z-[2]"
                  style={{
                    backgroundImage: "url('/grain.png')",
                    backgroundRepeat: "repeat",
                    backgroundSize: "256px 256px",
                    opacity: 0.12,
                  }}
                  aria-hidden="true"
                />

                {/* Embedded Video (Cards 1, 2, 4, 5) */}
                {card.mediaType === "video" && (
                  <video
                    src={card.mediaSrc}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover rounded-[8px] z-0"
                  />
                )}

                {/* Embedded Image (Card 3: reel3.png) */}
                {card.mediaType === "image" && (
                  <Image
                    src={card.mediaSrc}
                    alt={card.title}
                    width={220}
                    height={220}
                    className="absolute inset-0 w-full h-full object-cover rounded-[8px] z-0"
                  />
                )}

                {/* Subtle dark vignette overlay for legibility */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/55 rounded-[8px] z-[1] pointer-events-none" />

                {/* Card Top Row: Brand Icon */}
                <div className="relative z-10 flex items-center justify-between w-full">
                  <div className="text-white drop-shadow-sm">{card.icon}</div>
                </div>

                {/* Bottom-right authentic watermark image from public */}
                {card.watermarkSrc && (
                  <div className="absolute -bottom-2 -right-2 w-[100px] h-[100px] pointer-events-none z-10 opacity-30 select-none">
                    <Image
                      src={card.watermarkSrc}
                      alt=""
                      width={120}
                      height={120}
                      className="w-full h-full object-contain drop-shadow-md"
                    />
                  </div>
                )}
              </div>

              {/* Text & Action Row below card */}
              <div className="flex items-center justify-between mt-3 px-0.5 w-full">
                <div>
                  <h3 className="text-[15px] sm:text-[15.5px] font-bold text-[#1c1f1d] leading-tight group-hover:text-black transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-[10px] uppercase tracking-[0.14em] font-semibold text-[#7c8380] mt-0.5">
                    {card.category}
                  </p>
                </div>

                {/* Circular Arrow Button: 36px x 36px border 1px #85A596 */}
                <div className="w-[34px] h-[34px] rounded-full border border-[#85A596] group-hover:border-[#1c1f1d] group-hover:bg-[#1c1f1d] group-hover:text-white flex items-center justify-center text-[#555] transition-all shrink-0">
                  <svg
                    className="w-3.5 h-3.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
