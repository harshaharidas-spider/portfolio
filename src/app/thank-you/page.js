import Link from "next/link";

export const metadata = {
  title: "Thank you — Tony John",
  description: "Your consultation request has been received.",
};

export default function ThankYouPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-[#22363a] px-6 py-20 text-center">
      {/* Check badge */}
      <div className="w-16 h-16 rounded-full bg-[#d8e4c6] flex items-center justify-center shadow-lg">
        <svg
          className="w-8 h-8 text-[#1c2825]"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
        </svg>
      </div>

      <p className="mt-8 text-[11px] font-medium uppercase tracking-[0.18em] text-[#aecfbf]">
        Request received
      </p>
      <h1 className="mt-3 text-[32px] sm:text-[40px] font-semibold text-white leading-tight">
        Thank you!
      </h1>
      <p className="mt-4 max-w-[460px] text-[15px] sm:text-[16px] leading-relaxed text-white/60">
        Thanks for booking a consultation. I&rsquo;ve received your details and
        will personally get back to you within <strong className="text-white/80 font-medium">one business day</strong> to
        arrange a time that works for you.
      </p>

      <div className="mt-9 flex flex-col sm:flex-row items-center gap-4">
        <Link
          href="/"
          className="inline-flex items-center justify-center bg-[#d8e4c6] hover:bg-[#c9d7b5] text-[#1c2825] font-medium text-[14px] uppercase tracking-wide px-7 py-3.5 rounded-[2px] transition-colors"
        >
          Back to home
        </Link>
        <a
          href="mailto:tony@spiderworks.in"
          className="text-[14px] text-white/60 hover:text-white transition-colors"
        >
          Or email tony@spiderworks.in
        </a>
      </div>
    </main>
  );
}
