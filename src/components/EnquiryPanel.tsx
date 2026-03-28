"use client";

import { buildWhatsAppHref } from "@/lib/whatsapp";
import ActionButton from "@/components/ui/ActionButton";

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
  const { title, location, unitType, price, slug } = property;
  const phoneNumber = "254140530539";
  const emailAddress = "info@wanderealty.com";
  
  // WhatsApp Lead Report
  const whatsappUrl = buildWhatsAppHref({
    intro: `Hi Wande Realty,\n\nI'm interested in *${title}* in ${location}.\n\n${unitType ? `Unit type: ${unitType}\n` : ""}${price ? `Price: ${price}\n` : ""}\nCould we arrange a viewing or call?`,
    pagePath: `/residences/${slug}`,
    source: `property_panel_${slug || 'general'}`
  });

  // Email prefilled
  const emailSubject = encodeURIComponent(
    `Enquiry — ${title}${unitType ? ` (${unitType})` : ""}`
  );
  const emailBody = encodeURIComponent(
    `Hi Wande Realty,\n\nI'm interested in ${title} located in ${location}.\n\n${unitType ? `Unit: ${unitType}\n` : ""}${price ? `Price: ${price}\n` : ""}\nI would like to:\n☐ Schedule a private viewing\n☐ Receive detailed floor plans\n☐ Discuss payment plans\n\nPlease get in touch at your earliest convenience.\n\nThank you.`
  );
  const emailUrl = `mailto:${emailAddress}?subject=${emailSubject}&body=${emailBody}`;

  return (
    <div className="enquiry-panel w-full max-w-[400px] border-t border-[#c49a3c] pt-8 relative font-montserrat font-extralight tracking-[0.04em] text-[#1c2340]">
       {/* Ghost vertical text - CONTACT */}
       <div className="absolute top-1/2 -right-8 -translate-y-1/2 rotate-90 font-noto-jp font-extralight text-[6rem] text-[#1c2340]/[0.015] select-none pointer-events-none">
        間
      </div>

      <div className="flex items-center gap-3 mb-7">
        <div className="w-5 h-px bg-[#c49a3c] shrink-0" />
        <span className="text-[0.46rem] tracking-[0.28em] uppercase text-[#2e4480]">
          Connect with Expertise
        </span>
      </div>

      <h3 className="font-cormorant italic font-light text-[2.2rem] line-height-[1.1] text-[#1c2340] mb-3">
        Interested in <br/><span className="not-italic text-[#c49a3c]">{title}?</span>
      </h3>
      <p className="text-[0.6rem] leading-[2] tracking-[0.07em] text-[#8b91a8] mb-10 max-w-[34ch]">
        Our advisory team is ready to assist with floor plans, private viewings, and specific availability.
      </p>

      {/* ACTION BUTTON GRID — now with editorial context */}
      <div className="flex flex-col gap-5">
        <ActionButton 
          href={whatsappUrl} 
          label="Enquire via WhatsApp"
          eyebrow="Immediate Assistance"
          className="w-full"
        />
        
        <ActionButton 
          href={emailUrl} 
          label="Request Details via Email"
          eyebrow="Full Portfolio & Floorplans"
          className="w-full bg-[#f8f7f4] border-[#1c2340]"
          variant="primary"
        />

        <ActionButton 
          href={`tel:${phoneNumber}`} 
          label="Call Directly" 
          eyebrow="Speak with an Advisor"
          className="w-full bg-white/5 border-[#2e4480]"
          variant="secondary"
        />
      </div>

      {/* QUICK PREVIEW */}
      <div className="mt-10 p-5 bg-[#2e4480]/[0.025] hover:border-l-[#c49a3c] border-l-2 border-[#dde1ee] transition-all duration-300 group">
        <span className="block text-[0.44rem] tracking-[0.3em] uppercase text-[#2e4480] mb-3 transition-colors group-hover:text-[#c49a3c]">
          Personalised Consultation
        </span>
        <p className="text-[0.58rem] leading-[1.8] tracking-[0.05em] text-[#8b91a8] italic">
          Looking for more details on <strong className="font-light text-[#1c2340] not-italic">{unitType || "this development"}</strong>? Use our quick connect buttons above for immediate assistance.
        </p>
      </div>

      {/* DIRECT LINKS */}
      <div className="mt-10 pt-8 border-t border-[#dde1ee] flex flex-col gap-3">
        <div className="flex justify-between items-center text-[0.44rem] tracking-[0.3em] uppercase text-[#8b91a8] mb-1">
          <span>Global Advisory</span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#c49a3c] animate-pulse" />
        </div>
        <div className="flex flex-col gap-1">
          <a href={`tel:${phoneNumber}`} className="font-cormorant font-light text-[1.1rem] text-[#1c2340] hover:text-[#2e4480] transition-colors">+254 140 530 539</a>
          <a href={`mailto:${emailAddress}`} className="font-cormorant font-light text-[1.1rem] text-[#1c2340] hover:text-[#2e4480] transition-colors tracking-[0.04em]">{emailAddress}</a>
        </div>
      </div>
    </div>
  );
}
