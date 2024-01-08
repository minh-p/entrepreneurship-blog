"use client";

interface Asset {
  _ref: string;
  _type: string;
}

import { useNextSanityImage } from "next-sanity-image";
import Image from "next/image";
import { createClient } from "@sanity/client";

const sanityConfig = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION,
  useCdn: true,
});

const SanityImage = ({ asset }: { asset: Asset }) => {
  const imageProps = useNextSanityImage(sanityConfig, asset);

  return (
    <Image
      {...imageProps}
      layout="responsive"
      sizes="(max-width: 800px) 100vw, 800px"
      alt={asset._ref}
      className="mb-5"
    />
  );
};

export default SanityImage;
