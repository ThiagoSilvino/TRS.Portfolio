export default function HomePage() {
  return (
    <main>
      {/* Hero Section */}
      <section className="px-4 py-16 md:py-20">
        <div className="mx-auto max-w-screen-xl">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
            THIAGO ROCHA SILVINO
          </h1>
          <div className="mt-8">
            <img
              src="/projects/featured/featuredbackground.png"
              alt="Featured hero"
              className="w-full h-auto rounded-md"
              loading="eager"
            />
          </div>
        </div>
      </section>

      {/* Project Samples */}
      <section className="px-4 py-16 md:py-20">
        <div className="mx-auto max-w-screen-xl">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <a href="#" className="block">
              <img
                src="/projects/featured/lsu-hero.jpg"
                alt="LSU — sample project"
                className="w-full h-auto rounded-md"
                loading="lazy"
              />
              <p className="mt-2 text-sm text-gray-600">LSU</p>
            </a>
            <a href="#" className="block">
              <img
                src="/projects/featured/gilroyhero.jpeg"
                alt="Gilroy — sample project"
                className="w-full h-auto rounded-md"
                loading="lazy"
              />
              <p className="mt-2 text-sm text-gray-600">Gilroy</p>
            </a>
            <a href="#" className="block">
              <img
                src="/projects/featured/usag-hero.jpg"
                alt="USAG — sample project"
                className="w-full h-auto rounded-md"
                loading="lazy"
              />
              <p className="mt-2 text-sm text-gray-600">USAG</p>
            </a>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="px-4 py-16 md:py-20">
        <div className="mx-auto max-w-screen-xl text-center">
          <a
            href="#"
            className="inline-block rounded-md border border-black px-6 py-3 text-base font-medium"
            aria-label="View full work (CTA)"
          >
            VIEW FULL WORK
          </a>
        </div>
      </section>
    </main>
  );
}
