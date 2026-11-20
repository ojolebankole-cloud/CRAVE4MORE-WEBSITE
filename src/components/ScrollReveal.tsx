import { useEffect, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function ScrollReveal({ children }: { children: ReactNode }) {
  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    const targets = gsap.utils.toArray<HTMLElement>("[data-reveal]");
    const animations = targets.map((element) =>
      gsap.fromTo(
        element,
        { autoAlpha: 0, y: 26 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.82,
          ease: "power3.out",
          scrollTrigger: {
            trigger: element,
            start: "top 88%",
            once: true,
          },
        },
      ),
    );

    return () => {
      animations.forEach((animation) => animation.scrollTrigger?.kill());
      animations.forEach((animation) => animation.kill());
    };
  }, []);

  return <>{children}</>;
}
