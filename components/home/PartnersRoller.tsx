"use client";

import Image from "next/image";

const logos = [
  "/roller1.webp",
  "/roller2.png",
  "/roller3.png",
];

export default function PartnersRoller() {
  return (
    <section className="py-28 lg:py-32 overflow-hidden">

      <div className="max-w-[1700px] mx-auto px-8">

        {/* Heading */}

        <div className="text-center mb-14">

          <p className="text-sm uppercase tracking-[0.45em] text-gray-500">
            Trusted By
          </p>

          <h2 className="mt-4 text-5xl font-black tracking-tight text-black">
            OUR PARTNERS
          </h2>

        </div>

        {/* Marquee */}

        <div className="relative overflow-hidden">

  {/* Left Fade */}
  <div className="absolute left-0 top-0 z-10 h-full w-32 bg-gradient-to-r from-white to-transparent" />

  {/* Right Fade */}
  <div className="absolute right-0 top-0 z-10 h-full w-32 bg-gradient-to-l from-white to-transparent" />

  <div className="marquee">

    {[...logos, ...logos, ...logos, ...logos].map((logo, index) => (

      <div
        key={index}
        className="
          flex
          flex-shrink-0
          items-center
          justify-center
          px-14
          h-40
        "
      >

        <Image
          src={logo}
          alt={`Partner ${index}`}
          width={220}
          height={90}
          className="
            h-28
            w-auto
            object-contain
            grayscale
            opacity-80
            transition-all
            duration-300
            hover:grayscale-0
            hover:opacity-100
            hover:scale-105
          "
        />

      </div>

    ))}

  </div>

</div>

      </div>

    </section>
  );
}