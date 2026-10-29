"use client";

import { useState } from "react";
import Link from "next/link";

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
  const [openIndex, setOpenIndex] = useState(0); // Question 1 open by default matching Figma

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <section
      id="faq"
      className="w-full bg-[#F4F2EE] min-h-[787px] lg:h-[787px] flex items-center py-16 lg:py-0 border-b border-[#dedcd4]"
    >
      <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-[75px]">
        <div className="flex flex-col lg:flex-row items-start justify-between gap-12 lg:gap-14">
          {/* Left Column: Section Label, Heading & Direct Link */}
          <div className="w-full lg:w-[460px] flex-none flex flex-col items-start">
            <p className="text-[11.5px] uppercase tracking-[0.14em] font-medium text-[#777a78] mb-6 sm:mb-8">
              FAQ
            </p>
            <h2 className="text-[38px] sm:text-[46px] lg:text-[54px] font-bold leading-[1.06] tracking-tight text-[#1c1f1d]">
              <span className="block">Questions</span>
              <span className="block mt-0.5">
                people <span className="text-[#a5a8a4]">ask.</span>
              </span>
            </h2>
            <p className="text-[15px] sm:text-[15.5px] text-[#636c67] mt-8 sm:mt-10">
              Got other questions?{" "}
              <Link
                href="#contact"
                className="text-[#636c67] hover:text-[#1c1f1d] transition-colors"
              >
                Talk to Tony directly.
              </Link>
            </p>
          </div>

          {/* Right Column: FAQ Accordion List matching Figma exact specs */}
          <div className="w-full lg:flex-1 pl-0 lg:pl-10 xl:pl-16 border-t border-b border-[#85A596]">
            <div className="divide-y divide-[#dedcd4]">
              {faqs.map((faq, index) => {
                const isOpen = openIndex === index;

                return (
                  <div key={faq.id} className="transition-colors">
                    <button
                      type="button"
                      onClick={() => toggleFaq(index)}
                      className="w-full py-5 sm:py-6 flex items-start justify-between text-left group gap-6 cursor-pointer focus:outline-none"
                      aria-expanded={isOpen}
                    >
                      {/* Left: Question Title & Expanded Answer */}
                      <div className="flex-1 pr-4">
                        <h3 className="text-[#1c1f1d] font-medium text-[17px] sm:text-[19px] lg:text-[20px] leading-[1.4] sm:leading-[1.42] tracking-[-0.015em] max-w-[580px] group-hover:text-[#436156] transition-colors">
                          {faq.question}
                        </h3>
                        {isOpen && (
                          <p className="mt-4 text-[15px] sm:text-[16px] font-normal leading-[160%] tracking-normal text-[#6F726E] max-w-[580px] transition-opacity duration-200">
                            {faq.answer}
                          </p>
                        )}
                      </div>

                      {/* Right: Clean Minimalist + / — symbol matching Figma (no circle) */}
                      <span
                        className="text-[#85A596] text-[24px] sm:text-[26px] font-light leading-none shrink-0 select-none pt-0.5 sm:pt-1 group-hover:text-[#52776a] transition-colors"
                        aria-hidden="true"
                      >
                        {isOpen ? "\u2014" : "+"}
                      </span>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
