"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const letters = Array.from("WELCOME ITZFIZZ");

const stats = [
  { value: "58%", label: "Increase in pick up point use", tone: "lime" },
  { value: "23%", label: "Decrease in customer phone calls", tone: "sky" },
  { value: "27%", label: "Increase in pick up point use", tone: "dark" },
  { value: "40%", label: "Decrease in customer phone calls", tone: "orange" }
];

function CarIllustration() {
  return (
    <svg
      viewBox="0 0 500 900"
      aria-hidden="true"
      className="h-full w-auto drop-shadow-[0_22px_24px_rgba(0,0,0,0.3)]"
    >
      <ellipse cx="250" cy="822" rx="174" ry="34" fill="rgba(0,0,0,.22)" />
      <path
        d="M130 700C100 620 80 480 80 380c0-160 50-260 100-310 20-20 50-30 70-30s50 10 70 30c50 50 100 150 100 310 0 100-20 240-50 320-20 50-70 80-120 80s-100-30-120-80Z"
        fill="#171717"
        stroke="#414141"
        strokeWidth="3"
      />
      <path d="M250 55V760" stroke="#9be63d" strokeWidth="3" strokeDasharray="14 12" opacity=".55" />
      <path
        d="M175 200c10-55 40-80 75-82 35 2 65 27 75 82 5 25 0 55-75 60-75-5-80-35-75-60Z"
        fill="#0a0a0a"
        stroke="#4b4b4b"
        strokeWidth="2"
      />
      <path
        d="M185 580c5 30 30 50 65 52 35-2 60-22 65-52 5-25 0-50-65-52-65 2-70 27-65 52Z"
        fill="#0a0a0a"
        stroke="#4b4b4b"
        strokeWidth="2"
      />
      <path d="M235 130c3-30 27-30 30 0l3 70c0 15-36 15-36 0Z" fill="#242424" />
      <path d="M210 160c5-30 40-35 40-35s35 5 40 35" stroke="#6a6a6a" strokeWidth="2" fill="none" />
      <path d="M195 220h110" stroke="#5a5a5a" strokeWidth="1.5" opacity=".6" />
      <path d="M95 350v170M405 350v170" stroke="#9be63d" strokeWidth="2" opacity=".35" />
      <path d="M80 295c-8 0-14 5-15 13-1 8 5 14 15 12l10-4-2-18-8-3ZM420 295c8 0 14 5 15 13 1 8-5 14-15 12l-10-4 2-18 8-3Z" fill="#222" stroke="#4b4b4b" strokeWidth="2"/>
      <rect x="240" y="322" width="20" height="8" rx="2" fill="#9be63d" opacity=".35" />
      <rect x="240" y="336" width="20" height="8" rx="2" fill="#9be63d" opacity=".22" />
    </svg>
  );
}

export default function Home() {
  const sectionRef = useRef<HTMLElement>(null);
  const carRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const section = sectionRef.current;
      const car = carRef.current;
      const trail = trailRef.current;
      const headline = headlineRef.current;
      const statEls = statsRef.current?.querySelectorAll("[data-stat]");

      if (!section || !car || !trail || !headline) return;

      const chars = headline.querySelectorAll("[data-letter]");

      // Premium entrance: opacity + small vertical movement.
      gsap.set(chars, { y: 22, opacity: 0 });
      gsap.set(statEls, { y: 18, opacity: 0 });

      const intro = gsap.timeline({ defaults: { ease: "power3.out" } });
      intro
        .to(chars, { y: 0, opacity: 1, duration: 0.7, stagger: 0.045 })
        .to(statEls, { y: 0, opacity: 1, duration: 0.65, stagger: 0.11 }, "-=0.3");

      const getTravel = () =>
        Math.max(window.innerWidth - Math.min(window.innerWidth * 0.22, 260) - 36, 180);

      const setInitial = () => {
        gsap.set(car, { x: 0 });
        gsap.set(trail, { scaleX: 0, transformOrigin: "left center" });
      };

      setInitial();

      const drive = gsap.to(car, {
        x: getTravel,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom top",
          scrub: 0.65,
          pin: true,
          invalidateOnRefresh: true
        },
        onUpdate: function () {
          const x = Number(gsap.getProperty(car, "x"));
          const travel = getTravel();
          const progress = gsap.utils.clamp(0, 1, x / travel);

          gsap.set(trail, { scaleX: progress });

          chars.forEach((letter, index) => {
            const revealAt = index / Math.max(chars.length - 1, 1);
            const visible = progress >= revealAt * 0.92;
            gsap.to(letter, {
              opacity: visible ? 1 : 0.14,
              y: visible ? 0 : 8,
              duration: 0.12,
              overwrite: true
            });
          });
        }
      });

      // Keep the car/trail coherent if viewport dimensions change.
      const onResize = () => ScrollTrigger.refresh();
      window.addEventListener("resize", onResize);

      return () => {
        drive.kill();
        window.removeEventListener("resize", onResize);
      };
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#111111] text-white">
      <section ref={sectionRef} className="relative h-[210vh]">
        <div className="hero-stage sticky top-0 flex h-screen items-center overflow-hidden bg-[#d7d7d5]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(255,255,255,.5),transparent_55%)]" />

          <div className="relative z-10 w-full">
            <div className="road relative mx-auto h-[170px] w-full overflow-hidden bg-[#202020] shadow-[0_18px_60px_rgba(0,0,0,.18)] sm:h-[190px] lg:h-[210px]">
              <div
                ref={trailRef}
                className="absolute left-0 top-0 h-full w-full origin-left scale-x-0 bg-[#9be63d]"
              />

              <div
                ref={headlineRef}
                className="pointer-events-none absolute left-[4vw] top-1/2 z-20 flex -translate-y-1/2 flex-wrap items-center gap-x-[0.13em] text-[clamp(2.1rem,7vw,7.4rem)] font-semibold uppercase leading-none tracking-[0.18em] text-[#101010]"
                aria-label="WELCOME ITZFIZZ"
              >
                {letters.map((letter, i) => (
                  <span
                    key={`${letter}-${i}`}
                    data-letter
                    className={letter === " " ? "basis-[0.45em]" : ""}
                  >
                    {letter}
                  </span>
                ))}
              </div>

              <div
                ref={carRef}
                className="absolute bottom-1/2 left-0 z-30 h-[145px] -translate-y-1/2 translate-x-0 sm:h-[175px] lg:h-[205px]"
              >
                <CarIllustration />
              </div>

              <div className="pointer-events-none absolute inset-x-0 top-0 z-40 h-px bg-white/20" />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 z-40 h-px bg-black/20" />
            </div>
          </div>

          <div ref={statsRef} className="pointer-events-none absolute inset-0 z-50">
            {stats.map((stat, index) => (
              <div
                key={stat.value + index}
                data-stat
                className={[
                  "absolute hidden w-[min(270px,26vw)] rounded-xl p-5 shadow-xl backdrop-blur-sm md:block",
                  index === 0 ? "right-[31%] top-[7%] bg-[#e7ff5b] text-black" : "",
                  index === 1 ? "right-[34%] bottom-[7%] bg-[#72cfff] text-black" : "",
                  index === 2 ? "right-[9%] top-[7%] bg-[#303030] text-white" : "",
                  index === 3 ? "right-[11%] bottom-[7%] bg-[#ff8137] text-black" : ""
                ].join(" ")}
              >
                <div className="text-4xl font-semibold tracking-tight lg:text-5xl">{stat.value}</div>
                <div className="mt-2 max-w-[190px] text-sm font-medium leading-5">{stat.label}</div>
              </div>
            ))}
          </div>

          <div className="absolute bottom-6 left-5 right-5 z-50 flex items-center justify-between text-[10px] font-semibold uppercase tracking-[0.22em] text-black/60 sm:bottom-8 sm:left-8 sm:right-8">
            <span>Scroll to explore</span>
            <span>01 / 04</span>
          </div>
        </div>
      </section>

      <section className="flex min-h-screen items-center justify-center bg-[#111111] px-6">
        <div className="text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-white/40">Next chapter</p>
          <h2 className="text-[clamp(3rem,9vw,9rem)] font-semibold tracking-[-0.05em] text-white/10">
            BUILT TO MOVE
          </h2>
        </div>
      </section>
    </main>
  );
}
