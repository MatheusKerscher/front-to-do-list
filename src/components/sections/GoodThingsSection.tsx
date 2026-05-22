import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, A11y } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'

const posts = [
  {
    id: 1,
    img: '/images/good-things-1.png',
    tag: 'function',
    text: 'Organize your daily job enhance your life performance',
  },
  {
    id: 2,
    img: '/images/good-things-2.png',
    tag: 'function',
    text: 'Mark one activity as done makes your brain understands the power of doing.',
  },
  {
    id: 3,
    img: '/images/good-things-3.png',
    tag: 'function',
    text: 'Careful with miss understanding the difference between a list of things and a list of desires.',
  },
]

export function GoodThingsSection() {
  return (
    <section
      id="good-things"
      className="relative overflow-hidden py-16"
      aria-label="Good things"
    >
      <div
        className="bg-primary w-full max-w-5xl rounded-xl absolute top-0 bottom-0 left-1/3 -translate-x-1/3 h-130"
        aria-hidden="true"
      />

      <div className="relative md:left-10 max-w-7xl mx-auto px-8">
        <h2 className="text-white mb-8 text-center md:text-left font-montserrat font-bold text-[clamp(32px,4vw,48px)]">
          good things
        </h2>

        <Swiper
          modules={[Pagination, A11y]}
          spaceBetween={24}
          slidesPerView={1}
          pagination={{ clickable: true }}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="good-things-swiper pb-12! px-2! ms-10"
        >
          {posts.map((post) => (
            <SwiperSlide key={post.id}>
              <article className="bg-white flex flex-col rounded-2xl overflow-hidden shadow-xl relative h-107">
                <div className="overflow-hidden shrink-0 h-50">
                  <img
                    src={post.img}
                    alt={post.text}
                    className="w-full h-full object-cover"
                    width={360}
                    height={200}
                    loading="lazy"
                  />
                </div>

                <img
                  src="/images/coopers-logo.svg"
                  alt=""
                  aria-hidden="true"
                  width="30"
                  height="34"
                  className="absolute right-4 z-10 top-50 -translate-y-1/2"
                  loading="lazy"
                />

                <div className="p-4 flex flex-col gap-3 flex-1">
                  <div className="inline-flex items-center justify-center px-3 border border-gray text-gray rounded-full h-7 w-21">
                    <span className="font-montserrat font-normal text-xs">
                      {post.tag}
                    </span>
                  </div>

                  <p className="flex-1 font-montserrat font-normal text-[18px] text-[#312f4f] leading-[1.4]">
                    {post.text}
                  </p>

                  <a
                    href="#"
                    className="font-poppins font-bold text-base text-primary hover:underline focus-visible:outline-2 focus-visible:outline-primary"
                    aria-label={`Read more: ${post.text}`}
                  >
                    read more
                  </a>
                </div>
              </article>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  )
}
