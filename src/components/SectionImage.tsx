import Image from "next/image";

type SectionImageProps = {
  src: string;
  alt: string;
  caption?: string;
  priority?: boolean;
  className?: string;
  aspect?: "wide" | "photo" | "hero";
};

const aspectClass = {
  wide: "aspect-[16/10]",
  photo: "aspect-[4/3]",
  hero: "aspect-[21/9] sm:aspect-[2.4/1]",
} as const;

export default function SectionImage({
  src,
  alt,
  caption,
  priority = false,
  className = "",
  aspect = "wide",
}: SectionImageProps) {
  return (
    <figure className={`not-prose overflow-hidden ${className}`}>
      <div className={`relative w-full ${aspectClass[aspect]}`}>
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 90vw, 1200px"
          className="object-cover image-reveal"
        />
      </div>
      {caption ? (
        <figcaption className="mt-3 text-sm leading-relaxed text-slate-600 fade-up">{caption}</figcaption>
      ) : null}
    </figure>
  );
}
