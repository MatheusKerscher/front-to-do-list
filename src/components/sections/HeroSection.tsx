export function HeroSection() {
  return (
    <section className="bg-white h-182.5" aria-label="Hero">
      <div className="relative flex items-center h-182.5">
        <div className="relative z-10 flex-1 max-w-7xl mx-auto sm:px-8 py-16 flex items-center justify-center lg:justify-start">
          <div className="max-w-140 text-center lg:text-left">
            <h1 className="leading-none mb-4">
              <span className="block text-black text-[2.5rem] lg:text-[5rem] font-montserrat font-bold leading-none">
                Organize
              </span>
              <span className="block text-primary text-[1.75rem] lg:text-[3.75rem] font-montserrat font-normal leading-[1.1]">
                your daily jobs
              </span>
            </h1>

            <p className="text-black my-10 text-[1.125rem] lg:text-[1.5rem] font-montserrat font-semibold">
              The only way to get things done
            </p>

            <a
              href="#todo"
              className="rounded-lg inline-flex items-center justify-center bg-primary hover:bg-primary-light text-white transition-colors focus-visible:outline-2 focus-visible:outline-primary mx-auto lg:mx-0 text-[1.125rem] lg:text-[1.5rem] font-montserrat "
              style={{ width: 'min(300px, 100%)', height: '64px' }}
            >
              Go to To-do list
            </a>
          </div>
        </div>

        <div
          className="hidden lg:flex absolute right-0 top-0 h-full items-center justify-center w-[55%]"
          aria-hidden="true"
        >
          <img
            src="/images/coopers-logo.svg"
            alt=""
            aria-hidden="true"
            className="absolute z-45 h-screen w-auto -bottom-12.5 right-0 pointer-events-none"
          />

          <div
            className="relative z-50"
            style={{ width: '443px', height: '482px' }}
          >
            <img
              src="/images/hero.png"
              alt="Modern interior"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div
          className="absolute bottom-20 sm:bottom-6 left-1/2 -translate-x-1/2 animate-bounce"
          aria-hidden="true"
        >
          <svg width="24" height="40" viewBox="0 0 24 40" fill="none">
            <path
              d="M12 0v40M0 28l12 12 12-12"
              stroke="#979797"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </section>
  )
}
