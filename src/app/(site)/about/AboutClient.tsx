"use client";

import { useState } from "react";
import AnimatedSection from "@/components/AnimatedSection";
import type { Agent } from "@/sanity/fetch";

function AgentCard({ agent, index }: { agent: Agent; index: number }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="flex flex-col lg:grid lg:grid-cols-[280px_1fr] gap-8 lg:gap-20 py-12 lg:py-16 border-t border-[#dde1ee] group first:border-t-0 last:border-b last:border-[#dde1ee]">
      {/* ── LEFT / MOBILE HEADER ── */}
      <div className="flex gap-6 lg:flex-col items-start lg:items-stretch order-1">
        {/* Photo Container - Smaller on mobile */}
        <div className="relative w-28 sm:w-48 lg:w-full aspect-[3/4] overflow-hidden flex-shrink-0">
          <div 
            className="absolute top-0 left-0 right-0 h-[2px] bg-[#c49a3c] z-[2] scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100"
          />
          <div 
            className="w-full h-full bg-cover bg-center transition-transform duration-1000 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:scale-[1.04]"
            style={{ backgroundImage: `url(${agent.photo})` }}
          />
          <span className="absolute bottom-1 right-2 font-cormorant font-light text-[2.2rem] lg:text-[3.2rem] leading-none text-[#1c2340]/[0.06] pointer-events-none z-[3]">
            {String(index + 1).padStart(2, '0')}
          </span>
        </div>

        {/* Mobile-Only Header Info (Next to photo) */}
        <div className="flex-1 lg:hidden pt-2">
          <p className="flex items-center gap-2 text-[0.42rem] tracking-[0.3em] uppercase text-[#2e4480] mb-2 leading-none">
            <span className="w-4 h-px bg-[#c49a3c]" />
            {agent.role}
          </p>
          <h3 className="font-cormorant font-light text-[1.8rem] leading-[1.1] text-[#1c2340] tracking-tight">
            {agent.name.split(' ').slice(0, -1).join(' ')} <br/>
            <em className="italic text-[#3a5299]">{agent.name.split(' ').slice(-1)}</em>
          </h3>
          
          <div className="flex flex-wrap gap-1.5 mt-3">
            {agent.specialisms?.slice(0, 2).map((s) => (
              <span key={s} className="text-[0.38rem] tracking-[0.15em] uppercase text-[#8b91a8] border border-[#dde1ee] px-2 py-1">
                {s}
              </span>
            ))}
          </div>
        </div>

        {/* Desktop Sidebar Contact Links */}
        <div className="hidden lg:flex flex-col gap-0 mt-6">
          {agent.phone && (
            <a href={`tel:${agent.phone}`} className="flex items-center gap-3 py-3 border-b border-[#dde1ee] first:border-t text-[0.52rem] tracking-[0.2em] text-[#8b91a8] hover:text-[#2e4480] hover:pl-2 transition-all duration-350">
              <svg viewBox="0 0 24 24" className="w-3 h-3 fill-none stroke-current stroke-[1.4]"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8 19.79 19.79 0 01.22 1.18 2 2 0 012.22 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
              {agent.phone}
            </a>
          )}
          {agent.email && (
            <a href={`mailto:${agent.email}`} className="flex items-center gap-3 py-3 border-b border-[#dde1ee] text-[0.52rem] tracking-[0.2em] text-[#8b91a8] hover:text-[#2e4480] hover:pl-2 transition-all duration-350">
              <svg viewBox="0 0 24 24" className="w-3 h-3 fill-none stroke-current stroke-[1.4]"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              {agent.email}
            </a>
          )}
          {agent.whatsapp && (
            <a href={`https://wa.me/${agent.whatsapp.replace(/\+/g, '')}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 py-3 border-b border-[#dde1ee] text-[0.52rem] tracking-[0.2em] text-[#8b91a8] hover:text-[#25D366] hover:pl-2 transition-all duration-350">
              <svg viewBox="0 0 24 24" className="w-3 h-3 fill-current"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
              WhatsApp
            </a>
          )}
        </div>
      </div>

      {/* ── RIGHT CONTENT ── */}
      <div className="pt-0 lg:pt-1 order-2">
        {/* Desktop Header */}
        <div className="hidden lg:block">
          <p className="flex items-center gap-3 text-[0.5rem] tracking-[0.34em] uppercase text-[#2e4480] mb-3">
            <span className="w-6 h-px bg-[#c49a3c]" />
            {agent.role}
          </p>
          <h3 className="font-cormorant font-light text-[clamp(2.5rem,3.5vw,3.2rem)] leading-[1.05] text-[#1c2340] mb-2 tracking-tight">
            {agent.name.split(' ').slice(0, -1).join(' ')} <em className="italic text-[#3a5299]">{agent.name.split(' ').slice(-1)}</em>
          </h3>
          <div className="flex flex-wrap gap-3 my-6">
            {agent.specialisms?.map((s) => (
              <span key={s} className="text-[0.46rem] tracking-[0.2em] uppercase text-[#8b91a8] border border-[#dde1ee] px-3 py-1.5 transition-all duration-300 group-hover:border-[#2e4480] group-hover:text-[#3a5299]">
                {s}
              </span>
            ))}
          </div>
        </div>

        <div className="w-full h-px bg-[#dde1ee] mb-6 lg:mb-7 lg:mt-0" />

        <div className={`text-[0.68rem] leading-[2.1] tracking-[0.06em] text-[#8b91a8] max-w-[60ch] overflow-hidden transition-all duration-500 ${isExpanded ? 'max-h-[2000px]' : 'max-h-[6.3rem] line-clamp-4'}`}>
          {agent.bio}
        </div>
        
        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          className="group inline-flex items-center gap-2 mt-4 text-[0.52rem] tracking-[0.28em] uppercase text-[#2e4480] transition-all duration-300"
        >
          {isExpanded ? 'Read Less' : 'Read More'}
          <span className={`block h-px bg-[#2e4480] transition-all duration-400 ${isExpanded ? 'w-9' : 'w-5 group-hover:w-9'}`} />
        </button>

        {/* Mobile Contact Row - Moved between Bio and Stats */}
        <div className="flex lg:hidden flex-wrap gap-4 mt-6 pt-6 border-t border-[#dde1ee]">
          {agent.phone && (
            <a href={`tel:${agent.phone}`} className="text-[0.52rem] tracking-[0.2em] font-medium text-[#c49a3c]">Call Agent</a>
          )}
          {agent.whatsapp && (
            <a href={`https://wa.me/${agent.whatsapp.replace(/\+/g, '')}`} target="_blank" rel="noopener noreferrer" className="text-[0.52rem] tracking-[0.2em] font-medium text-[#25D366]">WhatsApp</a>
          )}
          {agent.email && (
            <a href={`mailto:${agent.email}`} className="text-[0.52rem] tracking-[0.2em] font-medium text-[#2e4480]">Email</a>
          )}
        </div>

        {/* Stats Row */}
        <div className="flex items-center gap-0 mt-8 lg:mt-10 py-6 lg:py-8 border-t border-[#dde1ee]">
          {agent.transactions && (
            <div className="flex flex-col gap-1 pr-6 sm:pr-9 border-r border-[#dde1ee]">
              <span className="font-cormorant font-light text-[1.2rem] lg:text-[1.5rem] uppercase text-[#1c2340] leading-none">{agent.transactions}</span>
              <span className="text-[0.38rem] tracking-[0.22em] uppercase text-[#8b91a8]">Transactions</span>
            </div>
          )}
          {agent.experience && (
            <div className="flex flex-col gap-1 px-6 sm:px-9 border-r border-[#dde1ee]">
              <span className="font-cormorant font-light text-[1.2rem] lg:text-[1.5rem] uppercase text-[#1c2340] leading-none">{agent.experience}</span>
              <span className="text-[0.38rem] tracking-[0.22em] uppercase text-[#8b91a8]">Experience</span>
            </div>
          )}
          {agent.primaryMarket && (
            <div className="flex flex-col gap-1 pl-6 sm:pl-9">
              <span className="font-cormorant font-light text-[1.2rem] lg:text-[1.5rem] uppercase text-[#1c2340] leading-none">{agent.primaryMarket}</span>
              <span className="text-[0.38rem] tracking-[0.22em] uppercase text-[#8b91a8]">Primary Market</span>
            </div>
          )}
        </div>

        <div className="mt-8 flex items-center gap-10">
          <a href="/contact" className="group inline-flex items-center gap-3 text-[0.56rem] tracking-[0.26em] uppercase text-[#1c2340] hover:text-[#2e4480] transition-all duration-300">
            Book a Consultation
            <span className="block w-7 h-px bg-[#1c2340] group-hover:w-11 group-hover:bg-[#2e4480] transition-all duration-400" />
          </a>
        </div>
      </div>
    </div>
  );
}

export default function AboutClient({ agents }: { agents: Agent[] }) {
  return (
    <div className="relative overflow-hidden">
      {/* ── HEADER ── */}
      <section className="pt-12 pb-0 lg:pt-20 lg:pb-0 relative z-10">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-16">
          <AnimatedSection>
            <div className="grid grid-cols-1 lg:grid-cols-2 items-end gap-8 lg:gap-16 pb-10 border-b border-[#dde1ee]">
              <div>
                <p className="text-[0.52rem] tracking-[0.38em] uppercase text-[#2e4480] mb-3">Who We Are</p>
                <h1 className="font-cormorant font-light text-[clamp(2.5rem,4.5vw,4.5rem)] leading-[1.04] text-[#1c2340]">
                  About <em className="italic text-[#3a5299]">Us</em>
                </h1>
                <div className="w-8 h-px bg-[#c49a3c] mt-5" />
              </div>
              <p className="text-[0.68rem] leading-[2.1] tracking-[0.08em] text-[#8b91a8] max-w-[38ch] lg:text-right">
                A modern real estate company built on curation, transparency,
                and deep market expertise in Kenya.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ── STORY ── */}
      <section className="py-16 lg:py-24 relative z-10">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-16">
          <AnimatedSection>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24 items-center">
              <div
                className="aspect-square bg-cover bg-center bg-[#dde1ee] grayscale hover:grayscale-0 transition-all duration-700 shadow-xl"
                style={{ backgroundImage: "url(/images/about-office.jpg)" }}
              />
              <div>
                <p className="text-[0.52rem] tracking-[0.38em] uppercase text-[#2e4480] mb-3">Our Story</p>
                <h2 className="font-cormorant font-light text-[2rem] text-[#1c2340] mb-4">
                  Redefining Real Estate in Kenya
                </h2>
                <div className="w-8 h-px bg-[#c49a3c] mb-6" />
                <p className="text-[0.68rem] leading-[2.1] tracking-[0.08em] text-[#8b91a8] mb-6">
                  Wande Realty was founded with a simple belief: finding a home
                  should be an experience, not a hassle. We curate exceptional
                  properties across Kenya — from Nairobi&apos;s vibrant
                  neighbourhoods to the serene Kenyan coast.
                </p>
                <p className="text-[0.68rem] leading-[2.1] tracking-[0.08em] text-[#8b91a8]">
                  Based in Kilimani, near Yaya Center, our team combines deep
                  local expertise with a design-forward presentation that helps
                  buyers and investors make confident decisions.
                </p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ── TEAM SECTION ── */}
      <section className="py-20 lg:py-32 relative">
        {/* Ghost kanji */}
        <div 
          className="absolute bottom-[-5%] right-[-1%] font-noto-jp font-light select-none pointer-events-none z-[0] opacity-[0.022]"
          style={{ fontSize: "38vw", lineHeight: 1, color: "#1c2340" }}
          aria-hidden="true"
        >
          人
        </div>

        <div className="max-w-[1440px] mx-auto px-6 lg:px-16 relative z-10">
          <AnimatedSection>
            <div className="flex flex-col md:flex-row items-baseline justify-between mb-16 lg:mb-24">
              <div>
                <p className="text-[0.52rem] tracking-[0.38em] uppercase text-[#2e4480] mb-3">The Advisory</p>
                <h2 className="font-cormorant font-light text-[clamp(2rem,3vw,2.8rem)] leading-[1.1] text-[#1c2340]">
                  Expert <em>Team</em>
                </h2>
                <div className="w-[1.8rem] h-px bg-[#c49a3c] mt-4" />
              </div>
              <p className="mt-6 md:mt-0 text-[0.6rem] leading-[1.9] tracking-[0.07em] text-[#8b91a8] max-w-[30ch] md:text-right">
                Our advisors bring deep expertise across<br/>
                Nairobi and the Coast — guiding buyers,<br/>
                sellers, and investors with precision.
              </p>
            </div>
          </AnimatedSection>

          <div className="flex flex-col gap-0 border-b border-[#dde1ee]">
            {agents.map((agent, i) => (
              <AnimatedSection key={agent._id} delay={i * 0.1}>
                <AgentCard agent={agent} index={i} />
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-16 lg:py-24 bg-[#1c2340] relative z-10 mt-20">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-16 flex flex-col items-center text-center">
          <AnimatedSection>
            <div className="w-px h-10 bg-[#c49a3c] mx-auto mb-8" />
            <h2 className="font-cormorant font-light text-[clamp(2.1rem,3.2vw,3rem)] text-white mb-4 tracking-tight">
              Begin Your <em className="italic text-white/60">Journey</em> With Us
            </h2>
            <p className="text-white/40 mb-10 max-w-md mx-auto text-[0.7rem] leading-[2.1] tracking-wide">
              Whether you&apos;re buying, investing, or just exploring, our team is
              here to guide you through every milestone.
            </p>
            <div className="flex justify-center">
              <a
                href="/contact"
                className="group flex items-center justify-center gap-4 text-[0.58rem] tracking-[0.3em] uppercase text-white hover:text-[#c49a3c] transition-all duration-400"
              >
                Get in Touch
                <span className="block w-8 h-px bg-[#c49a3c] group-hover:w-12 transition-all duration-400" />
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
