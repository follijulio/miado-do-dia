"use client";

import { useMemo } from "react";
import rough from "roughjs";

interface CustomRoughBarProps {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  fill?: string;
  stroke?: string;
}

const CustomRoughBar = (props: CustomRoughBarProps) => {
  const { x, y, width, height, fill, stroke } = props;

  const paths = useMemo(() => {
    if (typeof x !== "number" || typeof y !== "number" || !width || !height)
      return [];

    const generator = rough.generator();

    const shape = generator.rectangle(x, y, width, height, {
      stroke: stroke || "#ffffff",
      strokeWidth: 2,
      roughness: 1.5,
      bowing: 1.5,
      fill: fill,
      fillStyle: "hachure",
      hachureAngle: 60,
      hachureGap: 4,
    });
    return generator.toPaths(shape);
  }, [x, y, width, height, fill, stroke]);

  return (
    <g>
      {paths.map((p, index) => (
        <path
          key={`${p.d}-${index}`}
          d={p.d}
          stroke={p.stroke}
          strokeWidth={p.strokeWidth}
          fill={p.fill}
        />
      ))}
    </g>
  );
};

export { CustomRoughBar };
