"use client";

import { CaretLeft, CaretRight, ChatCircle, Heart } from "@phosphor-icons/react/dist/ssr";
import { useLayoutEffect, useRef, useState, type KeyboardEvent, type PointerEvent } from "react";
import { selectInertialTarget } from "@/components/carousel-physics";
import Image from "next/image";
import { clinica } from "@/config/clinica";
import { clinicPhotos } from "@/config/photos";
import { Reveal } from "@/components/Reveal";

type Post = {
  image: (typeof clinicPhotos.posts)[number];
  likes: string;
  cap: string;
  url?: string;
};

const SNAP_BASELINE = "";
const VELOCITY_WINDOW_MS = 100;

// Conteúdo de demonstração. Substituir por posts reais ou por um feed.
const posts: Post[] = [
  { image: clinicPhotos.posts[0], likes: "128", cap: "Antes da sessão", url: undefined },
  { image: clinicPhotos.posts[1], likes: "214", cap: "Consultório", url: undefined },
  { image: clinicPhotos.posts[2], likes: "341", cap: "Depoimento", url: undefined },
  { image: clinicPhotos.posts[3], likes: "502", cap: "Resultado", url: undefined },
  { image: clinicPhotos.posts[4], likes: "176", cap: "Equipe", url: undefined },
  { image: clinicPhotos.posts[5], likes: "193", cap: "Bastidor", url: undefined },
];

export function Bastidores() {
  const isLooping = posts.length > 1;
  const railRef = useRef<HTMLDivElement>(null);
  const postTargetsRef = useRef<number[]>([]);
  const activeIndexRef = useRef(0);
  const navigationTargetRef = useRef<number | null>(null);
  const animationRef = useRef({ frame: 0 });
  const snapRestoreRef = useRef({ frame: 0, token: 0 });
  const dragRef = useRef({
    pointerId: -1,
    startX: 0,
    startScrollLeft: 0,
    moved: false,
    samples: [] as { x: number; time: number }[],
  });
  const suppressClickRef = useRef(false);
  const suppressClickTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [sideCopies, setSideCopies] = useState(1);
  const [initialized, setInitialized] = useState(!isLooping);
  const [activeIndex, setActiveIndex] = useState(0);
  const [dragging, setDragging] = useState(false);
  const canonicalSequenceIndex = isLooping ? sideCopies : 0;
  const sequenceCount = isLooping ? sideCopies * 2 + 1 : 1;
  const sequences = Array.from({ length: sequenceCount }, (_, index) => index);

  const restoreSnap = (rail: HTMLDivElement) => {
    rail.style.scrollSnapType = dragRef.current.pointerId === -1 ? SNAP_BASELINE : "none";
  };

  const cancelPendingSnapRestore = (rail: HTMLDivElement) => {
    snapRestoreRef.current.token += 1;
    if (snapRestoreRef.current.frame) {
      cancelAnimationFrame(snapRestoreRef.current.frame);
      snapRestoreRef.current.frame = 0;
    }
    restoreSnap(rail);
  };

  const cancelControlAnimation = (rail: HTMLDivElement) => {
    if (animationRef.current.frame) {
      cancelAnimationFrame(animationRef.current.frame);
      animationRef.current.frame = 0;
    }
    restoreSnap(rail);
  };

  const jumpTo = (rail: HTMLDivElement, left: number) => {
    cancelPendingSnapRestore(rail);
    cancelControlAnimation(rail);
    const token = ++snapRestoreRef.current.token;
    rail.style.scrollSnapType = "none";
    rail.scrollTo({ left, behavior: "auto" });
    snapRestoreRef.current.frame = requestAnimationFrame(() => {
      if (snapRestoreRef.current.token !== token || animationRef.current.frame) return;
      snapRestoreRef.current.frame = 0;
      restoreSnap(rail);
    });
  };

  useLayoutEffect(() => {
    const rail = railRef.current;
    if (!rail) return;

    let frame = 0;
    let shouldRecalculate = true;

    const measureTargets = () => {
      const railRect = rail.getBoundingClientRect();
      const paddingLeft = Number.parseFloat(getComputedStyle(rail).paddingLeft) || 0;
      postTargetsRef.current = Array.from(
        rail.querySelectorAll<HTMLElement>("[data-carousel-card]"),
      ).map(
        (card) =>
          rail.scrollLeft + card.getBoundingClientRect().left - railRect.left - paddingLeft,
      );
    };

    const setLogicalActiveIndex = (physicalIndex: number) => {
      const nextIndex = physicalIndex % posts.length;
      if (activeIndexRef.current === nextIndex) return;
      activeIndexRef.current = nextIndex;
      setActiveIndex(nextIndex);
    };

    const update = () => {
      frame = 0;

      if (shouldRecalculate) {
        shouldRecalculate = false;
        measureTargets();

        if (isLooping) {
          const targets = postTargetsRef.current;
          const firstSequenceSpan = targets[posts.length] - targets[0];
          const nextSideCopies = Math.max(1, Math.ceil(rail.clientWidth / firstSequenceSpan));

          if (nextSideCopies !== sideCopies) {
            setInitialized(false);
            setSideCopies(nextSideCopies);
            return;
          }

          const targetScrollLeft =
            targets[canonicalSequenceIndex * posts.length + activeIndexRef.current];
          const scrollDelta = targetScrollLeft - rail.scrollLeft;
          jumpTo(rail, targetScrollLeft);
          if (dragRef.current.pointerId !== -1) {
            dragRef.current.startScrollLeft += scrollDelta;
          }
          setInitialized(true);
        }
      }

      const targets = postTargetsRef.current;
      if (!targets.length) return;
      if (animationRef.current.frame) return;

      const navigationTarget = navigationTargetRef.current;
      if (navigationTarget !== null) {
        const targetScrollLeft = targets[navigationTarget];
        if (Math.abs(rail.scrollLeft - targetScrollLeft) <= 1) {
          navigationTargetRef.current = null;
          const targetSequence = Math.floor(navigationTarget / posts.length);

          if (isLooping && targetSequence !== canonicalSequenceIndex) {
            const canonicalTarget =
              canonicalSequenceIndex * posts.length + (navigationTarget % posts.length);
            jumpTo(rail, targets[canonicalTarget]);
          }
        } else {
          setLogicalActiveIndex(navigationTarget);
          return;
        }
      }

      if (isLooping && navigationTargetRef.current === null) {
        const canonicalStartIndex = canonicalSequenceIndex * posts.length;
        const canonicalStart = targets[canonicalStartIndex];
        const nextStart = targets[canonicalStartIndex + posts.length];
        const sequenceSpan = nextStart - canonicalStart;
        const sequenceShift = -Math.floor((rail.scrollLeft - canonicalStart) / sequenceSpan);

        if (sequenceShift) {
          const scrollDelta = sequenceSpan * sequenceShift;
          jumpTo(rail, rail.scrollLeft + scrollDelta);

          if (dragRef.current.pointerId !== -1) {
            dragRef.current.startScrollLeft += scrollDelta;
          }
        }
      }

      let nearestPhysicalIndex = 0;
      let nearestDistance = Math.abs(targets[0] - rail.scrollLeft);

      for (let index = 1; index < targets.length; index += 1) {
        const distance = Math.abs(targets[index] - rail.scrollLeft);
        if (distance < nearestDistance - 1) {
          nearestDistance = distance;
          nearestPhysicalIndex = index;
        }
      }

      setLogicalActiveIndex(nearestPhysicalIndex);
    };

    const scheduleUpdate = (recalculate = false) => {
      shouldRecalculate ||= recalculate;
      if (!frame) frame = requestAnimationFrame(update);
    };

    const handleScroll = () => scheduleUpdate();
    const handleNativeInteraction = () => {
      cancelPendingSnapRestore(rail);
      cancelControlAnimation(rail);
      navigationTargetRef.current = null;
      scheduleUpdate();
    };
    const handleResize = () => {
      cancelPendingSnapRestore(rail);
      cancelControlAnimation(rail);
      navigationTargetRef.current = null;
      scheduleUpdate(true);
    };

    rail.addEventListener("scroll", handleScroll, { passive: true });
    rail.addEventListener("wheel", handleNativeInteraction, { passive: true });
    rail.addEventListener("touchstart", handleNativeInteraction, { passive: true });
    rail.addEventListener("pointerdown", handleNativeInteraction, { passive: true });
    window.addEventListener("resize", handleResize);

    update();

    return () => {
      rail.removeEventListener("scroll", handleScroll);
      rail.removeEventListener("wheel", handleNativeInteraction);
      rail.removeEventListener("touchstart", handleNativeInteraction);
      rail.removeEventListener("pointerdown", handleNativeInteraction);
      window.removeEventListener("resize", handleResize);
      if (frame) cancelAnimationFrame(frame);
      cancelPendingSnapRestore(rail);
      cancelControlAnimation(rail);
      if (suppressClickTimerRef.current) clearTimeout(suppressClickTimerRef.current);
    };
  }, [canonicalSequenceIndex, isLooping, sideCopies]);

  const scrollToPhysicalPoint = (physicalIndex: number) => {
    const rail = railRef.current;
    const targets = postTargetsRef.current;
    if (!rail || !targets.length) return;

    const targetScrollLeft = targets[physicalIndex];
    if (targetScrollLeft === undefined) return;

    const nextIndex = physicalIndex % posts.length;
    activeIndexRef.current = nextIndex;
    setActiveIndex(nextIndex);

    const recenterClonedTarget = () => {
      const targetSequence = Math.floor(physicalIndex / posts.length);
      if (!isLooping || targetSequence === canonicalSequenceIndex) return;

      const canonicalTarget = canonicalSequenceIndex * posts.length + nextIndex;
      jumpTo(rail, targets[canonicalTarget]);
    };

    cancelPendingSnapRestore(rail);
    cancelControlAnimation(rail);

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (Math.abs(rail.scrollLeft - targetScrollLeft) <= 1 || reducedMotion) {
      navigationTargetRef.current = null;
      const targetSequence = Math.floor(physicalIndex / posts.length);
      const directTarget =
        reducedMotion && isLooping && targetSequence !== canonicalSequenceIndex
          ? targets[canonicalSequenceIndex * posts.length + nextIndex]
          : targetScrollLeft;
      rail.scrollTo({ left: directTarget, behavior: "auto" });
      if (reducedMotion) return;
      recenterClonedTarget();
      return;
    }

    navigationTargetRef.current = physicalIndex;
    rail.style.scrollSnapType = "none";
    const startLeft = rail.scrollLeft;
    const startTime = performance.now();

    const animate = (time: number) => {
      const progress = Math.min(1, (time - startTime) / 400);
      const easedProgress = 1 - (1 - progress) ** 3;
      rail.scrollLeft = startLeft + (targetScrollLeft - startLeft) * easedProgress;

      if (progress < 1) {
        animationRef.current.frame = requestAnimationFrame(animate);
        return;
      }

      rail.scrollLeft = targetScrollLeft;
      animationRef.current.frame = 0;
      restoreSnap(rail);
      navigationTargetRef.current = null;
      recenterClonedTarget();
    };

    animationRef.current.frame = requestAnimationFrame(animate);
  };

  const scrollToPost = (index: number) => {
    scrollToPhysicalPoint(isLooping ? canonicalSequenceIndex * posts.length + index : index);
  };

  const moveOneCard = (direction: -1 | 1) => {
    const rail = railRef.current;
    const targets = postTargetsRef.current;
    if (!isLooping || !rail || !targets.length) return;

    let physicalIndex = navigationTargetRef.current;
    if (physicalIndex === null) {
      physicalIndex = 0;
      let nearestDistance = Math.abs(targets[0] - rail.scrollLeft);

      for (let index = 1; index < targets.length; index += 1) {
        const distance = Math.abs(targets[index] - rail.scrollLeft);
        if (distance < nearestDistance - 1) {
          nearestDistance = distance;
          physicalIndex = index;
        }
      }
    }

    const physicalSequenceIndex = Math.floor(physicalIndex / posts.length);
    if (physicalSequenceIndex !== canonicalSequenceIndex) {
      const sequenceShift = canonicalSequenceIndex - physicalSequenceIndex;
      const canonicalStartIndex = canonicalSequenceIndex * posts.length;
      const sequenceSpan = targets[canonicalStartIndex + posts.length] - targets[canonicalStartIndex];
      jumpTo(rail, rail.scrollLeft + sequenceSpan * sequenceShift);
      physicalIndex += posts.length * sequenceShift;
    }

    scrollToPhysicalPoint(physicalIndex + direction);
  };

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse" || event.button !== 0) return;

    cancelPendingSnapRestore(event.currentTarget);
    cancelControlAnimation(event.currentTarget);
    navigationTargetRef.current = null;
    if (suppressClickTimerRef.current) clearTimeout(suppressClickTimerRef.current);
    suppressClickRef.current = false;
    dragRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startScrollLeft: event.currentTarget.scrollLeft,
      moved: false,
      samples: [{ x: event.clientX, time: event.timeStamp }],
    };
  };

  const finishPointerSession = (
    rail: HTMLDivElement,
    pointerId: number,
    releaseCapture: boolean,
    finalSample?: { x: number; time: number },
  ) => {
    const drag = dragRef.current;
    if (drag.pointerId !== pointerId) return;

    const moved = drag.moved;
    if (finalSample) {
      drag.samples.push(finalSample);
    }
    const recentSamples = drag.samples.filter(
      (sample) => (finalSample?.time ?? sample.time) - sample.time <= VELOCITY_WINDOW_MS,
    );
    const firstSample = recentSamples[0];
    const lastSample = recentSamples.at(-1);
    const elapsed = firstSample && lastSample ? lastSample.time - firstSample.time : 0;
    const scrollVelocity =
      firstSample && lastSample && elapsed > 0
        ? -(lastSample.x - firstSample.x) / elapsed
        : 0;

    dragRef.current.pointerId = -1;
    dragRef.current.samples = [];
    suppressClickRef.current = moved;
    setDragging(false);

    if (releaseCapture && rail.hasPointerCapture(pointerId)) {
      rail.releasePointerCapture(pointerId);
    }

    if (moved) {
      const targets = postTargetsRef.current;
      const cardStride = targets.length > 1 ? Math.abs(targets[1] - targets[0]) : 0;
      const targetIndex = selectInertialTarget({
        currentScrollLeft: rail.scrollLeft,
        velocity: scrollVelocity,
        targets,
        maxProjection: cardStride * 1.5,
      });
      if (targetIndex >= 0) scrollToPhysicalPoint(targetIndex);

      suppressClickTimerRef.current = setTimeout(() => {
        suppressClickRef.current = false;
      }, 0);
    }
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (drag.pointerId !== event.pointerId) return;
    if (!(event.buttons & 1)) {
      finishPointerSession(event.currentTarget, event.pointerId, true, {
        x: event.clientX,
        time: event.timeStamp,
      });
      return;
    }

    const distance = event.clientX - drag.startX;
    if (!drag.moved && Math.abs(distance) > 6) {
      drag.moved = true;
      event.currentTarget.setPointerCapture(event.pointerId);
      event.currentTarget.style.scrollSnapType = "none";
      setDragging(true);
    }
    if (!drag.moved) return;

    event.preventDefault();
    event.currentTarget.scrollLeft = drag.startScrollLeft - distance;
    drag.samples.push({ x: event.clientX, time: event.timeStamp });
    drag.samples = drag.samples.filter(
      (sample) => event.timeStamp - sample.time <= VELOCITY_WINDOW_MS,
    );
  };

  const finishDrag = (event: PointerEvent<HTMLDivElement>) =>
    finishPointerSession(
      event.currentTarget,
      event.pointerId,
      event.type !== "lostpointercapture",
      { x: event.clientX, time: event.timeStamp },
    );

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (!isLooping || event.target !== event.currentTarget) return;
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      moveOneCard(-1);
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      moveOneCard(1);
    }
  };

  return (
    <section className="overflow-hidden bg-cream-alt py-[clamp(64px,9vw,120px)]">
      <div className="mx-auto w-full max-w-[1280px] px-[clamp(18px,5vw,48px)]">
        <Reveal className="flex flex-wrap items-end justify-between gap-5">
          <h2 className="max-w-[560px] font-serif text-[clamp(32px,4.4vw,54px)] leading-[1.12] font-light">
            O dia a dia da clínica no Instagram
          </h2>
          <div className="flex items-center gap-5">
            <a
              href={clinica.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="border-b border-line-strong pb-[6px] text-[13px] tracking-[0.12em] text-gold-deep uppercase transition-colors duration-300 hover:border-gold hover:text-ink"
            >
              {clinica.instagram.handle}
            </a>
            {posts.length > 1 ? (
              <div
                role="group"
                className="hidden items-center gap-2 md:flex"
                aria-label="Controles do carrossel"
              >
                <button
                  type="button"
                  aria-label="Post anterior"
                  onClick={() => moveOneCard(-1)}
                  className="grid size-11 place-items-center rounded-full border border-line-strong text-ink transition-[transform,border-color,color] duration-200 hover:border-gold hover:text-gold-deep active:scale-95"
                >
                  <CaretLeft size={18} weight="light" aria-hidden />
                </button>
                <button
                  type="button"
                  aria-label="Próximo post"
                  onClick={() => moveOneCard(1)}
                  className="grid size-11 place-items-center rounded-full border border-line-strong text-ink transition-[transform,border-color,color] duration-200 hover:border-gold hover:text-gold-deep active:scale-95"
                >
                  <CaretRight size={18} weight="light" aria-hidden />
                </button>
              </div>
            ) : null}
          </div>
        </Reveal>
      </div>

      {posts.length > 0 ? (
        <div
          ref={railRef}
          role="region"
          aria-label="Posts do Instagram da clínica"
          data-dragging={dragging ? "true" : undefined}
          tabIndex={0}
          onKeyDown={handleKeyDown}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={finishDrag}
          onPointerCancel={finishDrag}
          onLostPointerCapture={finishDrag}
          onClickCapture={(event) => {
            if (!suppressClickRef.current) return;
            event.preventDefault();
            event.stopPropagation();
            suppressClickRef.current = false;
          }}
          className={`no-scrollbar mx-auto mt-[clamp(28px,4vw,48px)] flex w-full max-w-[1280px] snap-x snap-mandatory scroll-px-[clamp(18px,5vw,48px)] select-none gap-[clamp(14px,2vw,26px)] overflow-x-auto px-[clamp(18px,5vw,48px)] pt-[14px] pb-[22px] focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-gold md:cursor-grab ${initialized ? "" : "pointer-events-none invisible"} ${dragging ? "md:cursor-grabbing" : ""}`}
        >
          {sequences.flatMap((sequence) =>
            posts.map((post, index) => {
              const isClone = isLooping && sequence !== canonicalSequenceIndex;

              return (
                <figure
                  key={`${sequence}-${index}`}
                  data-carousel-card
                  aria-hidden={isClone ? "true" : undefined}
                  className="relative m-0 w-[min(74vw,260px)] shrink-0 snap-start overflow-hidden rounded-[3px] border border-line bg-white shadow-[0_14px_30px_-24px_rgba(33,28,25,.5)] transition duration-400 hover:-translate-y-2 hover:shadow-[0_34px_60px_-30px_rgba(33,28,25,.5)]"
                >
                  {post.url ? (
                    <a
                      href={post.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      draggable={false}
                      tabIndex={isClone ? -1 : undefined}
                      aria-label={isClone ? undefined : `Abrir post: ${post.cap}`}
                      className="absolute inset-0 z-10 focus-visible:outline-2 focus-visible:outline-offset-[-3px] focus-visible:outline-gold"
                    />
                  ) : null}
                  <PostContent post={post} />
                </figure>
              );
            }),
          )}
        </div>
      ) : null}

      {posts.length > 1 ? (
        <div role="group" className="mt-1 flex justify-center gap-2" aria-label="Selecionar posição do carrossel">
          {posts.map((_, index) => (
            <button
              key={index}
              type="button"
              aria-label={`Ir para o post ${index + 1}`}
              aria-current={activeIndex === index ? "true" : undefined}
              onClick={() => scrollToPost(index)}
              className="grid size-11 place-items-center rounded-full"
            >
              <span
                className={`block size-1.5 rounded-full transition-[transform,background-color] duration-200 ${
                  activeIndex === index ? "scale-125 bg-gold-deep" : "bg-line-strong hover:bg-gold"
                }`}
              />
            </button>
          ))}
        </div>
      ) : null}
    </section>
  );
}

function PostContent({ post }: { post: Post }) {
  return (
    <>
      <div className="flex items-center gap-[10px] px-[14px] py-3">
        <span className="size-[30px] shrink-0 rounded-full border border-line-soft bg-radial-[at_30%_30%] from-blush-deep to-gold-light" />
        <span className="truncate text-[12px] tracking-[0.08em] text-ink">
          {clinica.instagram.handle.replace("@", "")}
        </span>
      </div>

      <div className="relative aspect-square w-full overflow-hidden">
        <Image
          src={post.image.src}
          alt={post.image.alt}
          fill
          draggable={false}
          sizes="(max-width: 768px) 74vw, 260px"
          className="pointer-events-none object-cover"
          style={{ objectPosition: post.image.objectPosition }}
        />
      </div>

      <figcaption className="grid gap-[6px] px-[14px] pt-3 pb-4">
        <div className="flex items-center gap-3 text-ink">
          <Heart size={15} weight="light" aria-hidden />
          <ChatCircle size={15} weight="light" aria-hidden />
          <span className="ml-auto text-[11px] tracking-[0.14em] text-faint uppercase">
            {post.likes} curtidas
          </span>
        </div>
        <span className="truncate text-[13px] font-light text-muted-deep">{post.cap}</span>
      </figcaption>
    </>
  );
}
