export default function Numbers() {
  const stats = [
    {
      number: "1996",
      label: "In IT since",
    },
    {
      number: "24+",
      label: "Years of experience",
    },
    {
      number: "13",
      label: "Subject areas of deep expertise",
    },
    {
      number: "07",
      label: "Portals & companies built",
    },
  ];

  return (
    <section id="numbers" className="w-full bg-[#f4f2ee] py-16 sm:py-20 lg:py-28">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-[75px]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-start">
          {/* Left Column: Label & Heading (Top-aligned) */}
          <div className="lg:col-span-5 flex flex-col items-start pt-1">
            <p className="text-[12px] uppercase tracking-[0.1em] font-medium text-[#777a78] mb-6 sm:mb-8">
              NUMBERS
            </p>
            <h2 className="text-[32px] sm:text-[38px] lg:text-[44px] font-bold leading-[1.12] tracking-[-0.03em]">
              <span className="text-[#1c1f1d] block">Long experience,</span>
              <span className="text-[#a3a3a0] block mt-1">better outcomes.</span>
            </h2>
          </div>

          {/* Right Column: 4 Stat Tiles (Exact Figma specs: 330px x 210px, 1px border #85A596) */}
          <div className="lg:col-span-7 flex justify-center lg:justify-end">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 w-full sm:w-auto">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="w-full sm:w-[330px] h-[210px] border border-[#85A596] flex flex-col items-center justify-center px-6 text-center"
                >
                  <span className="text-[#85A596] text-[46px] sm:text-[52px] font-medium leading-none tracking-tight">
                    {stat.number}
                  </span>
                  <span className="text-[#505552] text-[13px] sm:text-[13.5px] font-normal mt-4 leading-snug max-w-[220px]">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
