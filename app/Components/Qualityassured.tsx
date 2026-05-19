"use client";

const CARDS = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1577803645773-f96470509666?w=800&q=85",
    label: {
      heading: "QUALITY\nASSURED",
      body: "Lorem ipsum dolor sit amet consectetur. Rhoncus in quis iaculius suspendisse id velit odio sed.",
    },
    elevated: false,
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800&q=85",
    label: null,
    elevated: true,
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1508296695146-257a814070b4?w=800&q=85",
    label: null,
    elevated: false,
  },
];

export default function QualityAssured() {
  return (
    <section className="w-full bg-white overflow-hidden">
      <div className="flex flex-col md:grid md:grid-cols-3 md:items-end md:h-[440px] lg:h-[520px]">
        {CARDS.map((card) => (
          <div
            key={card.id}
            className={[
              "relative overflow-hidden",
              "h-[260px] sm:h-[300px] md:h-full",
              // Elevated: grow taller and shift UP — stays inside the section
              card.elevated ? "md:scale-y-[1.1] md:origin-bottom" : "",
            ].join(" ")}
          >
            <img
              src={card.image}
              alt=""
              className="absolute inset-0 w-full h-full object-cover object-center"
            />

            <div
              className={[
                "absolute inset-0 pointer-events-none",
                card.label
                  ? "bg-gradient-to-t from-black/70 via-black/25 to-black/10"
                  : "bg-gradient-to-t from-black/35 to-black/5",
              ].join(" ")}
            />

            {card.label && (
              <div className="absolute bottom-0 left-0 right-0 z-10 p-4 sm:p-5 md:p-7">
                <h2 className="font-extrabold text-white leading-tight whitespace-pre-line tracking-wide text-xl sm:text-2xl md:text-3xl mb-2">
                  {card.label.heading}
                </h2>
                <p className="text-white/70 text-[0.62rem] sm:text-xs md:text-sm leading-relaxed max-w-[200px]">
                  {card.label.body}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}