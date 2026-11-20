import { useEffect, useRef, useState, type TouchEvent as ReactTouchEvent } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { sceneStudies } from "../content/sceneStudies";
import { FoodStage } from "./FoodStage";

export function SignatureStage() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const stageRef = useRef<HTMLElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const modelRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const touchStartX = useRef<number | null>(null);
  const activeStudy = sceneStudies[activeIndex];

  useEffect(() => {
    return () => {
      timelineRef.current?.kill();
      timelineRef.current = null;
    };
  }, []);

  function changeStudy(nextIndex: number) {
    if (
      isAnimating ||
      nextIndex === activeIndex ||
      !stageRef.current ||
      !copyRef.current ||
      !modelRef.current
    ) return;

    const nextStudy = sceneStudies[nextIndex];
    if (!nextStudy) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) {
      gsap.set(stageRef.current, { backgroundColor: nextStudy.background });
      setActiveIndex(nextIndex);
      return;
    }

    setIsAnimating(true);
    timelineRef.current?.kill();

    const timeline = gsap.timeline({
      onComplete: () => setIsAnimating(false),
    });
    timelineRef.current = timeline;

    timeline
      .to([copyRef.current, modelRef.current], {
        autoAlpha: 0,
        y: -16,
        scale: 0.985,
        duration: 0.28,
        ease: "power2.in",
        stagger: 0.025,
      }, 0)
      .to(stageRef.current, {
        backgroundColor: nextStudy.background,
        duration: 0.72,
        ease: "power2.inOut",
      }, 0)
      .add(() => setActiveIndex(nextIndex), 0.3)
      .fromTo(copyRef.current,
        { autoAlpha: 0, y: 18 },
        { autoAlpha: 1, y: 0, duration: 0.56, ease: "power3.out" },
        0.36,
      )
      .fromTo(modelRef.current,
        { autoAlpha: 0, y: 14, scale: 0.94 },
        { autoAlpha: 1, y: 0, scale: 1, duration: 0.78, ease: "power3.out" },
        0.34,
      );
  }

  const previous = () => changeStudy((activeIndex - 1 + sceneStudies.length) % sceneStudies.length);
  const next = () => changeStudy((activeIndex + 1) % sceneStudies.length);

  function handleTouchStart(event: ReactTouchEvent<HTMLDivElement>) {
    touchStartX.current = event.changedTouches[0]?.clientX ?? null;
  }

  function handleTouchEnd(event: ReactTouchEvent<HTMLDivElement>) {
    const startX = touchStartX.current;
    touchStartX.current = null;
    const endX = event.changedTouches[0]?.clientX;
    if (startX === null || endX === undefined || isAnimating) return;
    const deltaX = endX - startX;
    if (Math.abs(deltaX) < 44) return;
    if (deltaX < 0) next();
    else previous();
  }

  return (
    <section
      className="hero-stage signature-stage"
      ref={stageRef}
      role="region"
      aria-label="Crave4more signature 3D visual studies"
      aria-roledescription="carousel"
    >
      <div className="hero-stage__grain" aria-hidden="true" />
      <div className="hero-stage__copy signature-stage__copy" ref={copyRef} role="group" aria-roledescription="slide" aria-label={`${activeStudy.index} of ${sceneStudies.length}`}>
        <p className="sr-only" aria-live="polite">Visual study {activeStudy.index} of {sceneStudies.length}: {activeStudy.title.replace("\n", " ")}</p>
        <p className="eyebrow eyebrow--light"><span className="eyebrow__dot" /> FOOD, IN FOCUS <span className="eyebrow__divider">/</span> CRAVE4MORE</p>
        <p className="signature-stage__study-label">{activeStudy.index} / {activeStudy.label}</p>
        <h1>{activeStudy.title.split("\n").map((line, index) => (
          <span key={`${activeStudy.id}-${index}`} className={index === 1 ? "signature-stage__title-accent" : undefined}>{line}</span>
        ))}</h1>
        <p className="hero-stage__lead">{activeStudy.description}</p>
        <div className="hero-stage__actions">
          <Link className="button button--copper" to="/menu">Explore the menu <span aria-hidden="true">↗</span></Link>
          <Link className="text-link text-link--light" to="/about">Discover our approach <span aria-hidden="true">↗</span></Link>
        </div>
        <div className="signature-stage__controls">
          <div className="signature-stage__arrows">
            <button type="button" onClick={previous} disabled={isAnimating} aria-label="Previous visual study">←</button>
            <button type="button" onClick={next} disabled={isAnimating} aria-label="Next visual study">→</button>
          </div>
          <div className="signature-stage__pagination" role="group" aria-label="Choose a visual study">
            {sceneStudies.map((study, index) => (
              <button
                key={study.id}
                type="button"
                className={index === activeIndex ? "is-active" : ""}
                onClick={() => changeStudy(index)}
                disabled={isAnimating}
                aria-label={`Show visual study ${study.index}: ${study.label}`}
                aria-pressed={index === activeIndex}
              >
                <span>{study.index}</span>
              </button>
            ))}
          </div>
          <span className="signature-stage__count">{activeStudy.index} <i>/</i> 0{sceneStudies.length}</span>
        </div>
      </div>

      <div
        className="hero-stage__visual signature-stage__visual"
        ref={modelRef}
        aria-hidden="true"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <span className="signature-stage__ghost-word">{activeStudy.label.split(" /")[0]}</span>
        <div className="hero-stage__orbit hero-stage__orbit--outer" />
        <div className="hero-stage__orbit hero-stage__orbit--inner" />
        <div className="hero-stage__visual-index"><span>{activeStudy.index}</span><i /> 3D STUDY</div>
        <div className="hero-stage__model">
          <FoodStage
            modelPath={activeStudy.assetState === "ready" ? activeStudy.modelPath : null}
            posterPath={activeStudy.assetState === "ready" ? activeStudy.posterPath : null}
          />
        </div>
        <div className="hero-stage__visual-note">{activeStudy.visualNote.split(" · ").map((word, index) => (
          <span key={`${word}-${index}`}>{word}</span>
        ))}</div>
      </div>

      <div className="hero-stage__foot">
        <span>ASSET DEVELOPMENT PREVIEW / NOT A LIVE MENU</span>
        <a href="#experience">SCROLL TO EXPLORE <span aria-hidden="true">↓</span></a>
        <span className="hero-stage__foot-right">BY KOLEDEV</span>
      </div>
    </section>
  );
}
