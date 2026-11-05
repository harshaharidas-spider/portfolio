"use client";

import { forwardRef, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import ReCAPTCHA from "react-google-recaptcha";

const LEAD_URL =
  "https://api.nexus.spiderworks.org/api/save_lead?client_token=0305ead9-fd5c-4bf4-b654-e454724620b0&form_id=36f8cf7b-30ab-4377-ae72-17fac2aa9cbc";

const VALUE_POINTS = [
  "24 years in IT — engineering to e-commerce",
  "A clear plan before a single line of code",
  "Direct access to me, not an account manager",
];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const INITIAL = { name: "", email: "", phone: "", message: "" };

// Dark-theme phone input styles + hidden reCAPTCHA badge (kept here so no other file is needed)
const PHONE_CSS = `
.react-tel-input .rpi-input {
  width: 100% !important;
  height: auto !important;
  padding: 10px 14px 10px 58px !important;
  font-size: 14px !important;
  color: #fff !important;
  background: rgba(255, 255, 255, 0.05) !important;
  border: 1px solid rgba(255, 255, 255, 0.15) !important;
  border-radius: 3px !important;
}
.react-tel-input .rpi-input:focus {
  background: rgba(255, 255, 255, 0.07) !important;
  border-color: #aecfbf !important;
  box-shadow: none !important;
}
.react-tel-input .rpi-button {
  background: transparent !important;
  border: 1px solid rgba(255, 255, 255, 0.15) !important;
  border-right: none !important;
  border-radius: 3px 0 0 3px !important;
}
.react-tel-input .flag-dropdown.open .selected-flag,
.react-tel-input .selected-flag:hover,
.react-tel-input .selected-flag:focus {
  background: rgba(255, 255, 255, 0.08) !important;
}
.react-tel-input .rpi-dropdown {
  background: #1f2d2c !important;
  color: #fff !important;
  border: 1px solid rgba(255, 255, 255, 0.15) !important;
}
.react-tel-input .rpi-dropdown .country:hover,
.react-tel-input .rpi-dropdown .country.highlight {
  background: rgba(255, 255, 255, 0.1) !important;
}
.react-tel-input .rpi-dropdown .country .dial-code { color: rgba(255, 255, 255, 0.5) !important; }
.react-tel-input .rpi-dropdown .search { background: #1f2d2c !important; }
.react-tel-input .rpi-search {
  background: rgba(255, 255, 255, 0.05) !important;
  color: #fff !important;
  border: 1px solid rgba(255, 255, 255, 0.15) !important;
}
.grecaptcha-badge {
  visibility: hidden !important;
}
`;

export default function ConsultationModal({ open, onClose }) {
  const [values, setValues] = useState(INITIAL);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | submitting | error
  const dialogRef = useRef(null);
  const firstFieldRef = useRef(null);
  const recaptchaRef = useRef(null);
  const router = useRouter();

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

  const handlePhoneChange = (value, country) => {
    // value is digits only, e.g. "919876543210".
    // If only the dial code is present, treat it as empty (phone is optional).
    const onlyDialCode = value === country?.dialCode;
    setValues((v) => ({ ...v, phone: onlyDialCode || !value ? "" : `+${value}` }));
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
      // Invisible reCAPTCHA: runs automatically on submit and returns a token.
      const token = await recaptchaRef.current.executeAsync();
      recaptchaRef.current.reset(); // tokens are single-use

      if (!token) throw new Error("Captcha failed");

      const res = await fetch(LEAD_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, recaptcha_token: token }),
      });

      if (!res.ok) throw new Error("Request failed");
      onClose();
      router.push("/thank-you");
    } catch {
      recaptchaRef.current?.reset();
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
          <style>{PHONE_CSS}</style>

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

            {/* ── Right: form ── */}
            <div className="relative max-h-[92vh] overflow-y-auto">
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

                  {/* Phone with country code */}
                  <div>
                    <FieldLabel htmlFor="phone" label="Phone" optional />
                    <PhoneInput
                      country="in"
                      value={values.phone}
                      onChange={handlePhoneChange}
                      enableSearch
                      inputProps={{ id: "phone", name: "phone", autoComplete: "tel" }}
                      containerClass="!w-full"
                      inputClass="rpi-input"
                      buttonClass="rpi-button"
                      dropdownClass="rpi-dropdown"
                      searchClass="rpi-search"
                    />
                  </div>

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

                  {/* Invisible reCAPTCHA (no checkbox; runs on submit) */}
                  <ReCAPTCHA
                    ref={recaptchaRef}
                    sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
                    size="invisible"
                    badge="bottomright"
                    theme="dark"
                  />

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

                  {/* Google reCAPTCHA notice (required when the badge is hidden) */}
                  <p className="text-center text-[10.5px] text-white/30 leading-snug">
                    This site is protected by reCAPTCHA and the Google{" "}
                    <a
                      href="https://policies.google.com/privacy"
                      target="_blank"
                      rel="noreferrer"
                      className="underline hover:text-white/60"
                    >
                      Privacy Policy
                    </a>{" "}
                    and{" "}
                    <a
                      href="https://policies.google.com/terms"
                      target="_blank"
                      rel="noreferrer"
                      className="underline hover:text-white/60"
                    >
                      Terms of Service
                    </a>{" "}
                    apply.
                  </p>
                </form>
              </div>
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