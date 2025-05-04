"use client";

// react/next imports
import { useState } from "react";
import Image from "next/image";

// types & utils
import { InterfaceEventImage } from "@/types/event";
import { FALLBACK_IMAGE } from "@/utils/constants";

const EventImage = ({ imgURL, title }: InterfaceEventImage) => {
  const [imgSrc, setImgSrc] = useState(imgURL);

  return (
    <Image
      src={imgSrc}
      alt={title}
      fill={true}
      onError={() => setImgSrc(FALLBACK_IMAGE)}
      className={`object-cover rounded-t-lg`}
    />
  );
};

export default EventImage;
