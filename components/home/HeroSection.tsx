"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Search } from "lucide-react";
import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section className="pt-28 pb-12 sm:pt-24 lg:pt-28">
      <div className="w-full px-6 lg:px-10 xl:px-10 2xl:px-24">

        <div className="grid gap-5 lg:grid-cols-[2.05fr_1fr]">

          {/* ===================================================== */}
          {/* LEFT HERO */}
          {/* ===================================================== */}

          <motion.div
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="
              group
              relative
              rounded-[36px]

              lg:h-[650px]
            "
          >
            {/* IMAGE */}

            <div
            className="
            relative

            h-[520px]
            sm:h-[620px]
            lg:h-full

            overflow-hidden
            rounded-[36px]
            ">

              <Image
                src="/hero.jpg"
                alt="PALS Hero"
                fill
                priority
                className="
                  object-cover
                  transition-transform
                  duration-700
                  ease-out
                  group-hover:scale-105
                "
              />

              {/* DARK OVERLAY */}

              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-black/10" />

              <div className="absolute inset-0 bg-gradient-to-r from-black/35 via-transparent to-transparent" />

            </div>

            {/* CONTENT */}

            <div
              className="
              absolute
              inset-0
              flex
              flex-col
              justify-between

              p-6
              sm:p-8
              lg:p-10
              "
              >

              {/* TOP BADGE */}

              <div>

                <div
                  className="
                    inline-flex
                    items-center
                    rounded-full
                    bg-lime-300
                    px-5
                    py-2
                    text-xs
                    font-black
                    tracking-widest
                    text-black
                  "
                >
                  // $root login:PALS
                </div>

              </div>

              {/* BOTTOM CONTENT */}

              <div className="w-full max-w-[900px]">

                {/* Title + Button */}

                <div
                  className="
                    flex
                    flex-col
                    items-start
                    gap-6
                    md:flex-row
                    md:items-end
                    md:justify-between
                  "
                >
                    <h1
                    className="
                      font-black
                      leading-[0.9]
                      tracking-[-0.04em]
                      text-white
                      text-[2.4rem]
                      sm:text-[3rem]
                      md:text-[3.2rem]
                      lg:text-[3.5rem]
                      xl:text-[3.8rem]
                      "
                    >
                    WE BUILD
                    <br />

                    <span
                        className="
                        bg-gradient-to-r
                        from-fuchsia-400
                        via-pink-400
                        to-violet-500
                        bg-clip-text
                        text-transparent
                        "
                    >
                        FUTURE INNOVATORS.
                    </span>
                    </h1>

                    {/* CTA */}

                    <div
                      className="
                        mt-2
                        w-full
                        md:mt-6
                        md:w-auto
                      "
                    >
                    <Link
                        href="/events"
                        className="
                        group
                        inline-flex
                        items-center
                        justify-center
                        gap-2

                        w-[210px]
                        sm:w-[230px]
                        md:w-auto

                        rounded-full

                        border-[4px]
                        border-[#2f2f2f]

                        bg-white

                        px-6
                        py-4

                        text-[14px]
                        font-bold
                        uppercase

                        text-black

                        shadow-[0_8px_24px_rgba(0,0,0,0.35)]

                        transition-all
                        duration-300

                        hover:border-lime-300
                        hover:bg-lime-300
                        hover:-translate-y-1
                        "
                    >
                        <Search size={17} />

                        Explore Events
                    </Link>
                    </div>

                </div>

                {/* Description */}

                <p
                    className="
                    mt-7
                    max-w-md
                    text-[15px]
                    sm:text-[16px]
                    leading-7
                    max-w-full
                    sm:max-w-[340px]
                    font-semibold
                    text-left
                    text-gray-300
                    "
                >
                    PALS Club BMSIT&M empowers students through
                    innovation, experiential learning, hackathons,
                    workshops and leadership opportunities.
                </p>

                </div>

            </div>

          </motion.div>

          {/* ===================================================== */}
          {/* RIGHT SIDE */}
          {/* ===================================================== */}

          <div
          className="
          flex
          flex-col
          gap-5

          w-full
          h-full

          lg:h-[650px]
          ">

            {/* Large Info Card Placeholder */}

            <motion.div
              initial={{ opacity: 0, x: 28, y: 10 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
              className="
              rounded-[30px]
              bg-black
              text-white

              min-h-[250px]
              p-8

              sm:min-h-[300px]
              sm:p-10

              lg:h-[490px]
              lg:p-12
              "
            >
              <p
                className="
                  text-3xl
                  sm:text-4xl
                  lg:text-3xl
                  font-black
                  italic
                  uppercase
                  leading-tight
                "
              >
                POWERED BY
                <br />

                <span className="text-lime-300">
                  IIT
                </span>

                <br />

                Alumni.
              </p>

              <div className="mt-8 lg:mt-12 border-t border-white/15 pt-8">

                <p className="text-xs uppercase tracking-[0.35em] text-gray-500">
                  Backed By
                </p>

                <p className="mt-4 text-sm text-gray-400">
                  IIT Madras Alumni
                </p>

                <p className="mt-2 text-sm text-gray-400">
                  BMS Institute of Technology & Management
                </p>

              </div>

            </motion.div>

            {/* ===================================================== */}
            {/* Bottom Statistics */}
            {/* ===================================================== */}

            <div
              className="
                grid
                grid-cols-2
                gap-4
                lg:gap-5
                lg:grid-rows-1

                lg:h-[140px]
                min-h-0
                flex-shrink-0
              "
            >

            {/* Community Card */}

            <motion.div
                initial={{ opacity: 0, x: 24, y: 12 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ duration: 0.65, delay: 0.25, ease: "easeOut" }}
                whileHover={{
                y: -8,
                transition: {
                    duration: 0.25,
                },
                }}
                className="
                w-full
                h-full
                lg:h-[140px]
                min-h-0
                rounded-[24px]
                border-2 border-neutral-600
                bg-white
                px-6
                py-5
                shadow-sm
                transition-all
                hover:-translate-y-2
                hover:shadow-xl
                "
            >
                <div className="flex
                h-full
                flex-col
                items-center
                justify-center
                text-center">

                <div
                    className="
                    mb-3
                    flex
                    h-12
                    w-12
                    lg:h-14
                    lg:w-14
                    items-center
                    justify-center
                    rounded-full
                    bg-gray-100
                    "
                >
                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-gray-800"
                    >
                    <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                    <circle cx="8.5" cy="7" r="4"/>
                    <path d="M20 8v6"/>
                    <path d="M23 11h-6"/>
                    </svg>
                </div>

                <p className="text-xs font-semibold tracking-[0.3em] uppercase text-gray-500">
                    Community
                </p>

                <h2 className="mt-1 text-3xl lg:text-4xl font-black tracking-tight text-gray-900">
                    30+
                </h2>

                <p className="mt-2 text-sm text-gray-500">
                    Active Members
                </p>

                </div>
            </motion.div>

            {/* Events Card */}

            <motion.div
                initial={{ opacity: 0, x: 24, y: 12 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ duration: 0.65, delay: 0.35, ease: "easeOut" }}
                whileHover={{
                y: -8,
                transition: {
                    duration: 0.25,
                },
                }}
                className="
                relative
                h-full
                w-full
                lg:h-[140px]
                min-h-0
                overflow-hidden
                rounded-[24px]
                bg-lime-300
                px-6
                py-5
                shadow-sm
                transition-all
                hover:-translate-y-2
                hover:shadow-xl
                "
            >

                {/* Decorative Circle */}

                <div
                className="
                    absolute
                    h-24
                    w-24

                    lg:h-32
                    lg:w-32

                    -bottom-6
                    -right-6

                    lg:-bottom-10
                    lg:-right-10
                    rounded-full
                    bg-lime-400/50
                "
                />

                <div
                className="
                    relative
                    flex
                    h-full
                    flex-col
                    items-center
                    justify-center
                "
                >

                <div
                    className="
                    mb-2
                    lg:mb-2
                    lg:mb-3
                    flex
                    h-12
                    w-12
                    lg:h-14
                    lg:w-14
                    items-center
                    justify-center
                    rounded-full
                    bg-black/10
                    "
                >
                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="26"
                    height="26"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="text-black"
                    >
                    <path d="M12 2l2.39 4.84L20 7.64l-4 3.9.94 5.46L12 14.77 7.06 17l.94-5.46-4-3.9 5.61-.8L12 2z"/>
                    </svg>
                </div>

                <p className="text-[10px]
tracking-[0.25em]
uppercase font-semibold tracking-[0.3em] uppercase text-black/70">
                    Events
                </p>

                <h2 className="mt-1 text-3xl lg:text-4xl font-black tracking-tight text-black">
                    5+
                </h2>

                <p className="mt-2 text-sm text-black/70">
                    Planned for 2026
                </p>

                </div>

            </motion.div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}