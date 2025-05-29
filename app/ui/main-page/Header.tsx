import Image from "next/image"
import Navigation from "./Navigation"

const Header = () => {
  return (
    <section className="w-full bg-gray-50 dark:bg-gray-900">
      <div className="w-full bg-elf dark:bg-[#25403c]">
        <div className="flex flex-col">
          <Navigation />
          <div className="flex  md:flex justify-center items-center gap-8 lg:gap-20 px-4 xl:px-24">
            {/* Content */}
            <div className="w-full md:w-1/2 flex justify-center items-center text-center md:py-10">
              <h1 className="w-2/3 text-xl md:text-4xl lg:text-5xl xl:text-7xl font-MorabbaBold text-gray-900 dark:text-gray-50">
                الهـام بخشیـــدن به زندگـی با{' '}
                <span className="inline-block mt-3 bg-mango dark:bg-elf px-3 py-1 rounded-xl text-elf dark:text-mango">
                  موسیقی
                </span>
              </h1>
            </div>

            {/* Hero Image */}
            <div className="md:w-1/2 p-5 flex justify-end">
              <Image
                src="/images/Header-Vector.png"
                alt="Hero illustration"
                width={500}
                height={500}
                className=""
                priority
              />
            </div>
          </div>
          {/* Footer Shape */}
          <div className="w-full ">
            <Image
              src="/images/shapes/header.png"
              alt="Decorative shape"
              width={1920}
              height={169}
              className="w-full block dark:hidden"
              priority
            />
            <Image
              src="/images/shapes/header-dark.png"
              alt="Decorative shape"
              width={1920}
              height={169}
              className="w-full hidden dark:block"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Header

