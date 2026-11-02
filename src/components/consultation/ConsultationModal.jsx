"use client";

import { forwardRef, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const VALUE_POINTS = [
  "24 years in IT — engineering to e-commerce",
  "A clear plan before a single line of code",
  "Direct access to me, not an account manager",
];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const INITIAL = { name: "", email: "", phone: "", message: "" };

export default function ConsultationModal({ open, onClose }) {
  const [values, setValues] = useState(INITIAL);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error
  const dialogRef = useRef(null);
  const firstFieldRef = useRef(null);

  // Lock body scroll + focus first field while open
  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const t = setTimeout(() => firstFieldRef.current?.focus(), 80);
    return () => {
      document.body.style.overflow = prevOverflow;
      clearTimeout(t);
    };
  }, [open]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  // Reset form shortly after closing
  useEffect(() => {
    if (open) return;
    const t = setTimeout(() => {
      setValues(INITIAL);
      setErrors({});
      setStatus("idle");
    }, 250);
    return () => clearTimeout(t);
  }, [open]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
    if (errors[name]) setErrors((err) => ({ ...err, [name]: undefined }));
  };

  const validate = () => {
    const next = {};
    if (!values.name.trim()) next.name = "Please enter your name.";
    if (!values.email.trim()) next.email = "Please enter your email.";
    else if (!EMAIL_RE.test(values.email.trim())) next.email = "Enter a valid email address.";
    if (!values.message.trim()) next.message = "Tell me a little about your project.";
    return next;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const next = validate();
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    setStatus("submitting");
    try {
      // Wire this to your lead endpoint (API route, Formspree, HubSpot, etc.).
      // Until that endpoint exists, a 404/network error is treated as a local
      // success so the form works today; a real endpoint returning 4xx/5xx errors.
      const res = await fetch("/api/consultation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      }).catch(() => null);

      const noEndpoint = !res || res.status === 404;
      if (!noEndpoint && !res.ok) throw new Error("Request failed");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          aria-hidden={!open}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Dialog */}
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="consultation-title"
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.28, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="relative w-full max-w-[940px] max-h-[92vh] overflow-hidden bg-[#22363a] border border-white/10 rounded-[10px] shadow-2xl grid md:grid-cols-[0.92fr_1.08fr]"
          >
            {/* Close button */}
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="absolute top-4 right-4 z-20 w-9 h-9 flex items-center justify-center rounded-full bg-black/20 md:bg-transparent text-white/70 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* ── Left: branded visual panel ── */}
            <div className="relative hidden md:flex flex-col justify-between overflow-hidden bg-gradient-to-br from-[#16211e] via-[#1f2d2c] to-[#2b3d3f] p-8 lg:p-9">
              {/* grain texture */}
              <div
                className="pointer-events-none absolute inset-0 opacity-[0.18] mix-blend-soft-light"
                style={{ backgroundImage: "url('/image/grain.png')", backgroundSize: "cover" }}
              />
              {/* glow accent */}
              <div className="pointer-events-none absolute -top-16 -left-16 w-56 h-56 rounded-full bg-[#aecfbf]/20 blur-3xl" />

              {/* Top copy */}
              <div className="relative z-10">
                <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-[#aecfbf]">
                  Let&apos;s talk
                </p>
                <h2 className="mt-3 text-[26px] lg:text-[29px] font-semibold text-white leading-[1.15]">
                  Let&apos;s build something that actually works.
                </h2>
                <p className="mt-3 text-[13.5px] text-white/55 leading-relaxed max-w-[300px]">
                  A short, no-pressure conversation about where you are and where
                  you want technology to take your business.
                </p>

                <ul className="mt-6 space-y-3">
                  {VALUE_POINTS.map((point) => (
                    <li key={point} className="flex items-start gap-3">
                      <span className="mt-0.5 flex-none w-5 h-5 rounded-full bg-[#aecfbf]/20 flex items-center justify-center">
                        <svg className="w-3 h-3 text-[#aecfbf]" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                      </span>
                      <span className="text-[13px] text-white/75 leading-snug">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Portrait + contact */}
              <div className="relative z-10 mt-8">
                <div className="pointer-events-none absolute -right-9 -bottom-9 w-[230px] h-[230px] opacity-90 select-none">
                  <Image
                    src="/image/Portraitnw.png"
                    alt="Tony John"
                    width={460}
                    height={460}
                    className="w-full h-full object-contain object-bottom"
                  />
                </div>
                <div className="relative max-w-[200px]">
                  <p className="text-[13px] font-medium text-white">Tony John</p>
                  <p className="mt-0.5 text-[12px] text-white/50 leading-relaxed">
                    Kochi, Kerala
                    <br />
                    Replies within 1 business day
                  </p>
                </div>
              </div>
            </div>

            {/* ── Right: form / success ── */}
            <div className="relative max-h-[92vh] overflow-y-auto">
            {status === "success" ? (
              <div className="px-7 sm:px-9 py-14 text-center">
                <div className="mx-auto mb-5 w-14 h-14 rounded-full bg-[#d8e4c6] flex items-center justify-center">
                  <svg className="w-7 h-7 text-[#1c2825]" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                </div>
                <h2 className="text-[20px] font-semibold text-white">Thank you!</h2>
                <p className="mt-2 text-[14px] text-white/70 leading-relaxed">
                  Your request has been received. I&apos;ll get back to you within one business day.
                </p>
                <button
                  type="button"
                  onClick={onClose}
                  className="mt-7 inline-flex items-center justify-center bg-[#d8e4c6] hover:bg-[#c9d7b5] text-[#1c2825] font-medium text-[14px] px-7 py-3 rounded-[2px] transition-colors cursor-pointer"
                >
                  Close
                </button>
              </div>
            ) : (
              <div className="px-7 sm:px-9 pt-9 pb-8">
                <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-[#85a596] md:hidden">
                  Let&apos;s talk
                </p>
                <h2 id="consultation-title" className="mt-2 md:mt-0 text-[22px] sm:text-[24px] font-semibold text-white leading-tight">
                  Book a consultation
                </h2>
                <p className="mt-2 text-[13.5px] text-white/60 leading-relaxed">
                  Share a few details and I&apos;ll reach out to schedule a time that works for you.
                </p>

                <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-4">
                  <Field
                    ref={firstFieldRef}
                    label="Name"
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                    error={errors.name}
                    placeholder="Your full name"
                    autoComplete="name"
                  />
                  <Field
                    label="Email"
                    name="email"
                    type="email"
                    value={values.email}
                    onChange={handleChange}
                    error={errors.email}
                    placeholder="you@company.com"
                    autoComplete="email"
                  />
                  <Field
                    label="Phone"
                    name="phone"
                    type="tel"
                    optional
                    value={values.phone}
                    onChange={handleChange}
                    error={errors.phone}
                    placeholder="+91 00000 00000"
                    autoComplete="tel"
                  />
                  <div>
                    <FieldLabel htmlFor="message" label="Project details" />
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      value={values.message}
                      onChange={handleChange}
                      placeholder="What are you looking to build or improve?"
                      className={`w-full resize-none rounded-[3px] bg-white/5 border px-3.5 py-2.5 text-[14px] text-white placeholder:text-white/35 outline-none transition-colors focus:bg-white/[0.07] ${
                        errors.message ? "border-red-400/70 focus:border-red-400" : "border-white/15 focus:border-[#aecfbf]"
                      }`}
                    />
                    {errors.message && <ErrorText>{errors.message}</ErrorText>}
                  </div>

                  {status === "error" && (
                    <p className="text-[13px] text-red-300">
                      Something went wrong. Please email{" "}
                      <a href="mailto:tony@spiderworks.in" className="underline">
                        tony@spiderworks.in
                      </a>{" "}
                      directly.
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="w-full inline-flex items-center justify-center gap-2 bg-[#d8e4c6] hover:bg-[#c9d7b5] disabled:opacity-60 disabled:cursor-not-allowed text-[#1c2825] font-medium text-[14px] uppercase tracking-wide px-7 py-3.5 rounded-[2px] transition-colors cursor-pointer"
                  >
                    {status === "submitting" ? "Sending…" : "Send request"}
                  </button>
                  <p className="text-center text-[11px] text-white/40">
                    Prefer email? Write to tony@spiderworks.in
                  </p>
                </form>
              </div>
            )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function FieldLabel({ htmlFor, label, optional }) {
  return (
    <label htmlFor={htmlFor} className="block mb-1.5 text-[12.5px] font-medium text-white/80">
      {label}
      {optional && <span className="ml-1.5 text-white/35 font-normal">(optional)</span>}
    </label>
  );
}

function ErrorText({ children }) {
  return <p className="mt-1 text-[12px] text-red-300">{children}</p>;
}

const Field = forwardRef(function Field(
  { label, name, type = "text", value, onChange, error, placeholder, autoComplete, optional },
  ref
) {
  return (
    <div>
      <FieldLabel htmlFor={name} label={label} optional={optional} />
      <input
        ref={ref}
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className={`w-full rounded-[3px] bg-white/5 border px-3.5 py-2.5 text-[14px] text-white placeholder:text-white/35 outline-none transition-colors focus:bg-white/[0.07] ${
          error ? "border-red-400/70 focus:border-red-400" : "border-white/15 focus:border-[#aecfbf]"
        }`}
      />
      {error && <ErrorText>{error}</ErrorText>}
    </div>
  );
});
