"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export type ProjectMarqueeItem = {
  src: string;
  alt: string;
  title: string;
  category: string;
  featured?: boolean;
  fit?: "cover" | "contain";
  position?: string;
};

const distributeProjects = (items: ProjectMarqueeItem[]) => {
  const featured = items.filter((item) => item.featured);
  const supporting = items.filter((item) => !item.featured);

  return [
    [supporting[0], supporting[3]],
    [supporting[1], featured[1]],
    [featured[2], featured[0]],
    [featured[3], featured[4]],
    [supporting[2], supporting[4]],
  ].map((column) => column.filter(Boolean) as ProjectMarqueeItem[]);
};

export const ProjectMarquee = ({
  items,
  className,
  reducedMotion = false,
}: {
  items: ProjectMarqueeItem[];
  className?: string;
  reducedMotion?: boolean;
}) => {
  const columns = distributeProjects(items);
  const mobileItems = [
    ...items.filter((item) => item.featured),
    ...items.filter((item) => !item.featured),
  ];

  return (
    <div className={cn("project-marquee", className)}>
      <div className="project-marquee-stage" aria-hidden="true">
        <div className="project-marquee-plane">
          {columns.map((column, colIndex) => (
            <motion.div
              key={`project-marquee-col-${colIndex}`}
              className="project-marquee-column"
              animate={{ y: reducedMotion ? 0 : colIndex % 2 === 0 ? 24 : -24 }}
              transition={
                reducedMotion
                  ? { duration: 0 }
                  : {
                      duration: colIndex % 2 === 0 ? 8 : 10,
                      repeat: Infinity,
                      repeatType: "reverse",
                      ease: "easeInOut",
                    }
              }
            >
              {column.map((item) => (
                <ProjectMarqueeCard key={`${colIndex}-${item.title}`} item={item} reducedMotion={reducedMotion} />
              ))}
            </motion.div>
          ))}
        </div>
      </div>

      <div className="project-marquee-mobile" aria-label="Featured project previews">
        {mobileItems.map((item) => (
          <ProjectMarqueeCard key={`mobile-${item.title}`} item={item} reducedMotion />
        ))}
      </div>
    </div>
  );
};

const ProjectMarqueeCard = ({
  item,
  reducedMotion,
}: {
  item: ProjectMarqueeItem;
  reducedMotion: boolean;
}) => (
  <motion.figure
    className={cn("project-marquee-card", item.featured && "project-marquee-card-featured")}
    whileHover={reducedMotion ? undefined : { y: -5 }}
    transition={{ duration: 0.22, ease: "easeOut" }}
  >
    <div className="project-marquee-image">
      <img
        src={item.src}
        alt={item.alt}
        loading="lazy"
        decoding="async"
        style={{
          objectFit: "cover",
          objectPosition: item.position || "center",
        }}
      />
    </div>
    <figcaption>
      <span>{item.category}</span>
      <strong>{item.title}</strong>
    </figcaption>
  </motion.figure>
);

export const ThreeDMarquee = ProjectMarquee;
