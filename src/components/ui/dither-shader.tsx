"use client";

import React from "react";

type DitherShaderProps = {
  src: string;
  gridSize?: number;
  ditherMode?: "bayer" | "random" | "none";
  colorMode?: "grayscale" | "color";
  invert?: boolean;
  animated?: boolean;
  animationSpeed?: number;
  primaryColor?: string;
  secondaryColor?: string;
  threshold?: number;
  objectFit?: "cover" | "contain";
  className?: string;
  ariaLabel?: string;
};

const BAYER_4 = [
  0, 8, 2, 10,
  12, 4, 14, 6,
  3, 11, 1, 9,
  15, 7, 13, 5,
];

const clamp = (value: number, min: number, max: number) =>
  Math.max(min, Math.min(max, value));

const hash2D = (x: number, y: number) => {
  const value = Math.sin(x * 12.9898 + y * 78.233) * 43758.5453123;
  return value - Math.floor(value);
};

export const DitherShader: React.FC<DitherShaderProps> = ({
  src,
  gridSize = 2,
  ditherMode = "bayer",
  colorMode = "grayscale",
  invert = false,
  animated = false,
  animationSpeed = 0.02,
  primaryColor = "#000000",
  secondaryColor = "#f5f5f5",
  threshold = 0.5,
  objectFit = "cover",
  className,
  ariaLabel = "Dithered image",
}) => {
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
  const frameRef = React.useRef<number | null>(null);
  const resizeRef = React.useRef<ResizeObserver | null>(null);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    let isCancelled = false;
    let resizeFrame: number | null = null;
    const image = new Image();
    image.crossOrigin = "anonymous";
    image.src = src;

    const render = (time = 0) => {
      if (isCancelled || !canvas || !image.naturalWidth) return;

      const rect = canvas.getBoundingClientRect();
      const displayWidth = Math.max(1, Math.round(rect.width || 1));
      const displayHeight = Math.max(1, Math.round(rect.height || 1));
      const dpr = window.devicePixelRatio || 1;
      const pixelWidth = Math.floor(displayWidth * dpr);
      const pixelHeight = Math.floor(displayHeight * dpr);

      if (canvas.width !== pixelWidth || canvas.height !== pixelHeight) {
        canvas.width = pixelWidth;
        canvas.height = pixelHeight;
      }

      const context = canvas.getContext("2d");
      if (!context) return;

      context.resetTransform();
      context.scale(dpr, dpr);
      context.clearRect(0, 0, displayWidth, displayHeight);

      const source = document.createElement("canvas");
      source.width = displayWidth;
      source.height = displayHeight;

      const sourceContext = source.getContext("2d", { willReadFrequently: true });
      if (!sourceContext) return;

      const imageWidth = image.naturalWidth || displayWidth;
      const imageHeight = image.naturalHeight || displayHeight;
      const scale =
        objectFit === "contain"
          ? Math.min(displayWidth / imageWidth, displayHeight / imageHeight)
          : Math.max(displayWidth / imageWidth, displayHeight / imageHeight);
      const drawWidth = imageWidth * scale;
      const drawHeight = imageHeight * scale;
      const drawX = (displayWidth - drawWidth) / 2;
      const drawY = (displayHeight - drawHeight) / 2;

      sourceContext.drawImage(image, drawX, drawY, drawWidth, drawHeight);

      let imageData: ImageData;
      try {
        imageData = sourceContext.getImageData(0, 0, displayWidth, displayHeight);
      } catch {
        context.drawImage(image, 0, 0, displayWidth, displayHeight);
        return;
      }

      const data = imageData.data;
      const step = Math.max(1, Math.floor(gridSize));
      const baseThreshold = clamp(threshold, 0, 1);

      for (let y = 0; y < displayHeight; y += step) {
        for (let x = 0; x < displayWidth; x += step) {
          const px = Math.min(displayWidth - 1, x + Math.floor(step / 2));
          const py = Math.min(displayHeight - 1, y + Math.floor(step / 2));
          const index = (py * displayWidth + px) * 4;
          const r = data[index];
          const g = data[index + 1];
          const b = data[index + 2];
          const a = data[index + 3] / 255;
          let luminance = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;

          if (invert) luminance = 1 - luminance;

          const matrixX = Math.floor(x / step) % 4;
          const matrixY = Math.floor(y / step) % 4;
          const bayer = BAYER_4[matrixY * 4 + matrixX] / 16;
          const noise = ditherMode === "random" ? hash2D(x, y) : 0.5;
          const ordered = ditherMode === "bayer" ? bayer : noise;
          const animation =
            animated
              ? Math.sin(time * animationSpeed + x * 0.08 + y * 0.05) * 0.045
              : 0;
          const cutoff =
            ditherMode === "none"
              ? baseThreshold
              : clamp(baseThreshold + (ordered - 0.5) * 0.48 + animation, 0, 1);
          const isLight = luminance >= cutoff;

          context.globalAlpha = a;
          if (colorMode === "color" && isLight) {
            context.fillStyle = `rgb(${r}, ${g}, ${b})`;
          } else {
            context.fillStyle = isLight ? secondaryColor : primaryColor;
          }
          context.fillRect(x, y, step, step);
        }
      }

      context.globalAlpha = 1;
    };

    const loop = (time: number) => {
      render(time);
      frameRef.current = window.requestAnimationFrame(loop);
    };

    image.onload = () => {
      if (isCancelled) return;
      render();

      resizeRef.current = new ResizeObserver(() => {
        if (resizeFrame) window.cancelAnimationFrame(resizeFrame);
        resizeFrame = window.requestAnimationFrame(() => render());
      });
      resizeRef.current.observe(canvas);

      if (animated) {
        frameRef.current = window.requestAnimationFrame(loop);
      }
    };

    image.onerror = () => {
      console.error("Failed to load image for DitherShader:", src);
    };

    return () => {
      isCancelled = true;
      if (frameRef.current) window.cancelAnimationFrame(frameRef.current);
      if (resizeFrame) window.cancelAnimationFrame(resizeFrame);
      resizeRef.current?.disconnect();
    };
  }, [
    src,
    gridSize,
    ditherMode,
    colorMode,
    invert,
    animated,
    animationSpeed,
    primaryColor,
    secondaryColor,
    threshold,
    objectFit,
  ]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      role="img"
      aria-label={ariaLabel}
    />
  );
};
