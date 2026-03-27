"use client";

import React from "react";
import { MessageSquare, Mail, Phone, ArrowRight } from "lucide-react";

interface EnquiryPanelProps {
  property: {
    title: string;
    location: string;
    unitType?: string;
    price?: string;
    id?: string;
    slug?: string;
    isProject?: boolean;
  };
}

export default function EnquiryPanel({ property }: EnquiryPanelProps) {
  const { title, location, unitType, price, isProject } = property;
  const phoneNumber = "254140530539";
  const emailAddress = "info@wanderealty.com";
  
  // WhatsApp prefilled
  const waText = encodeURIComponent(
    `Hi Wande Realty,\n\nI'm interested in *${title}* in ${location}.\n\n${unitType ? `Unit type: ${unitType}\n` : ""}${price ? `Price: ${price}\n` : ""}\nCould we arrange a viewing or call?\n\nThank you.`
  );
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${waText}`;

  // Email prefilled
  const emailSubject = encodeURIComponent(
    `Enquiry — ${title}${unitType ? ` (${unitType})` : ""}`
  );
  const emailBody = encodeURIComponent(
    `Hi Wande Realty,\n\nI'm interested in ${title} located in ${location}.\n\n${unitType ? `Unit: ${unitType}\n` : ""}${price ? `Price: ${price}\n` : ""}\nI would like to:\n☐ Schedule a private viewing\n☐ Receive detailed floor plans\n☐ Discuss payment plans\n\nPlease get in touch at your earliest convenience.\n\nThank you.`
  );
  const emailUrl = `mailto:${emailAddress}?subject=${emailSubject}&body=${emailBody}`;

  return (
    <div className="enquiry-panel w-full max-w-[380px] border-t border-[#c49a3c] pt-8 relative font-montserrat font-extralight tracking-[0.04em] text-[#1c2340]">
      {/* Property context */}
      <div className="flex items-center gap-3 mb-7">
        <div className="w-5 h-px bg-[#c49a3c] shrink-0" />
        <span className="text-[0.46rem] tracking-[0.28em] uppercase text-[#2e4480]">
          {title} · {location.split(",")[0]}
        </span>
      </div>

      <h3 className="font-cormorant italic font-light text-[1.9rem] line-height-[1.1] text-[#1c2340] mb-2">
        Interested?
      </h3>
      <p className="text-[0.6rem] leading-[1.9] tracking-[0.07em] text-[#8b91a8] mb-8 max-w-[32ch]">
        Contact our property specialists for a private viewing or further details.
      </p>

      {/* CONTACT OPTIONS */}
      <div className="flex flex-col">
        {/* WhatsApp */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="ep-option group whatsapp flex items-center gap-4 py-5 border-b border-[#dde1ee] border-t border-t-[#dde1ee] hover:pl-2 transition-all duration-350 cursor-pointer relative overflow-hidden"
        >
          {/* Left cobalt bar on hover */}
          <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-[#25D366] scale-y-0 group-hover:scale-y-100 origin-bottom transition-transform duration-350" />
          
          <div className="w-9 h-9 rounded-full bg-[#dde1ee] flex items-center justify-center shrink-0 transition-colors duration-300 group-hover:bg-[#25D366]/10">
            <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-[#8b91a8] transition-colors duration-300 group-hover:fill-[#25D366]">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
            </svg>
          </div>
          <div className="flex-1">
            <span className="text-[0.56rem] tracking-[0.2em] uppercase transition-colors duration-300 group-hover:text-[#25D366]">
              Enquire via WhatsApp
            </span>
            <span className="text-[0.5rem] tracking-[0.1em] text-[#8b91a8] transition-colors duration-300 group-hover:text-[#25D366]/60">
              Prefilled with property details
            </span>
          </div>
          <div className="w-[1.4rem] h-px bg-[#dde1ee] transition-all duration-400 group-hover:w-[2.2rem] group-hover:bg-[#25D366]" />
        </a>

        {/* Email */}
        <a
          href={emailUrl}
          className="ep-option group flex items-center gap-4 py-5 border-b border-[#dde1ee] hover:pl-2 transition-all duration-350 cursor-pointer relative overflow-hidden"
        >
          <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-[#2e4480] scale-y-0 group-hover:scale-y-100 origin-bottom transition-transform duration-350" />
          
          <div className="w-9 h-9 rounded-full bg-[#dde1ee] flex items-center justify-center shrink-0 transition-colors duration-300 group-hover:bg-[#2e4480]/10">
            <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 stroke-[#8b91a8] fill-none stroke-[1.4] transition-colors duration-300 group-hover:stroke-[#2e4480]">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
            </svg>
          </div>
          <div className="flex-1">
            <span className="text-[0.56rem] tracking-[0.2em] uppercase transition-colors duration-300 group-hover:text-[#2e4480]">
              Send an Email
            </span>
            <span className="text-[0.5rem] tracking-[0.1em] text-[#8b91a8] transition-colors duration-300 group-hover:text-[#2e4480]/60">
              Prefilled subject & property name
            </span>
          </div>
          <div className="w-[1.4rem] h-px bg-[#dde1ee] transition-all duration-400 group-hover:w-[2.2rem] group-hover:bg-[#2e4480]" />
        </a>

        {/* Call */}
        <a
          href={`tel:+254140530539`}
          className="ep-option group flex items-center gap-4 py-5 border-b border-[#dde1ee] hover:pl-2 transition-all duration-350 cursor-pointer relative overflow-hidden"
        >
          <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-[#2e4480] scale-y-0 group-hover:scale-y-100 origin-bottom transition-transform duration-350" />
          
          <div className="w-9 h-9 rounded-full bg-[#dde1ee] flex items-center justify-center shrink-0 transition-colors duration-300 group-hover:bg-[#2e4480]/10">
            <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 stroke-[#8b91a8] fill-none stroke-[1.4] transition-colors duration-300 group-hover:stroke-[#2e4480]">
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8 19.79 19.79 0 01.22 1.18 2 2 0 012.22 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
            </svg>
          </div>
          <div className="flex-1">
            <span className="text-[0.56rem] tracking-[0.2em] uppercase transition-colors duration-300 group-hover:text-[#2e4480]">
              Call Us Directly
            </span>
            <span className="text-[0.5rem] tracking-[0.1em] text-[#8b91a8] transition-colors duration-300 group-hover:text-[#2e4480]/60">
              +254 140 530 539
            </span>
          </div>
          <div className="w-[1.4rem] h-px bg-[#dde1ee] transition-all duration-400 group-hover:w-[2.2rem] group-hover:bg-[#2e4480]" />
        </a>
      </div>

      {/* PREFILL PREVIEW */}
      <div className="mt-7 p-5 bg-[#2e4480]/[0.04] border-l-2 border-[#dde1ee] hover:border-[#c49a3c] transition-colors duration-300">
        <span className="block text-[0.44rem] tracking-[0.3em] uppercase text-[#2e4480] mb-3">
          Message Preview
        </span>
        <p className="text-[0.58rem] leading-[1.8] tracking-[0.05em] text-[#8b91a8] italic">
          Hi, I'm interested in <strong className="font-light text-[#1c2340] not-italic">{title}</strong> in {location.split(",")[0]}.
          {" "}I'd like to learn more about the <strong className="font-light text-[#1c2340] not-italic">{unitType || "this property"}</strong>
          {price ? ` (${price})` : ""}. Could we arrange a viewing or call?
        </p>
      </div>

      {/* DIRECT CONTACT */}
      <div className="mt-8 pt-6 border-t border-[#dde1ee]">
        <p className="text-[0.44rem] tracking-[0.3em] uppercase text-[#8b91a8] mb-3">Or reach us directly</p>
        <a href="tel:+254140530539" className="block font-cormorant font-light text-[0.95rem] text-[#1c2340] hover:text-[#2e4480] transition-colors mb-1.5">+254 140 530 539</a>
        <a href={`mailto:${emailAddress}`} className="block font-cormorant font-light text-[0.95rem] text-[#1c2340] hover:text-[#2e4480] transition-colors tracking-[0.05em]">{emailAddress}</a>
      </div>
    </div>
  );
}
