"use client";

import { useState } from "react";
import Image from "next/image";
import { InterfaceEventImage } from "@/types/event";
import { FALLBACK_IMAGE } from "@/utils/constants";

// EventImage Component
const EventImage = ({ imgURL, title, variant = "page" }: InterfaceEventImage) => {
  const [imgSrc, setImgSrc] = useState(imgURL);

  const containerClasses = variant === "page"
    ? "w-full h-[300px] relative"
    : "w-full aspect-video relative";

  const imageClasses = variant === "page"
    ? "object-cover"
    : "object-cover rounded-t-lg";

  return (
    <div className={containerClasses}>
      <Image
        src={imgSrc}
        alt={title}
        fill
        onError={() => setImgSrc(FALLBACK_IMAGE)}
        className={imageClasses}
        sizes={
          variant === "page"
            ? "100vw"
            : "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
        }
        priority={variant === "page"}
      />
    </div>
  );
};

export default EventImage;