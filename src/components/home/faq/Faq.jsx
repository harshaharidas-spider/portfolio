
"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    id: 1,
    question: "Why does my business need an IT consultant?",
    answer:
      "Companies often get cheated with expensive solutions where cheaper alternatives exist. The right consultant helps you pick the cost-effective option — and the right partners to deliver it.",
  },
  {
    id: 2,
    question: "What does IT infrastructure consulting cover?",
    answer:
      "End-to-end setup planning including high-speed enterprise networking, secure Wi-Fi topologies, on-premise and cloud server architecture, automated backup systems, cybersecurity protocols, and hardware procurement strategies for desktop workstations and laptops.",
  },
  {
    id: 3,
    question: "Can you help us choose a digital marketing agency or software vendor?",
    answer:
      "Yes. Vendor selection is one of my core focus areas. I conduct neutral, research-backed audits of agency track records, review proposed SLAs and technical architectures, and ensure you never waste budget on hollow retainers or vanity metrics.",
  },
  {
    id: 4,
    question: "Do you still write code yourself?",
    answer:
      "Yes, despite decades in executive and consulting roles, I still stay hands-on with modern code, architecture reviews, and prototyping.",
  },
  {
    id: 5,
    question: "Which areas are outside your expertise?",
    answer:
      "I focus primarily on IT architecture, digital marketing strategy, and e-commerce consulting. Specialized niches outside core technology and business systems are referred to vetted domain experts.",
  },
  {
    id: 6,
    question: "Where are you based, and do you work with businesses outside Kerala?",
    answer:
      "Based in Kochi, Kerala, but actively consulting for businesses across India, the US, the Middle East, and globally.",
  },
];

export default function Faq() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <section
      id="faq"
      className="w-full bg-[#F4F2EE] min-h-[787px] lg:h-[787px] flex items-center py-16 lg:py-0 border-b border-[#dedcd4] overflow-hidden"
    >
      <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-[75px]">
        <div className="flex flex-col lg:flex-row items-start justify-between gap-12 lg:gap-14">

          {/* Left Column: Section Label, Heading & Direct Link */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="w-full lg:w-[460px] flex-none flex flex-col items-start"
          >
            {/* FAQ Label */}
            <p
              className="text-[#6F726E] text-[11px] font-normal leading-normal tracking-[1.1px] uppercase mb-[17px]"
              style={{ fontFamily: "Roboto, sans-serif" }}
            >
              FAQ
            </p>

            {/* Heading */}
            <h2
              className="text-[48px] font-medium leading-[104%] tracking-[-1.92px] text-[#1C1F1D]"
              style={{ fontFamily: "Roboto, sans-serif" }}
            >
              <span className="block">Questions</span>
              <span className="block">
                people <span className="text-[#A9AAA4]">ask.</span>
              </span>
            </h2>

            {/* Description & Direct Link */}
            <div
              className="mt-[17px] flex flex-wrap items-center gap-x-7 gap-y-2 text-[17px] font-normal leading-[150%] text-[#6F726E]"
              style={{ fontFamily: "Roboto, sans-serif" }}
            >
              <span>Got other questions?</span>

              <Link
                href="#contact"
                className="text-[#6F726E] hover:text-[#436156] transition-colors font-normal"
              >
                Talk to Tony directly.
              </Link>
            </div>
          </motion.div>

          {/* Right Column: FAQ Accordion List */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: 0.7,
              delay: 0.15,
              ease: [0.21, 0.47, 0.32, 0.98],
            }}
            className="w-full lg:flex-1 pl-0 lg:pl-10 xl:pl-16"
          >
            <div className="border-t border-[#85A596]">
              <div className="divide-y divide-[#dedcd4] border-b border-[#85A596]">
                {faqs.map((faq, index) => {
                  const isOpen = openIndex === index;

                  return (
                    <motion.div
                      key={faq.id}
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.5,
                        delay: index * 0.08,
                      }}
                      className="transition-colors"
                    >
                      <button
                        type="button"
                        onClick={() => toggleFaq(index)}
                        className="w-full py-5 sm:py-6 flex items-start justify-between text-left group gap-6 cursor-pointer focus:outline-none"
                        aria-expanded={isOpen}
                      >
                        {/* Question Title & Expanded Answer */}
                        <div className="flex-1 pr-4">
                          <h3
                            className="text-[#1C1F1D] font-medium text-[20px] leading-normal tracking-[-0.4px] max-w-[580px] group-hover:text-[#436156] transition-colors"
                            style={{ fontFamily: "Roboto, sans-serif" }}
                          >
                            {faq.question}
                          </h3>

                          {/* Answer */}
                          <AnimatePresence initial={false}>
                            {isOpen && (
                              <motion.div
                                key="content"
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{
                                  duration: 0.35,
                                  ease: [0.16, 1, 0.3, 1],
                                }}
                                className="overflow-hidden"
                              >
                                <p
                                  className="text-[#6F726E] text-[16px] font-normal leading-[155%] mt-3.5 max-w-[580px]"
                                  style={{ fontFamily: "Roboto, sans-serif" }}
                                >
                                  {faq.answer}
                                </p>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>

                        {/* Expand/Collapse Icon */}
                        <motion.span
                          animate={{ rotate: isOpen ? 45 : 0 }}
                          transition={{
                            duration: 0.25,
                            ease: "easeInOut",
                          }}
                          className="w-[28px] h-[28px] flex items-center justify-center text-[#1c1f1d] mt-1 shrink-0 select-none text-[22px] font-light leading-none group-hover:text-[#436156]"
                          aria-hidden="true"
                        >
                          +
                        </motion.span>
                      </button>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
