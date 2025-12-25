import { cn } from "@/lib/utils";
import { useEffect, useRef } from "react";
import rough from "roughjs";

interface HandDrawCardProps extends React.ComponentProps<"div"> {
  strokeColor?: string;
}

function HandDrawCard({
  className,
  strokeColor = "#ffffff",
  children,
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

      const SCRIBBLE = 2;
      const CURVATURE = 3;
      const PADDING = 20;

      const width = rect.width - PADDING * 2;
      const height = rect.height - PADDING * 2;

      rc.rectangle(PADDING, PADDING, width, height, {
        stroke: strokeColor,
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
  }, [strokeColor]);

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
