"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export type MarqueeImage = string | { src: string; alt?: string };

const normalizeImage = (image: MarqueeImage) =>
  typeof image === "string" ? { src: image, alt: "Project preview" } : image;

export const ThreeDMarquee = ({
  images,
  className,
  reducedMotion = false,
}: {
  images: MarqueeImage[];
  className?: string;
  reducedMotion?: boolean;
}) => {
  const normalizedImages = images.map(normalizeImage);
  // Split the images array into 4 equal parts
  const chunkSize = Math.ceil(normalizedImages.length / 4);
  const chunks = Array.from({ length: 4 }, (_, colIndex) => {
    const start = colIndex * chunkSize;
    return normalizedImages.slice(start, start + chunkSize);
  });
  return (
    <div
      className={cn(
        "relative mx-auto block h-[600px] overflow-hidden rounded-2xl max-sm:h-100",
        className,
      )}
    >
      <div
        className="absolute inset-0 flex items-center justify-center px-8"
        style={{ perspective: "1200px" }}
      >
        <div
          style={{
            width: "min(1180px, 142vw)",
            transform: "rotateX(58deg) rotateY(0deg) rotateZ(-34deg)",
            transformStyle: "preserve-3d",
          }}
          className="grid shrink-0 origin-center grid-cols-4 gap-5 sm:gap-6"
        >
          {chunks.map((subarray, colIndex) => (
            <motion.div
              animate={{ y: reducedMotion ? 0 : colIndex % 2 === 0 ? 30 : -30 }}
              transition={
                reducedMotion
                  ? { duration: 0 }
                  : {
                      duration: colIndex % 2 === 0 ? 10 : 15,
                      repeat: Infinity,
                      repeatType: "reverse",
                    }
              }
              key={colIndex + "marquee"}
              className="relative flex flex-col items-start gap-5 sm:gap-6"
            >
              <GridLineVertical className="-left-3" offset="52px" />
              {subarray.map((image, imageIndex) => (
                <div className="relative w-full" key={imageIndex + image.src}>
                  <GridLineHorizontal className="-top-3" offset="18px" />
                  <motion.img
                    whileHover={reducedMotion ? undefined : { y: -8 }}
                    transition={{
                      duration: 0.3,
                      ease: "easeInOut",
                    }}
                    key={imageIndex + image.src}
                    src={image.src}
                    alt={image.alt || `Project preview ${imageIndex + 1}`}
                    loading="lazy"
                    decoding="async"
                    className="aspect-[970/700] w-full rounded-lg object-cover shadow-xl ring ring-gray-950/5 hover:shadow-2xl"
                    width={970}
                    height={700}
                  />
                </div>
              ))}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

const GridLineHorizontal = ({
  className,
  offset,
}: {
  className?: string;
  offset?: string;
}) => {
  return (
    <div
      style={
        {
          "--background": "#ffffff",
          "--color": "rgba(0, 0, 0, 0.2)",
          "--height": "1px",
          "--width": "5px",
          "--fade-stop": "90%",
          "--offset": offset || "200px", //-100px if you want to keep the line inside
          "--color-dark": "rgba(255, 255, 255, 0.2)",
          maskComposite: "exclude",
        } as React.CSSProperties
      }
      className={cn(
        "absolute left-[calc(var(--offset)/2*-1)] h-[var(--height)] w-[calc(100%+var(--offset))]",
        "bg-[linear-gradient(to_right,var(--color),var(--color)_50%,transparent_0,transparent)]",
        "[background-size:var(--width)_var(--height)]",
        "[mask:linear-gradient(to_left,var(--background)_var(--fade-stop),transparent),_linear-gradient(to_right,var(--background)_var(--fade-stop),transparent),_linear-gradient(black,black)]",
        "[mask-composite:exclude]",
        "z-30",
        "dark:bg-[linear-gradient(to_right,var(--color-dark),var(--color-dark)_50%,transparent_0,transparent)]",
        className,
      )}
    ></div>
  );
};

const GridLineVertical = ({
  className,
  offset,
}: {
  className?: string;
  offset?: string;
}) => {
  return (
    <div
      style={
        {
          "--background": "#ffffff",
          "--color": "rgba(0, 0, 0, 0.2)",
          "--height": "5px",
          "--width": "1px",
          "--fade-stop": "90%",
          "--offset": offset || "150px", //-100px if you want to keep the line inside
          "--color-dark": "rgba(255, 255, 255, 0.2)",
          maskComposite: "exclude",
        } as React.CSSProperties
      }
      className={cn(
        "absolute top-[calc(var(--offset)/2*-1)] h-[calc(100%+var(--offset))] w-[var(--width)]",
        "bg-[linear-gradient(to_bottom,var(--color),var(--color)_50%,transparent_0,transparent)]",
        "[background-size:var(--width)_var(--height)]",
        "[mask:linear-gradient(to_top,var(--background)_var(--fade-stop),transparent),_linear-gradient(to_bottom,var(--background)_var(--fade-stop),transparent),_linear-gradient(black,black)]",
        "[mask-composite:exclude]",
        "z-30",
        "dark:bg-[linear-gradient(to_bottom,var(--color-dark),var(--color-dark)_50%,transparent_0,transparent)]",
        className,
      )}
    ></div>
  );
};
