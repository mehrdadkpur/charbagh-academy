import Link from "next/link";
import RoutesHeader from "../ui/components/RoutesHeader";
import Image from "next/image";
import { fetchGalleries } from "@/lib/requests";

export const metadata = {
  title: 'آموزشگاه چهارباغ |گالری',
  description: 'این صفحه خبرنامه و رویدادهای مهم آموزشگاه موسیقی چهارباغ است.',
};

export default async function GalleryPage() {
  const { galleries } = await fetchGalleries();

  return (
    <section>
      <div>
        <div className="w-full bg-[#F6F4EE] dark:bg-gray-900">
          <RoutesHeader pageTitle={'گالری'} boldText={'گالـــــری'} Highlight={'عکس و فیلم'} />
          <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 gap-6">
              {galleries && galleries.map((gallery) => (
                <div key={gallery.id} className="bg-white dark:bg-gray-800 rounded-xl hover:shadow-xl transition-shadow duration-300">
                  <Link href={gallery.gallery_href} className="block p-4">
                    <div className="flex justify-center items-center gap-x-4">
                      <div className="relative w-20 h-20 rounded-2xl overflow-hidden flex-shrink-0">
                        <Image 
                          fill 
                          src={gallery.gallery_img} 
                          alt={gallery.gallery_name}
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="font-DanaDemiBold text-greenDark dark:text-gray-50">
                          گالری {gallery.gallery_name}
                        </h4>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
          <Image 
            width={1920} 
            height={134} 
            src="/images/shapes/footer-1.png" 
            alt="footer"
            className="w-full"
          />
        </div>
      </div>
    </section>
  );
}
