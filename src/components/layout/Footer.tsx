export function Footer() {
  return (
    <footer aria-label="Footer">
      <div
        className="relative w-full h-62.5 flex items-center justify-center text-center overflow-hidden bg-black"
        style={{
          minHeight: '200px',
          clipPath: 'polygon(0 20%, 100% 0%, 100% 100%, 0% 100%)',
          padding: '75px 24px 62px 48px',
        }}
      >
        <div>
          <p className="text-white mb-2 font-montserrat font-semibold text-2xl">
            Need help?
          </p>
          <a
            href="mailto:coopers@coopers.pro"
            className="text-white hover:text-primary transition-colors block mb-3 font-montserrat font-semibold text-2xl"
          >
            coopers@coopers.pro
          </a>
          <p className="text-white/70 font-montserrat font-normal text-sm">
            © 2021 Coopers. All rights reserved.
          </p>
        </div>

        <div
          className="h-8 w-125 bg-primary absolute bottom-0"
          aria-hidden="true"
          style={{ clipPath: 'polygon(0 20%, 100% 0%, 100% 100%, 0% 100%)' }}
        />
      </div>
    </footer>
  )
}
