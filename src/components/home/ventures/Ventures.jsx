import Image from "next/image";
import Link from "next/link";

export default function Ventures() {
  const bottomVentures = [
    { name: "SpiderWorks", meta: "Kochi · Nevada" },
    { name: "Brandaware", meta: "sister concern" },
    { name: "HatchingWeb", meta: "sister concern" },
    { name: "Digital Skill Master", meta: "sister concern" },
  ];

  return (
    <section
      id="ventures"
      className="relative w-full bg-[#22363A] overflow-hidden py-16 sm:py-20 lg:py-28 min-h-[640px] flex flex-col justify-between"
    >
      <span id="spiderworks" className="-top-20 relative block" aria-hidden="true" />
      {/* Background Grain Texture Overlay */}
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

      {/* Main Content Area */}
      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-[75px] my-auto py-6 lg:py-0">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-12 lg:gap-16">
          {/* Left Column: Static Heading, Description & Button */}
          <div className="w-full lg:w-[500px] xl:w-[540px] flex-none flex flex-col items-start">
            {/* Main Headline */}
            <h2 className="text-[34px] sm:text-[42px] lg:text-[48px] font-bold leading-[1.12] tracking-tight">
              <span className="text-white block">One idea.</span>
              <span className="text-[#96aca7] block mt-1">
                A world of possibilities.
              </span>
            </h2>

            {/* Description Paragraph */}
            <p className="mt-8 text-[14.5px] sm:text-[15.5px] text-[#93a7a3] leading-[1.7] max-w-[480px]">
              SpiderWorks grew out of years spent understanding how the web works.
              Today, it brings technology, creativity and marketing together to
              help businesses grow from Kochi, for clients across India, the UAE
              and the UK.
            </p>

            {/* Rectangular Action Button (Figma: rounded-none, #d8e4c6) */}
            <div className="mt-8 sm:mt-12 w-full sm:w-auto">
              <Link
                href="#contact"
                className="w-full sm:w-auto inline-flex items-center justify-center bg-[#d8e4c6] text-[#1c2825] font-semibold text-[13px] tracking-[0.06em] uppercase px-7 py-4 rounded-none shadow-sm hover:bg-[#c9d7b5] transition-colors"
              >
                EXPLORE SPIDERWORKS
              </Link>
            </div>
          </div>

          {/* Right Column: Static Mint Venture Card with Visual.png Background Pattern */}
          <div className="w-full lg:flex-1 flex justify-center lg:justify-end items-center relative">
            <div className="relative w-[587px] max-w-full h-[367px] flex items-center justify-center">
              {/* Authentic Visual.png Digital Matrix Pattern Background (587px x 367px) */}
              <div
                className="absolute inset-0 pointer-events-none z-0 overflow-hidden flex items-center justify-center"
                aria-hidden="true"
              >
                <Image
                  src="/Visual.png"
                  alt=""
                  width={587}
                  height={367}
                  className="w-full h-full object-contain select-none"
                  priority
                />
              </div>

              {/* Static Mint Venture Card (Exact Figma Specs: 305px x 298px, solid #AECFBF, no shadow, no dots) */}
              <div className="relative z-10 w-[305px] max-w-[92%] h-[298px] bg-[#aecfbf] p-[28px] flex flex-col justify-between rounded-[4px]">
                {/* Top: Brand Title & Subtitle */}
                <div>
                  <h3 className="font-bold text-[28px] text-[#1c2825] leading-none tracking-tight">
                    SpiderWorks
                  </h3>
                  <p className="uppercase text-[9.5px] tracking-[0.18em] font-semibold text-[#384e48] mt-2">
                    TECHNOLOGIES &middot; EST. 2005
                  </p>
                </div>

                {/* Bottom: 3 Key Pillars */}
                <ul className="space-y-2.5">
                  <li className="flex items-baseline">
                    <span className="text-[11.5px] font-normal text-[#48625b] w-6 flex-none select-none">
                      01
                    </span>
                    <span className="text-[15.5px] font-semibold text-[#1c2825] tracking-tight">
                      Technology
                    </span>
                  </li>
                  <li className="flex items-baseline">
                    <span className="text-[11.5px] font-normal text-[#48625b] w-6 flex-none select-none">
                      02
                    </span>
                    <span className="text-[15.5px] font-semibold text-[#1c2825] tracking-tight">
                      Creativity
                    </span>
                  </li>
                  <li className="flex items-baseline">
                    <span className="text-[11.5px] font-normal text-[#48625b] w-6 flex-none select-none">
                      03
                    </span>
                    <span className="text-[15.5px] font-semibold text-[#1c2825] tracking-tight">
                      Growth
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Row: Static 4 Sister Concerns Grid (Bordered columns and row matching Figma) */}
      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-[75px] pt-12 sm:pt-16 pb-4">
        <div className="w-full border border-white/15 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y divide-white/15 sm:divide-y-0">
          {bottomVentures.map((item, index) => (
            <div
              key={item.name}
              className={`flex items-center justify-between px-5 sm:px-6 lg:px-7 xl:px-8 py-4 sm:py-6 select-none ${
                index % 2 === 1 ? "sm:border-l sm:border-white/15" : ""
              } ${
                index >= 2 ? "sm:border-t sm:border-white/15 lg:border-t-0" : ""
              } ${
                index === 2 ? "lg:border-l lg:border-white/15" : ""
              }`}
            >
              <span className="text-[15px] sm:text-[16px] font-semibold tracking-tight text-white">
                {item.name}
              </span>
              <span className="text-[11px] sm:text-[11.5px] font-normal text-[#7a908c] whitespace-nowrap">
                {item.meta}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
