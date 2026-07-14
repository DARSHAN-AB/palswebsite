export default function TaglineSection() {
  return (
    <section className="bg-transparent py-28 lg:py-36">
      <div className="mx-auto max-w-[1500px] px-6">

        <h2
          className="
            text-center
            font-black
            uppercase
            tracking-[-0.04em]
            leading-[1.15]
            text-black
            text-1xl
            sm:text-4xl
            lg:text-5xl
          "
        >
          "WE DON'T JUST HOST EVENTS. WE COLLABORATE WITH
          <br />
          THE BEST TO CREATE{" "}
          <span className="relative inline-block">

            <span
              className="
                bg-gradient-to-r
                from-fuchsia-500
                via-purple-500
                to-indigo-500
                bg-clip-text
                text-transparent
              "
            >
              MASTERPIECES.
            </span>

            <span
              className="
                absolute
                left-0
                bottom-1
                -z-10
                h-3
                w-full
                bg-lime-300
              "
            />

          </span>
          "
        </h2>

      </div>
    </section>
  );
}