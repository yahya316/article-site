import Image from "next/image";

export default function HeroQuote({ quote }) {
  return (
    <div className="relative w-full h-[400px] sm:h-[500px] md:h-[600px]">
      <Image
        src="/images/hero-bg.jpg"
        alt="Hero Background"
        fill
        priority
        className="object-cover"
      />
      <div className="absolute inset-0 flex items-center justify-center bg-black/50">
        <div className="text-center text-white p-4 sm:p-6">
          <blockquote className="text-2xl sm:text-3xl md:text-4xl font-bold italic">
            "{quote.text}"
          </blockquote>
          <p className="mt-4 text-lg sm:text-xl font-medium">
            - {quote.author}
          </p>
        </div>
      </div>
    </div>
  );
}