import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative w-full bg-[#2b3d3f] overflow-hidden min-h-[calc(100vh-50px)] lg:min-h-[720px] flex items-center">
      {/* Background Grain Texture Overlay (Figma: Scale: Tile, Opacity: 14%) */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: "url('/grain.png')",
          backgroundRepeat: "repeat",
          backgroundSize: "256px 256px",
          opacity: 0.14,
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-[46px] py-6 sm:py-8 lg:py-6">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-0 w-full relative">
          {/* Left Column: Heading, Subtitle & Buttons */}
          <div className="w-full lg:w-[620px] xl:w-[680px] 2xl:w-[710px] flex-none flex flex-col justify-center z-10">
            {/* Main Headline with exact Figma specs: Roboto 700, 96px, 100% line height, -5% letter spacing */}
            <h1 className="text-[#eef0ec] font-bold text-[38px] sm:text-[60px] md:text-[76px] lg:text-[88px] xl:text-[96px] leading-[105%] tracking-[-0.05em] lg:whitespace-nowrap">
              <span className="block lg:inline">Hi, I am </span>
              <span className="block lg:inline">Tony John</span>
            </h1>

            {/* Subtitle description with exact Figma specs: Roboto 400, 16px, 145% line height, -3% letter spacing, max-w-[631px] */}
            <p className="mt-6 sm:mt-7 text-[15px] sm:text-[16px] text-[#c1ccc9] leading-[150%] tracking-[-0.03em] font-normal max-w-[580px]">
              Twenty-four years in IT -engineer, e-commerce consultant, digital
              marketer. I bring an engineer&apos;s way of thinking to business,
              digital marketing and the people I mentor.
            </p>

            {/* Action Buttons */}
            <div className="mt-8 sm:mt-10 lg:mt-12 flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-8 w-full sm:w-auto">
              {/* Primary Consultation Button */}
              <Link
                href="#contact"
                className="w-full sm:w-auto inline-flex items-center justify-center bg-[#d8e4c6] hover:bg-[#c9d7b5] text-[#1c2825] font-semibold text-[13px] tracking-[0.06em] uppercase px-7 py-4 transition-colors rounded-none shadow-sm text-center"
              >
                BOOK A CONSULTATION
              </Link>

              {/* Secondary Explore Spiderworks Button with Arrow Box */}
              <Link
                href="#spiderworks"
                className="w-full sm:w-auto group inline-flex items-center justify-center sm:justify-start gap-3 text-[#dce6e3] hover:text-white font-medium text-[13px] tracking-[0.06em] uppercase transition-colors py-2 sm:py-0"
              >
                <span>EXPLORE SPIDERWORKS</span>
                <span className="w-7 h-7 border border-white/40 flex items-center justify-center text-white/80 group-hover:border-white group-hover:text-white transition-colors">
                  <svg
                    className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                    />
                  </svg>
                </span>
              </Link>
            </div>
          </div>

          {/* Right Column: Hero Image (Enlarged with Table Attached in Portraitnw.png) */}
          <div className="w-full lg:flex-1 flex justify-center lg:justify-end items-center relative mt-6 lg:mt-0">
            <div className="relative w-full max-w-[420px] sm:max-w-[620px] md:max-w-[740px] lg:max-w-[880px] xl:max-w-[980px] 2xl:max-w-[1060px] flex-none select-none lg:-translate-x-8 xl:-translate-x-12 2xl:-translate-x-16">
              {/* Tony John Image with integrated desk */}
              <div className="relative z-10 w-full select-none block leading-none">
                <Image
                  src="/Portraitnw.png"
                  alt="Tony John working at laptop on phone call"
                  width={730}
                  height={580}
                  priority
                  className="w-full h-auto object-contain block select-none pointer-events-none"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
