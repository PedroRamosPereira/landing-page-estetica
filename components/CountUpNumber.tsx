"use client";

import { useEffect, useRef, useState } from "react";
import { countUpValue, formatCountUpValue } from "./count-up";

type CountUpNumberProps = {
  target: number;
  duration?: number;
};

export function CountUpNumber({ target, duration = 1200 }: CountUpNumberProps) {
  const [value, setValue] = useState(target);
  const elementRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    setValue(target);

    const element = elementRef.current;
    const reducedMotion = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (!element || reducedMotion || !("IntersectionObserver" in window)) return;

    let active = true;
    let started = false;
    let frame: number | null = null;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!active || started || !entry?.isIntersecting) return;

        started = true;
        observer.disconnect();
        const startedAt = performance.now();
        setValue(0);

        const animate = (now: number) => {
          if (!active) return;

          const elapsed = now - startedAt;
          setValue(countUpValue({ elapsed, duration, target }));

          if (elapsed < duration) {
            frame = requestAnimationFrame(animate);
          } else {
            frame = null;
          }
        };

        frame = requestAnimationFrame(animate);
      },
      { threshold: 0.35 },
    );

    observer.observe(element);

    return () => {
      active = false;
      observer.disconnect();
      if (frame !== null) cancelAnimationFrame(frame);
    };
  }, [duration, target]);

  const formattedTarget = formatCountUpValue(target);

  return (
    <>
      <span
        ref={elementRef}
        aria-hidden="true"
        className="inline-block min-w-[6ch] tabular-nums"
      >
        {formatCountUpValue(value)}
      </span>
      <span className="sr-only">{formattedTarget}</span>
    </>
  );
}
