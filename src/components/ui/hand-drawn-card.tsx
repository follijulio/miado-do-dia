"use client";
import { cn } from "@/lib/utils";
import { useEffect, useRef } from "react";
import rough from "roughjs";

interface HandDrawCardProps extends React.ComponentProps<"div"> {
  curvature?: number;
  scribble?: number;
}

function HandDrawCard({
  className,
  children,
  curvature,
  scribble,
  ...props
}: HandDrawCardProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const canvas = canvasRef.current;
    const container = containerRef.current;

    const rc = rough.canvas(canvas);

    const updateCanvasSize = () => {
      const rect = container.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;

      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;

      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.scale(dpr, dpr);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }

      const SCRIBBLE = scribble ? scribble : 2;
      const CURVATURE = curvature ? curvature : 3;

      const PADDING = 10;

      const width = rect.width - PADDING * 2;
      const height = rect.height - PADDING * 2;

      rc.rectangle(PADDING, PADDING, width, height, {
        stroke: "#ffffff",
        strokeWidth: 2,
        roughness: SCRIBBLE,
        bowing: CURVATURE,
        fill: "transparent",
        seed: 12,
      });
    };

    const resizeObserver = new ResizeObserver(() => {
      requestAnimationFrame(updateCanvasSize);
    });

    resizeObserver.observe(container);
    updateCanvasSize();

    return () => {
      resizeObserver.disconnect();
    };
  }, [curvature, scribble]);

  return (
    <div
      ref={containerRef}
      className={cn("relative p-6", className)}
      {...props}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none z-0"
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}

export { HandDrawCard };
