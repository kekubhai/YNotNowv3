"use client";

import createGlobe, { COBEOptions } from "cobe";
import { useMotionValue, useSpring } from "motion/react";
import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

const MOVEMENT_DAMPING = 1400;

const GLOBE_CONFIG: COBEOptions = {
  width: 800,
  height: 800,
  onRender: () => {},
  devicePixelRatio: 2,
  phi: 0,
  theta: 0.3,
  dark: 0,
  diffuse: 0.4,
  mapSamples: 16000,
  mapBrightness: 1.2,
  baseColor: [1, 1, 1],
  markerColor: [251 / 255, 100 / 255, 21 / 255],
  glowColor: [1, 1, 1],
  markers: [
    { location: [14.5995, 120.9842], size: 0.03 },
    { location: [19.076, 72.8777], size: 0.1 },
    { location: [23.8103, 90.4125], size: 0.05 },
    { location: [30.0444, 31.2357], size: 0.07 },
    { location: [39.9042, 116.4074], size: 0.08 },
    { location: [-23.5505, -46.6333], size: 0.1 },
    { location: [19.4326, -99.1332], size: 0.1 },
    { location: [40.7128, -74.006], size: 0.1 },
    { location: [34.6937, 135.5022], size: 0.05 },
    { location: [41.0082, 28.9784], size: 0.06 },
  ],
};

export function Globe({
  className,
  config = GLOBE_CONFIG,
}: {
  className?: string;
  config?: COBEOptions;
}) {
  let phi = 0;
  let width = 0;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const pointerInteracting = useRef<number | null>(null);
  const pointerInteractionMovement = useRef(0);
  const [isMobile, setIsMobile] = useState(false);

  const r = useMotionValue(0);
  const rs = useSpring(r, {
    mass: 1,
    damping: 30,
    stiffness: 100,
  });

  const updatePointerInteraction = (value: number | null) => {
    pointerInteracting.current = value;
    if (canvasRef.current) {
      canvasRef.current.style.cursor = value !== null ? "grabbing" : "grab";
    }
  };

  const updateMovement = (clientX: number) => {
    if (pointerInteracting.current !== null) {
      const delta = clientX - pointerInteracting.current;
      pointerInteractionMovement.current = delta;
      // Adjust sensitivity for mobile
      const dampingFactor = isMobile ? MOVEMENT_DAMPING * 0.6 : MOVEMENT_DAMPING;
      r.set(r.get() + delta / dampingFactor);
    }
  };

  useEffect(() => {
    // Check if mobile device
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);

    const onResize = () => {
      if (canvasRef.current && containerRef.current) {
        // Make sure we're using the container width, not just the canvas
        width = containerRef.current.offsetWidth;
        // Update canvas dimensions
        canvasRef.current.width = width * 2;
        canvasRef.current.height = width * 2;
      }
    };

    window.addEventListener("resize", onResize);
    onResize();

    // Mobile devices might need adjusted parameters
    const mobileAdjustedConfig = {
      ...config,
      mapSamples: isMobile ? 10000 : config.mapSamples, // Lower for better performance
      devicePixelRatio: isMobile ? 1.5 : config.devicePixelRatio, // Lower for better performance
    };

    const globe = createGlobe(canvasRef.current!, {
      ...mobileAdjustedConfig,
      width: width * 2,
      height: width * 2,
      onRender: (state) => {
        // Slower rotation on mobile for better performance
        if (!pointerInteracting.current) phi += isMobile ? 0.003 : 0.005;
        state.phi = phi + rs.get();
        state.width = width * 2;
        state.height = width * 2;
      },
    });

    setTimeout(() => {
      if (canvasRef.current) {
        canvasRef.current.style.opacity = "1";
      }
    }, 100);
    
    return () => {
      globe.destroy();
      window.removeEventListener("resize", onResize);
      window.removeEventListener('resize', checkMobile);
    };
  }, [rs, config, isMobile]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "absolute inset-0 mx-auto aspect-[1/1] w-full max-w-[600px] md:max-w-[600px]",
        isMobile ? "max-w-[300px]" : "", // Smaller on mobile
        className,
      )}
    >
      <canvas
        className={cn(
          "size-full opacity-0 transition-opacity duration-500 [contain:layout_paint_size]",
          // Better touch handling for mobile
          isMobile ? "touch-manipulation" : ""
        )}
        ref={canvasRef}
        onPointerDown={(e) => {
          e.preventDefault(); // Prevent default touch behavior
          pointerInteracting.current = e.clientX;
          updatePointerInteraction(e.clientX);
        }}
        onPointerUp={() => updatePointerInteraction(null)}
        onPointerOut={() => updatePointerInteraction(null)}
        onMouseMove={(e) => updateMovement(e.clientX)}
        onTouchMove={(e) => {
          if (e.touches[0]) {
            e.preventDefault(); // Prevent scrolling while manipulating globe
            updateMovement(e.touches[0].clientX);
          }
        }}
      />
    </div>
  );
}
